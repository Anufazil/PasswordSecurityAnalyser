import re
from pathlib import Path


def load_common_passwords():

    BASE_DIR = Path(__file__).resolve().parent.parent
    file_path = BASE_DIR / "data" / "common_passwords.txt"

    with open(file_path, "r") as file:
        return {
            line.strip().lower()
            for line in file
        }


def analyze_password(password):

    common_passwords = load_common_passwords()

    if password.lower() in common_passwords:
        return {
            "score": 0,
            "strength": "Very Weak",
            "feedback": [
                "Common password detected",
                "Choose a unique password"
            ],
            "is_common": True
        }

    score = 0
    feedback = []

    if len(password) >= 8:
        score += 25
    else:
        feedback.append("Use at least 8 characters")

    if re.search(r"[A-Z]", password):
        score += 20
    else:
        feedback.append("Add uppercase letters")

    if re.search(r"[a-z]", password):
        score += 20
    else:
        feedback.append("Add lowercase letters")

    if re.search(r"\d", password):
        score += 15
    else:
        feedback.append("Add numbers")

    if re.search(r"[!@#$%^&*()_+=\-{}[\]:;\"'<>,.?/\\|]", password):
        score += 20
    else:
        feedback.append("Add special characters")

    if score < 40:
        strength = "Weak"
    elif score < 70:
        strength = "Medium"
    else:
        strength = "Strong"

    return {
        "score": score,
        "strength": strength,
        "feedback": feedback,
        "is_common": False
    }