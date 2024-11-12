// /app/components/TodoForm.tsx
'use client';

import { useState, FormEvent } from 'react';
import { createTodoAction } from '../actions/todoActions';
import { Plus, Minus } from 'lucide-react';

import type { Todo } from '@/types/Todo';

type TodoFormPropsType = {
  onTodoCreated: (newTodo: Todo) => void;
};

export function TodoForm({ onTodoCreated }: TodoFormPropsType) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setIsCreating(true);
    setError(null);

    try {
      const todoData = {
        title,
        description,
      };

      const createdTodo = await createTodoAction(todoData);
      setTitle('');
      setDescription('');
      onTodoCreated(createdTodo);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsCreating(false);
    }
  }

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-4">
        <h1 className="text-2xl font-bold">Görevler</h1>
        <button
          onClick={() => setIsFormVisible(!isFormVisible)}
          className="hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
        >
          {isFormVisible ? (
            <Minus className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          ) : (
            <Plus className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          )}
        </button>
      </div>

      <div className={`transition-all duration-300 ease-in-out overflow-hidden w-full ${
        isFormVisible ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 w-full bg-[#171717] p-6 rounded-xl border border-gray-300 dark:border-gray-800 transition-colors"
        >
          <div className="flex flex-row gap-4 w-full">
            <input
              type="text"
              placeholder="Görev Başlığı"
              className="w-1/2 p-3 bg-[#171717] border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-600 transition-all placeholder:text-gray-500 dark:placeholder:text-gray-400"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <textarea
              placeholder="Görev Açıklaması"
              className="w-1/2 p-3 bg-[#171717] border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-600 transition-all resize-y placeholder:text-gray-500 dark:placeholder:text-gray-400"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col w-full">
            <button
              type="submit"
              className="w-full py-3 bg-gray-800 dark:bg-black text-white rounded-lg font-medium shadow-md hover:bg-gray-900 dark:hover:bg-gray-900 focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isCreating}
            >
              {isCreating ? (
                <span className="loader w-4 h-4 border-2 border-t-transparent rounded-full animate-spin inline-block mr-2"></span>
              ) : null}
              {isCreating ? 'Oluşturuluyor...' : 'Görev Ekle'}
            </button>
            {error && <p className="text-red-500 dark:text-red-400 text-sm mt-2">{error}</p>}
          </div>
        </form>
      </div>
    </div>
  );
}
