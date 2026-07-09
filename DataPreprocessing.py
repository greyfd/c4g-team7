import pymupdf # type: ignore
import pygame # type: ignore
import re
import ftfy

    #print(pymupdf.__doc__)

    #doc = pymupdf.open("RiseofArtificialIntelligenceinBusinessandIndustry1.pdf")

    #page = doc.load_page(3)

    #box = pymupdf.Rect(0, 100, 612, 792)
    #text = page.get_text("text", clip=box)

    #text = page.get_text("text", clip=box)
    #print(text)
doc = pymupdf.open("RiseofArtificialIntelligenceinBusinessandIndustry1.pdf")
box = pymupdf.Rect(0, 100, 612, 792)
text = ""

page1 = doc.load_page(0)

abstract = page1.search_for("abstract")
box1 = pymupdf.Rect(abstract[0].x0, abstract[0].y0, 612, 792)
page1 = page1.get_text("text", clip=box1)

text += page1

counter = 1
for page in doc:
    if (counter >= len(doc)):
        break
    page = doc.load_page(counter)
    text += page.get_text("text", clip=box)
    counter += 1

#page1 = doc.load_page(0)

#abstract = page1.search_for("abstract")
#box1 = pymupdf.Rect(abstract[0].x0, abstract[0].y0, 612, 792)
#page1 = page1.get_text("text", clip=box1)

#print(abstract)

#text = text.strip()
text = text.lower() #do we need tihs?

pattern = r'[a-zA-Z0-9]+@gmail\.com|[a-zA-Z0-9]+@yahoo.com|[a-zA-Z0-9]+@hotmail.com|email[:]+|id:[" "0-9]+|@[a-zA-Z0-9]+'
text = re.sub(pattern, "", text)

url_pattern = r'https?://[^\s<>"]+|www\.[^\s<>"]+|�'
urls = re.findall(url_pattern, text) # should we create a separate chunk?
text = re.sub(url_pattern, "", text)

#print(text)

#text = ""

#for pag in doc:
#    text += pag.get_text()
#print(text)

#test_case = text
#test_case = test_case.lower()
  #  if (char.isnumeric()):
   #     test_case = test_case.replace(char, "")
    #elif (char.isalpha() == False):
     #   if (char == " "):
      #      pass
       # else:  
        #    test_case = test_case.replace(char, "")
#
#print(test_case)

count = 0
c = 0
test_case = text
for char in test_case:
    count += 1
    if (char == "@"):
        #print("hello")
        temp = char
        c = count
        for chars in reversed(test_case[0:test_case.find(temp)]):            
            if (test_case[c] == " "):
                #print(c)
                #print(chars)
                #print(count)
                #text = test_case[c:test_case.find(temp)]
                test_case = test_case.replace(test_case[c:test_case.find(temp)], "")
                #print(text)
                #print(chars)
                #print(temp)
                #print(text)
                #print(chars)
                #print(test_case.find(temp))
                break
            c -= 1

        for char in test_case[test_case.find(temp):]:
            if (char == " "):
                #text += test_case[test_case.find(temp):count]
                test_case = test_case.replace(test_case[test_case.find(temp):count], "")
                break
            count += 1
#print(text)



#URLendings = [".com", ".net", ".org", ".co"]
#if (any(ending in test_case for ending in URLendings)):
   # count = 0
 #   for end in test_case:
     #   if (end == ".com" or end == ".net" or end == ".org" or end == ".co"):
    #        break
     #   count += 1
#print(count)
url_patterns = r'[^a-zA-Z0-9\s.,;:()\-\!?"\'/@+=]'
text = re.sub(url_patterns, "", text)
print(text)

#print(text)