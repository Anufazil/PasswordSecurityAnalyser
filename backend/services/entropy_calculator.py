import math
import re

def calculate_entropy(password):

    charset_size = 0

    if re.search(r"[a-z]", password):
        charset_size += 26

    if re.search(r"[A-Z]", password):
        charset_size += 26

    if re.search(r"\d", password):
        charset_size += 10

    if re.search(r"[!@#$%^&*()_+=\-{}[\]:;\"'<>,.?/\\|]", password):
        charset_size += 32

    if charset_size == 0:
        return 0

    entropy = len(password) * math.log2(charset_size)

    return round(entropy, 2)
    
def estimate_crack_time(entropy):

    guesses_per_second = 1_000_000_000

    seconds = (2 ** entropy) / guesses_per_second

    if seconds < 60:
        return f"{round(seconds)} seconds"

    elif seconds < 3600:
        return f"{round(seconds/60)} minutes"

    elif seconds < 86400:
        return f"{round(seconds/3600)} hours"

    elif seconds < 31536000:
        return f"{round(seconds/86400)} days"

    else:
        return f"{round(seconds/31536000)} years"    