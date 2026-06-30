import asyncio
from services.breach_checker import check_breach

async def main():
    result = await check_breach("123456")
    print(result)

asyncio.run(main())