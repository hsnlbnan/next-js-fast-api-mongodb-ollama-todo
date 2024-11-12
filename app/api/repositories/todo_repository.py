from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
from typing import List, Dict, Any
from datetime import datetime

class TodoRepository:
    def __init__(self, client: AsyncIOMotorClient):
        self.client = client
        self.collection = client.db.todo

    async def get_all(self) -> List[Dict[str, Any]]:
        todos = await self.collection.find().sort("created_at", -1).to_list(length=None)
        return [{**todo, "_id": str(todo["_id"])} for todo in todos]

    async def create(self, todo_dict: Dict[str, Any]) -> Dict[str, Any]:
        result = await self.collection.insert_one(todo_dict)
        return {**todo_dict, "_id": str(result.inserted_id)}

    async def update(self, id: str, todo_dict: Dict[str, Any]) -> bool:
        result = await self.collection.update_one(
            {"_id": ObjectId(id)},
            {"$set": todo_dict}
        )
        return result.matched_count > 0

    async def delete(self, id: str) -> bool:
        result = await self.collection.delete_one({"_id": ObjectId(id)})
        return result.deleted_count > 0
