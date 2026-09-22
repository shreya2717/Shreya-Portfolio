import os

from pypdf import PdfReader

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from pydantic import BaseModel
from dotenv import load_dotenv
from groq import Groq


# ============================================================
# PATHS AND ENVIRONMENT
# ============================================================

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

load_dotenv(os.path.join(BASE_DIR, ".env"))

api_key = os.getenv("Groq_API_KEY")

if not api_key:
    raise ValueError("GROQ_API_KEY is missing")

client = Groq(api_key=api_key)

def clean_response(text: str) -> str:
    """Remove Markdown formatting from the AI response."""

    text = text.replace("**", "")
    text = text.replace("*", "")
    text = text.replace("`", "")
    text = text.replace("#", "")

    return text


# ============================================================
# FASTAPI APP
# ============================================================

app = FastAPI()


# ============================================================
# LOAD BOTH RESUMES
# ============================================================

resume_files = [
    os.path.join(BASE_DIR, "data", "Shreya_Resume..pdf"),
    os.path.join(BASE_DIR, "data", "Shreya_Resume_AI.pdf"),
]

resume_text = ""

for resume_file in resume_files:

    reader = PdfReader(resume_file)

    resume_text += (
        f"\n\n===== {os.path.basename(resume_file)} =====\n\n"
    )

    for page in reader.pages:

        text = page.extract_text()

        if text:
            resume_text += text + "\n"


# ============================================================
# CORS
# ============================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://shreya2717.github.io",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:8081",
        "http://127.0.0.1:8081",
    ],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ============================================================
# REQUEST MODEL
# ============================================================

class ChatRequest(BaseModel):
    message: str


# ============================================================
# LOAD ABOUT ME
# ============================================================

with open(
    os.path.join(BASE_DIR, "data", "about_me.txt"),
    "r",
    encoding="utf-8"
) as file:

    ABOUT_ME = file.read()


# ============================================================
# SYSTEM PROMPT
# ============================================================

SYSTEM_PROMPT = f"""
You are Shreya Bhattacharya's personal AI portfolio assistant.

Your job is to answer questions about Shreya using ONLY
the verified information provided in her resumes and
additional information.

You have access to:

1. Resume 1
2. Resume 2
3. Additional information from about_me.txt

Use information from BOTH resumes when relevant.

IMPORTANT RULES:

1. Only answer questions related to Shreya.

2. Use only the information provided in the resumes
   and additional information.

3. Never invent projects, skills, marks, achievements,
   companies, experience, education, or technologies.

4. If the requested information is not available,
   say:

   "I don't have that information about Shreya."

5. Do not pretend to be Shreya.

6. You are an AI assistant representing Shreya's portfolio.

7. Keep answers professional and suitable for recruiters
   and HR.

8. When discussing projects, explain:
   - project name
   - purpose
   - technologies
   - Shreya's contribution
   - important results when available

9. If information appears in only one resume, you may
   still use it.

10. If the two resumes contain different information,
    do not invent or merge details.

    Use the information that is explicitly available.

11. If asked something unrelated to Shreya, politely say
    that you can only answer questions about Shreya's
    professional profile.

12. Do not use Markdown formatting.
13. Do not use asterisks (*), double asterisks (**), hashtags (#),
    backticks (`), or other Markdown symbols.
14. Write answers as clean plain text.
15. You may use simple numbered lists or hyphen lists when useful.
16. Keep the response natural, concise, and professional.
17. NEVER use * or ** for emphasis or formatting.


============================================================
RESUME INFORMATION
============================================================

{resume_text}


============================================================
ADDITIONAL INFORMATION
============================================================

{ABOUT_ME}
"""


# ============================================================
# HOME
# ============================================================

@app.get("/")
def home():

    return {
        "message": "Shreya's AI Portfolio API is running"
    }


# ============================================================
# CHAT - TEMPORARY NON-STREAMING TEST
# ============================================================

@app.post("/chat")
def chat(request: ChatRequest):

    messages = [
        {
            "role": "system",
            "content": SYSTEM_PROMPT
        },
        {
            "role": "user",
            "content": request.message
        }
    ]

    try:

        response = client.chat.completions.create(
            model="openai/gpt-oss-120b",
            messages=messages
        )

        answer = response.choices[0].message.content

        cleaned_answer = clean_response(answer)

        return {
            "response": cleaned_answer
        }

    except Exception as e:

        print("GROQ ERROR:", repr(e))

        return {
            "error": str(e)
        }