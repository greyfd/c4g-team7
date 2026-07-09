import pymupdf  # your original import kept
import pygame  # type: ignore
import re
import ftfy
from sentence_transformers import SentenceTransformer
import numpy
from openai import OpenAI
import sys
from dotenv import load_dotenv
import os
from flask import Flask, request, jsonify
from flask_cors import CORS

load_dotenv()
api_key = os.getenv("OPENROUTER_API_KEY")

sys.stdout.reconfigure(encoding='utf-8')

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# =========================
# GLOBAL STORAGE (NEW)
# =========================
stored_text = ""
stored_chunks = []
model = SentenceTransformer("all-MiniLM-L6-v2")  # moved OUTSIDE (important)


# =========================
# 1. UPLOAD ROUTE (NO AI)
# =========================
@app.route("/upload", methods=["POST"])
def upload():
    global stored_text, stored_chunks

    file = request.files["pdf"]

    path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(path)

    doc = pymupdf.open(path)

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
        if counter >= len(doc):
            break

        page = doc.load_page(counter)
        text += page.get_text("text", clip=box)
        text_temp += page.get_text("text", clip=box)
        line = text_temp.splitlines()
        info = page.get_text("dict")

        for lin in line:
            if re.fullmatch(r'[A-Z][A-Za-z\s&*0-9.-]+', lin):
                chunks.append(lin)
            elif re.fullmatch(r'[A-Z][A-Za-z\s&*0-9.()-]+', lin):
                if re.search(r'[(][a-zA-Z0-9]+[)][\s][A-Z]', lin):
                    chunks.append(lin)
            else:
                chunk += lin
                chunk = ""

        counter += 1
        text_temp = ""

    # cleanup
    for chunk in chunks:
        if len(chunk) >= 100:
            chunks.remove(chunk)

    pattern = r'[a-zA-Z0-9]+@gmail\.com|[a-zA-Z0-9]+@yahoo.com|[a-zA-Z0-9]+@hotmail.com|email[:]+|id:[" "0-9]+|@[a-zA-Z0-9]+'
    text = re.sub(pattern, "", text)

    url_pattern = r'https?://[^\s<>"]+|www\.[^\s<>"]+|�'
    text = re.sub(url_pattern, "", text)

    url_patterns = r'[^a-zA-Z0-9\s.,;:()\-\!?"\'/@+=]'
    text = re.sub(url_patterns, "", text)

    fullText = []
    text_temp = ""

    for char in text:
        if char != " ":
            text_temp += char
        else:
            text_temp += char
            fullText.append(text_temp)
            text_temp = ""

    chunks = [chunk.strip() for chunk in chunks]
    fullText = [word.strip() for word in fullText]

    pieces = re.split("|".join(re.escape(c) for c in chunks), text)

    # =========================
    # STORE EVERYTHING (NEW)
    # =========================
    stored_text = text
    stored_chunks = pieces

    return "PDF uploaded and processed (NO AI YET)"


# =========================
# 2. AI ROUTE (SEPARATED)
# =========================
@app.route("/ask", methods=["POST"])
def ask():
    global stored_text, stored_chunks

    user_query = request.json["question"]

    query = "Represent this sentence for searhching relevant passages: " + user_query

    queryEmbed = model.encode(query, normalize_embeddings=True)
    documentEmbed = model.encode(stored_chunks, normalize_embeddings=True)

    scores = documentEmbed @ queryEmbed
    top_k = 3

    indices = numpy.argsort(scores)[::-1][:top_k]

    final_text = ""
    for i in indices:
        final_text += stored_chunks[i]

    client = OpenAI(
        base_url="https://openrouter.ai/api/v1",
        api_key=api_key,
    )

    response = client.chat.completions.create(
        model="google/gemma-4-31b-it:free",
        messages=[
            {
                "role": "system",
                "content": final_text
            },
            {
                "role": "user",
                "content": user_query
            }
        ],
        extra_body={"reasoning": {"enabled": True}}
    )

    return response.choices[0].message.content


if __name__ == "__main__":
    app.run(debug=True)