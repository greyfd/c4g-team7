import pymupdf # type: ignore
import pygame # type: ignore
import re
import ftfy
from sentence_transformers import SentenceTransformer
import numpy
from openai import OpenAI
import sys
from dotenv import load_dotenv
import os
from flask import Flask, request
from flask_cors import CORS
from supabase import create_client, Client
import supabase
from flask import render_template
import json

app = Flask(__name__)
#app2 = Flask(__name__)
CORS(app)
#CORS(app2)
@app.route("/queries", methods=["POST"])
def queries():
    pdf = request.files["pdf"]
    user_id = request.form["user_id"]    
    
    load_dotenv()
    api_key = os.getenv("OPENROUTER_API_KEY")

    sys.stdout.reconfigure(encoding='utf-8')

    doc = pymupdf.open(stream=pdf.read(), filetype="pdf")
    metadata = doc.metadata

    paper_title = metadata.get("title", "")
    paper_author = metadata.get("author", "")
    paper_subject = metadata.get("subject", "")

    first_page = doc.load_page(0)

    first_page_text = first_page.get_text("text")


    paper_info = f"""

    Paper Metadata:

    Title:
    {paper_title}

    Authors:
    {paper_author}

    Subject:
    {paper_subject}


    Beginning of paper:
    {first_page_text[:2000]}

    """

    box = pymupdf.Rect(0, 100, 612, 792)
    text = ""

    page1 = doc.load_page(0)

    abstract = page1.search_for("abstract")
    if abstract:
        box1 = pymupdf.Rect(abstract[0].x0, abstract[0].y0, 612, 792)
        page1 = page1.get_text("text", clip=box1)
        text += page1
        
    text_temp = text
    line = []
    chunks = []
    chunk = ""
    info = ""

    counter = 1
    for page in doc:
        if (counter >= len(doc)):
            break
    page = doc.load_page(counter)
    text += page.get_text("text", clip=box)
    text_temp += page.get_text("text", clip=box)
    line = text_temp.splitlines()
    info = page.get_text("dict")

    for lin in line:
        if (re.fullmatch(r'[A-Z][A-Za-z\s&*0-9.-]+', lin)):
            chunks.append(lin)
        elif (re.fullmatch(r'[A-Z][A-Za-z\s&*0-9.()-]+', lin)):
            if (re.search(r'[(][a-zA-Z0-9]+[)][\s][A-Z]', lin)):
                chunks.append(lin)            
        else:
            chunk += lin
            chunk = ""
    counter += 1
    text_temp = ""

    for chunk in chunks:
        if (len(chunk) >= 100):
            chunks.remove(chunk)

    pattern = r'[a-zA-Z0-9]+@gmail\.com|[a-zA-Z0-9]+@yahoo.com|[a-zA-Z0-9]+@hotmail.com|email[:]+|id:[" "0-9]+|@[a-zA-Z0-9]+'
    text = re.sub(pattern, "", text)

    url_pattern = r'https?://[^\s<>"]+|www\.[^\s<>"]+|�'
    urls = re.findall(url_pattern, text) # should we create a separate chunk?
    text = re.sub(url_pattern, "", text)

    url_patterns = r'[^a-zA-Z0-9\s.,;:()\-\!?"\'/@+=]'
    text = re.sub(url_patterns, "", text)

    fullText = []
    text_temp = ""
    for char in text:
        if (char != " "):
            text_temp += char
        else:
            text_temp += char
            fullText.append(text_temp)
            text_temp = ""

    chunks = [chunk.strip() for chunk in chunks]
    fullText = [word.strip() for word in fullText]

    pieces = []
    piece = ""
    counter = 0
    word_c = 0

    print(chunks[1])
    print(fullText[164])

    pattern = "|".join(re.escape(chunk) for chunk in chunks)
    pieces = re.split(pattern, text)

    model = SentenceTransformer("all-MiniLM-L6-v2")
    query = "Represent this sentence for searhching relevant passages: " + "What is the impact of artificial intelligence on the business industry?"
    user_query = request.form["question"]
    document = pieces

    queryEmbed = model.encode(query, normalize_embeddings=True)
    documentEmbed = model.encode(document, normalize_embeddings=True)

    scores = documentEmbed @ queryEmbed
    top_k = 3

    indices = numpy.argsort(scores)
    indices = indices[::-1]
    indices = indices[:top_k]

    final_text = ""

    for i in indices:
        final_text += pieces[i]
        print(pieces[i])
        print(scores[i])

    #client = OpenAI(
    #  base_url="https://openrouter.ai/api/v1",
    #  api_key=api_key,
    #)

    # First API call with reasoning
    #response = client.chat.completions.create(
    #model="google/gemma-4-31b-it:free",
    #messages=[
        #    {
        #       "role": "system",
    #        "content": final_text + "User Question about the text: " + user_query
    #       }
    #      ],
    # extra_body={"reasoning": {"enabled": True}}
    #)

    # Extract the assistant message with reasoning_details
    #response = response.choices[0].message
    #print(response.content)

    # Preserve the assistant message with reasoning_details
    #messages = [
    # {"role": "system", "content": final_text + "User Question about the text: " + user_query},
    # {
    #   "role": "assistant",
    #   "content": response.content,
    #   "reasoning_details": response.reasoning_details  # Pass back unmodified
    # },
    # {"role": "user", "content": "Are you sure? Think carefully."}
    #]

    # Second API call - model continues reasoning from where it left off
    #response2 = client.chat.completions.create(
    # model="openai/gpt-oss-120b:free",
    #  messages=messages,
    #  extra_body={"reasoning": {"enabled": True}}
    #)
    from openai import OpenAI

    client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=api_key,
    )

    # First API call with reasoning
    # response = client.chat.completions.create(
    # model="openrouter/free",
    # messages=[
    #         {
    #         "role": "system",
    #         "content": final_text + "User Question about the text: " + user_query
    #         }
    #     ],
    # extra_body={"reasoning": {"enabled": True}}
    # )

    response = client.chat.completions.create(

    model="openrouter/free",

    messages=[

    {
        "role":"system",

        "content":
            """
            You are an academic research assistant.

            Answer the user's question using only the research paper.

            Return ONLY JSON in this format:

            {
            "answer":"AI answer here",
            "citation":"MLA citation here"
            }


            Create an MLA citation using:
            - authors
            - paper title
            - journal/conference
            - year
            - DOI if available

            Do not invent information.
            If information is missing, leave that part blank.

            """
                },


                {
                    "role":"user",

                    "content":

                    paper_info

                    +

                    """

            Relevant paper sections:

            """

                    +

                    final_text

                    +

                    """

            Question:

            """

                    +

                    user_query

                }

                ],

                extra_body={
                    "reasoning":{
                        "enabled":True
                    }
                }

            )


    response_text = response.choices[0].message.content


    response_data = json.loads(response_text)


    ai_answer = response_data["answer"]

    mla_citation = response_data["citation"]

    return {

        "status":"success",

        "response":ai_answer,

        "citations":[
            mla_citation
        ],

        "context":final_text

    }

