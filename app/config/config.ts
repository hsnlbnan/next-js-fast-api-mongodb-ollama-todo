// config/config.ts
export const API_BASE_URL = process.env.API_BASE_URL;

export const ENDPOINTS = {
  TODOS: `${API_BASE_URL}/todos`,
  TODO: (id: string) => `${API_BASE_URL}/todos/${id}`,
};
