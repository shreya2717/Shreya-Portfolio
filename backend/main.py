import os
from pypdf import PdfReader

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from groq import Groq


load_dotenv()

api_key = os.getenv("Groq_API_KEY")

if not api_key:
    raise ValueError("GROQ_API_KEY is missing")

client = Groq(api_key=api_key)

app = FastAPI()

reader = PdfReader("data/Shreya_Resume..pdf")

resume_text = ""

for page in reader.pages:
    resume_text += page.extract_text() + "\n"


app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://shreya2717.github.io"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ChatRequest(BaseModel):
    message: str


with open("data/about_me.txt", "r", encoding="utf-8") as file:
    ABOUT_ME = file.read()


SYSTEM_PROMPT = f"""
You are Shreya Bhattacharya's personal AI portfolio assistant.

Your job is to answer questions about Shreya.

You have access to the following verified information about Shreya:

--------------------
{ABOUT_ME}
--------------------

IMPORTANT RULES:

1. Only answer questions related to Shreya.
2. Use only the information provided above.
3. Never invent projects, marks, achievements, skills,
   companies, experience, or education.
4. If the information is not available, say:
   "I don't have that information about Shreya."
5. Do not pretend to be Shreya.
6. You are an AI assistant representing Shreya's portfolio.
7. Keep answers professional and suitable for recruiters and HR.
8. When discussing projects, explain:
   - project name
   - purpose
   - technologies
   - what Shreya contributed
   - important results
9. If asked something unrelated to Shreya, politely say that
   you can only answer questions about Shreya's professional
   profile.
"""


@app.get("/")
def home():
    return {"message": "Shreya's AI Portfolio API is running"}


@app.post("/chat")
def chat(request: ChatRequest):

    response = client.chat.completions.create(
        model="openai/gpt-oss-120b",
        messages=[
            {
                "role": "system",
                "content": f"""
                You are Shreya Bhattacharya's personal AI assistant.

                Answer questions ONLY using the information provided
                in Shreya's resume below.

                If the answer is not present in the resume, say:
                "I don't have that information about Shreya."

                Shreya's Resume:
                {resume_text}
                 Additional Information About Shreya:
                 {ABOUT_ME}
                """
            },
            {
                "role": "user",
                "content": request.message
            }
        ]
    )

    return {"response": response.choices[0].message.content}
    answer = response.choices[0].message.content

    stream = client.chat.completions.create(model=model, messages=messages, stream = True)
    for chunk in stream:
        content  = chunk.choices[0].delta.content
        if content:
            print(content, end="",flush=True)
            return {
                "answer": answer
            }