import hashlib
import httpx


async def check_breach(password: str):

    sha1_hash = hashlib.sha1(
        password.encode("utf-8")
    ).hexdigest().upper()

    prefix = sha1_hash[:5]
    suffix = sha1_hash[5:]

    url = f"https://api.pwnedpasswords.com/range/{prefix}"

    async with httpx.AsyncClient() as client:
        response = await client.get(url)

    if response.status_code != 200:
        return {
            "breached": False,
            "count": 0
        }

    hashes = response.text.splitlines()

    for line in hashes:
        hash_suffix, count = line.split(":")

        if hash_suffix == suffix:
            return {
                "breached": True,
                "count": int(count)
            }

    return {
        "breached": False,
        "count": 0
    }