import re
from pathlib import Path

from services.breach_checker import check_breach
from services.pattern_detector import (
    detect_keyboard_pattern,
    detect_sequence,
    detect_repeated_characters,
    detect_dictionary_word,
)
from services.recommendation_engine import generate_recommendations


def load_common_passwords():
    BASE_DIR = Path(__file__).resolve().parent.parent
    file_path = BASE_DIR / "data" / "common_passwords.txt"

    with open(file_path, "r") as file:
        return {
            line.strip().lower()
            for line in file
        }


COMMON_PASSWORDS = load_common_passwords()


async def analyze_password(password):

    # -----------------------------
    # Common Password Check
    # -----------------------------
    if password.lower() in COMMON_PASSWORDS:

        breach_result = await check_breach(password)

        result = {
            "score": 0,
            "strength": "Very Weak",
            "feedback": [
                "Common password detected",
                "Choose a unique password"
            ],
            "is_common": True,
            "breached": breach_result["breached"],
            "breach_count": breach_result["count"],
            "health_score": 0,
            "health_status": "Critical",
            "security_grade": "F",
            "keyboard_pattern": False,
            "sequence_pattern": False,
            "repeated_pattern": False,
            "dictionary_pattern": False,

            "checks": {
                "length": False,
                "uppercase": False,
                "lowercase": False,
                "numbers": False,
                "symbols": False,
                "common": False,
                "breached": not breach_result["breached"],
                "keyboard": True,
                "sequence": True,
                "repeat": True,
                "dictionary": True,
            }
        }

        result["recommendations"] = generate_recommendations(result)

        return result

    # -----------------------------
    # Strength Calculation
    # -----------------------------

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

    if re.search(r"[!@#$%^&*()_+=\-{}\[\]:;\"'<>,.?/\\|]", password):
        score += 20
    else:
        feedback.append("Add special characters")

    # -----------------------------
    # Strength Label
    # -----------------------------

    if score < 40:
        strength = "Weak"
    elif score < 70:
        strength = "Medium"
    else:
        strength = "Strong"

    # -----------------------------
    # Breach Check
    # -----------------------------

    breach_result = await check_breach(password)

    # -----------------------------
    # Pattern Detection
    # -----------------------------

    keyboard_pattern = detect_keyboard_pattern(password)

    if keyboard_pattern:
        feedback.append("Keyboard pattern detected")

    sequence_pattern = detect_sequence(password)

    if sequence_pattern:
        feedback.append("Sequential characters detected")

    repeated_pattern = detect_repeated_characters(password)

    if repeated_pattern:
        feedback.append("Repeated characters detected")

    dictionary_pattern = detect_dictionary_word(password)

    if dictionary_pattern:
        feedback.append("Dictionary word detected")

    # -----------------------------
    # Health Score
    # -----------------------------

    health_score = score

    if len(password) >= 12:
        health_score += 5

    if len(password) >= 16:
        health_score += 5

    if breach_result["breached"]:
        health_score -= 25

    if keyboard_pattern:
        health_score -= 15

    if sequence_pattern:
        health_score -= 10

    if repeated_pattern:
        health_score -= 10

    if dictionary_pattern:
        health_score -= 15

    health_score = max(0, min(100, health_score))

    # -----------------------------
    # Health Status
    # -----------------------------

    if health_score >= 90:
        health_status = "Excellent"
    elif health_score >= 75:
        health_status = "Good"
    elif health_score >= 60:
        health_status = "Fair"
    elif health_score >= 40:
        health_status = "Poor"
    else:
        health_status = "Critical"

    # -----------------------------
    # Security Grade
    # -----------------------------

    if health_score >= 95:
        security_grade = "A+"
    elif health_score >= 90:
        security_grade = "A"
    elif health_score >= 80:
        security_grade = "B+"
    elif health_score >= 70:
        security_grade = "B"
    elif health_score >= 60:
        security_grade = "C+"
    elif health_score >= 50:
        security_grade = "C"
    elif health_score >= 40:
        security_grade = "D"
    else:
        security_grade = "F"

    # -----------------------------
    # Response
    # -----------------------------

    result = {
        "score": score,
        "strength": strength,
        "feedback": feedback,
        "is_common": False,
        "breached": breach_result["breached"],
        "breach_count": breach_result["count"],
        "health_score": health_score,
        "health_status": health_status,
        "security_grade": security_grade,
        "keyboard_pattern": keyboard_pattern,
        "sequence_pattern": sequence_pattern,
        "repeated_pattern": repeated_pattern,
        "dictionary_pattern": dictionary_pattern,

        "checks": {
            "length": len(password) >= 8,
            "uppercase": bool(re.search(r"[A-Z]", password)),
            "lowercase": bool(re.search(r"[a-z]", password)),
            "numbers": bool(re.search(r"\d", password)),
            "symbols": bool(re.search(r"[!@#$%^&*()_+=\-{}\[\]:;\"'<>,.?/\\|]", password)),
            "common": True,
            "breached": not breach_result["breached"],
            "keyboard": not keyboard_pattern,
            "sequence": not sequence_pattern,
            "repeat": not repeated_pattern,
            "dictionary": not dictionary_pattern,
        }
    }

    result["recommendations"] = generate_recommendations(result)

    return result