KEYBOARD_PATTERNS = [
    "qwerty",
    "asdfgh",
    "zxcvbn",
    "1234567890",
    "0987654321",
    "qazwsx",
    "1q2w3e",
]


def detect_keyboard_pattern(password: str):
    password = password.lower()

    for pattern in KEYBOARD_PATTERNS:
        if pattern in password:
            return True

    return False

SEQUENCES = [
    "abcdefghijklmnopqrstuvwxyz",
    "0123456789",
    "9876543210",
    "zyxwvutsrqponmlkjihgfedcba",
]


def detect_sequence(password: str):

    password = password.lower()

    for sequence in SEQUENCES:

        for i in range(len(sequence) - 3):

            part = sequence[i:i + 4]

            if part in password:
                return True

    return False

import re


def detect_repeated_characters(password: str):

    pattern = r"(.)\1{3,}"

    return re.search(pattern, password) is not None

from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

DICTIONARY_FILE = BASE_DIR / "data" / "dictionary_words.txt"


def load_dictionary():

    with open(DICTIONARY_FILE, "r") as file:

        return {
            line.strip().lower()
            for line in file
        }


DICTIONARY = load_dictionary()

def detect_dictionary_word(password: str):

    password = password.lower()

    for word in DICTIONARY:

        if len(word) >= 4 and word in password:
            return True

    return False
