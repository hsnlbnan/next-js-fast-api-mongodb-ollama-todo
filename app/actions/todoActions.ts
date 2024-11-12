// /app/actions/todoActions.ts
'use server';


import { ENDPOINTS } from '../config/config';
import { ICreateTodoDTO, ITodo } from '@/types/Todo';

export async function fetchTodos(): Promise<ITodo[]> {
  const response = await fetch(ENDPOINTS.TODOS, { cache: 'no-store' });
  if (!response.ok) {
    throw new Error(`Failed to fetch todos: ${response.statusText}`);
  }
  return response.json();
}

export async function createTodoAction(newTodo: ICreateTodoDTO): Promise<ITodo> {
  try {
    const response = await fetch(ENDPOINTS.TODOS, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTodo),
    });

    if (!response.ok) {
      throw new Error(`Todo oluşturulamadı`);
    }

    return response.json();
  } catch (error) {
    throw error;
  }
}

export async function deleteTodoAction(id: string): Promise<void> {
  const response = await fetch(ENDPOINTS.TODO(id), { method: 'DELETE' });
  if (!response.ok) {
    throw new Error('Failed to delete todo');
  }
}
