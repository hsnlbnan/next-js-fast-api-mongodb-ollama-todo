// config/config.ts
export const API_BASE_URL = 'http://localhost:8000/api';

export const ENDPOINTS = {
  TODOS: `${API_BASE_URL}/todos`,
  TODO: (id: string) => `${API_BASE_URL}/todos/${id}`,
};
