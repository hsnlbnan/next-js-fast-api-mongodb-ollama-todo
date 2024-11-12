// /app/components/TodoList.tsx
'use client';

import { useState, useEffect } from 'react';

import { fetchTodos } from '../actions/todoActions';
import { TodoItem } from './TodoItem';
import type { Todo } from '@/types/Todo';
import { TodoItemSkeleton } from './TodoItemSkeleton';

type TodoListProps = {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
};

export function TodoList({todos, setTodos}: TodoListProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const data = await fetchTodos();
        setTodos(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadTodos();
  }, [])
  ;
  const handleTodoDeleted = (id: string) => {
    setTodos(todos.filter((todo) => todo._id !== id));
  };

  if (loading) {
    return Array.from({ length: 5 }).map((_, index) => (
      <TodoItemSkeleton key={index} />
    ));
  }

  if (error) {
    return <p>Hata: {error}</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      {todos.map((todo,index) => (
        <TodoItem key={index} todo={todo} onTodoDeleted={() => handleTodoDeleted(todo._id)} />
      ))}
    </div>
  );
}
