import secrets
import string
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from services.password_analyzer import analyze_password
from services.entropy_calculator import (
    calculate_entropy,
    estimate_crack_time,
)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://password-security-analyser.vercel.app",
        "https://password-security-analyser-git-main-zeydac.vercel.app",
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {
        "message": "Password Security Analyzer Backend Running"
    }


@app.get("/analyze/{password}")
async def analyze(password: str):
    return await analyze_password(password)


@app.get("/generate-password")
def generate_password():

    characters = (
        string.ascii_letters +
        string.digits +
        string.punctuation
    )

    password = "".join(
        secrets.choice(characters)
        for _ in range(12)
    )

    return {
        "password": password
    }


@app.get("/entropy/{password}")
def entropy(password: str):

    entropy_value = calculate_entropy(password)

    crack_time = estimate_crack_time(entropy_value)

    return {
        "entropy": entropy_value,
        "crack_time": crack_time
    }