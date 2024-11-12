// /app/hooks/useTodos.ts
'use client';

import { useState, useEffect } from 'react';

import { ITodo } from '@/types/Todo';
import { fetchTodos } from '../actions/todoActions';

export function useTodos() {
  const [todos, setTodos] = useState<ITodo[]>([]);
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
  }, []);

  return { todos, setTodos, loading, error };
}
