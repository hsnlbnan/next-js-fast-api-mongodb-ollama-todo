// /app/components/TodoItem.tsx
'use client';

import { useTransition } from 'react';

import { deleteTodoAction } from '../actions/todoActions';
import { TodoItemSkeleton } from './TodoItemSkeleton';
import { Trash2 } from 'lucide-react';

import type { Todo } from '@/types/Todo';

type TodoItemProps = {
  todo: Todo;
  onTodoDeleted: () => void;
  isLoading?: boolean;
};

export function TodoItem({
  todo,
  onTodoDeleted,
  isLoading = false,
}: TodoItemProps) {
  const [isPending, startTransition] = useTransition();

  if (isLoading) {
    return <TodoItemSkeleton />;
  }

  const handleDelete = () => {
    if (confirm('Bu görevi silmek istediğinizden emin misiniz?')) {
      startTransition(async () => {
        try {
          await deleteTodoAction(todo._id);
          onTodoDeleted();
        } catch (err) {
          console.error('Görev silinirken hata oluştu:', err);
        }
      });
    }
  };

  return (
    <div className="bg-[#171717] p-4 rounded-md border border-gray-600 flex justify-between items-center text-white">
      <div>
        <h2 className="text-lg font-bold">{todo.title}</h2>
        <p className="text-sm text-gray-400">
          {todo.description} - {new Date(todo.created_at).toLocaleDateString()} - {todo.priority}
        </p>
        <h3 className="text-sm text-gray-400">{todo.summary}</h3>
      </div>
      <div className="flex gap-2">
        <button
          className="border border-gray-600 text-gray-300 p-2 rounded-md hover:bg-gray-800"
          onClick={handleDelete}
          disabled={isPending}
        >
          {isPending ? 'Siliniyor...' : <Trash2 className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}