#     return {
#         "status": "success",
#         "response": response.content,
#         "citations": urls,
#         "context": final_text
# }


    # SUPABASE_URL = 'https://yrybsyvpiorvidpouurv.supabase.co'
    # SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlyeWJzeXZwaW9ydmlkcG91dXJ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMwMzA1NDAsImV4cCI6MjA5ODYwNjU0MH0.DmmK05xmbAdCy85q9ikKMls062YGMt-jdMt6u_Tc5iQ'
    # supabase = create_client(SUPABASE_URL, SUPABASE_ANON_KEY)

    # resp = (
    #     supabase.table("PDFs")
    #     .insert({
    #         "TextChunks": pieces,
    #         "id": user_id
    #     })
    # ).execute()

    # return {"status": "success"}

    # Preserve the assistant message with reasoning_details
    #messages = [
    # {"role": "user", "content": "How many r's are in the word 'strawberry'?"},
    #{
    # "role": "assistant",
    #"content": response.content,
    #"reasoning_details": response.reasoning_details  # Pass back unmodified
    #},
    #{"role": "user", "content": "Are you sure? Think carefully."}
    #]

    # Second API call - model continues reasoning from where it left off
    #response2 = client.chat.completions.create(
    # model="openrouter/free",
    #messages=messages,
    #extra_body={"reasoning": {"enabled": True}}
    #)
# @app.route("/about", methods=["POST"])
# def about():

# @app.route("/signup")
# def signup():
@app.route("/followup", methods=["POST"])
def followup():

    data = request.json

    question = data["question"]
    context = data["context"]


    load_dotenv()

    api_key = os.getenv("OPENROUTER_API_KEY")


    client = OpenAI(
        base_url="https://openrouter.ai/api/v1",
        api_key=api_key
    )


    response = client.chat.completions.create(
        model="openrouter/free",

        response_format={
            "type": "json_object"
        },

        messages=[
            {
                "role":"system",
                "content":
                """
                Answer the user's question using only the provided research paper context.
                Rules:
                - Use ONLY the research paper context.
                - Do NOT return JSON.
                - Do NOT use markdown code blocks.
                - Do NOT create dictionaries or lists with keys.
                - Explain concepts clearly in paragraphs.
                - ONLY ANSWER IN ENGLISH.

                Research paper context:
                """
                +
                context
            },

            {
                "role":"user",
                "content":question
            }
        ]
    )


    return {
        "response":
        response.choices[0].message.content
    }
@app.route("/features")
def features():
    return render_template("features.html")
# @app.route("/login")
# def login():

# @app.route("/profile")
# def profile():

# @app.route("/loggedin")
# def loggedin():

if __name__ == "__main__":
    app.run(debug=True)