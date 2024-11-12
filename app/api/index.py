from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import motor.motor_asyncio
import os
import datetime
from dotenv import load_dotenv
from typing import Optional
from bson import ObjectId
import requests
from fastapi import HTTPException
import json
from fastapi import Depends
from app.api.repositories.todo_repository import TodoRepository
from app.api.services.ai_service import AIService
load_dotenv()

mongo_cluster = os.getenv('MONGO_DB_CLUSTER')

class Todo(BaseModel):
    title: str
    description: str
    created_at: datetime.datetime = datetime.datetime.now()
    updated_at: datetime.datetime = datetime.datetime.now()
    deleted_at: Optional[datetime.datetime] = None
    priority: int = 1
    status: int = 0
    summary: str = ""

    class Config:
        json_encoders = {ObjectId: str}
        arbitrary_types_allowed = True

try:
    client = motor.motor_asyncio.AsyncIOMotorClient(mongo_cluster)
    client.admin.command('ping')
    print("MongoDB'ye başarıyla bağlandı!")
except Exception as e:
    print(f"MongoDB bağlantı hatası: {e}")

app = FastAPI(docs_url="/api/docs", openapi_url="/api/openapi.json")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
def health_check():
    return {"message": "OK"}

# Dependency Injection
def get_todo_repository():
    return TodoRepository(client)

def get_ai_service():
    return AIService()

@app.get("/api/todos")
async def get_todos(repo: TodoRepository = Depends(get_todo_repository)):
    try:
        return await repo.get_all()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Todos getirme hatası: {str(e)}")

@app.post("/api/todos")
async def create_todo(
    todo: Todo,
    repo: TodoRepository = Depends(get_todo_repository),
    ai_service: AIService = Depends(get_ai_service)
):
    try:
        todo_dict = todo.dict()
        print("Todo dict oluşturuldu:", todo_dict)

        try:
            ai_response = await ai_service.generate_summary_and_priority(
                todo_dict["title"],
                todo_dict["description"]
            )
            print("AI servisi ham yanıtı:", ai_response)

            summary, priority = ai_response
            todo_dict["summary"] = summary.strip() if isinstance(summary, str) else ""

            if isinstance(priority, str):
                priority_str = ''.join(filter(str.isdigit, priority))
                todo_dict["priority"] = int(priority_str) if priority_str else 1
            else:
                todo_dict["priority"] = 1

        except Exception as ai_error:
            print("AI servisi hatası:", str(ai_error))
            print("AI servisi hata detayı:", repr(ai_error))
            todo_dict["summary"] = ""
            todo_dict["priority"] = 1

        result = await repo.create(todo_dict)
        print("Todo oluşturuldu:", result)
        return result
    except Exception as e:
        print("Genel hata:", str(e))
        raise HTTPException(status_code=500, detail=f"Todo oluşturma hatası: {str(e)}")

@app.put("/api/todos/{id}")
async def update_todo(
    id: str,
    todo: Todo,
    repo: TodoRepository = Depends(get_todo_repository)
):
    try:
        if not ObjectId.is_valid(id):
            raise HTTPException(status_code=400, detail="Geçersiz ID formatı")

        if not await repo.update(id, todo.dict()):
            raise HTTPException(status_code=404, detail="Todo bulunamadı")

        return {"message": "Todo başarıyla güncellendi"}
    except HTTPException as he:
        raise he
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Todo güncelleme hatası: {str(e)}")

@app.delete("/api/todos/{id}")
async def delete_todo(id: str, repo: TodoRepository = Depends(get_todo_repository)):
    try:
        if not ObjectId.is_valid(id):
            raise HTTPException(status_code=400, detail="Geçersiz ID formatı")

        if not await repo.delete(id):
            raise HTTPException(status_code=404, detail="Todo bulunamadı")

        return {"message": "Todo başarıyla silindi"}
    except HTTPException as he:
        raise he
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Todo silme hatası: {str(e)}")