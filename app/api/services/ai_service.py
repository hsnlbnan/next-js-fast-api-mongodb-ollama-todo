from typing import Tuple
from .base_ai_service import generate_text, Query

class AIService:
    async def generate_summary_and_priority(self, title: str, description: str) -> Tuple[str, str]:
        prompt = (
            f"Lütfen aşağıdaki Todo için kapsamlı bir özet ve öncelik seviyesi (1-5) belirle. "
            f"Özet, kullanıcının niyetini, düşünce tarzını ve yapılacak işin önem derecesini yansıtacak şekilde detaylandırılmış olmalıdır. "
            f"Sadece Türkçe dilinde yanıt ver.\n"
            f"Yanıtını iki satır halinde ver:\n"
            f"İlk satır: Görevin özeti (duygusal ton veya aciliyet derecesine göre)\n"
            f"İkinci satır: Sadece öncelik numarası (1-5)\n\n"
            f"Başlık: {title}\n"
            f"Açıklama: {description}"
        )

        query = Query(prompt)
        result = await generate_text(query)
        print('result', result)

        # Yanıtı satırlara böl ve temizle
        lines = [line.strip() for line in result.split('\n') if line.strip()]

        # Varsayılan değerler
        summary = "Özet oluşturulamadı"
        priority = "1"

        if lines:
            summary = lines[0]
            if len(lines) > 1:
                # Sadece sayısal değeri al
                priority = ''.join(filter(str.isdigit, lines[-1]))
                if not priority or not (1 <= int(priority) <= 5):
                    priority = "1"

        return summary, priority
