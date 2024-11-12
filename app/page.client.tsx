// /app/page.tsx
'use client';

import { useState } from 'react';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';

import type { Todo } from '@/types/Todo';

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);

  async function handleTodoCreated(newTodo: Todo) {
    setTodos((prevTodos) => [newTodo, ...prevTodos]);
  };

  return (
    <div className="container mx-auto p-4 flex flex-col gap-4 h-full w-full">
      <TodoForm onTodoCreated={handleTodoCreated} />
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  );
}
