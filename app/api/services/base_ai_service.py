from typing import Tuple
import requests
import json

class Query:
    def __init__(self, prompt: str):
        self.prompt = prompt

async def generate_text(query: Query) -> str:
    payload = {
        "model": "qwen2.5:latest",
        "prompt": query.prompt
    }
    response = requests.post('http://localhost:11434/api/generate', json=payload)

    # Ollama'dan gelen yanıtı satır satır işle
    full_response = ""
    for line in response.iter_lines():
        if line:
            try:
                json_response = json.loads(line)
                if 'response' in json_response:
                    full_response += json_response['response']
            except json.JSONDecodeError as e:
                print(f"JSON parse hatası: {e}")
                continue

    return full_response