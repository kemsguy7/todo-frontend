/// <reference types="vite/client" />

import axios from 'axios';

import { Todo, CreateTodoDto, UpdateTodoDto, TodoStats } from '../types/Todos';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const todoApi = {
  // Get all todos with optional filters
  getTodos: async (params?: {
    completed?: boolean;
    priority?: string;
    category?: string;
    search?: string;
  }): Promise<Todo[]> => {
    const response = await api.get('/api/todos', { params });
    return response.data;
  },

  // Get a specific todo
  getTodo: async (id: string): Promise<Todo> => {
    const response = await api.get(`/api/todos/${id}`);
    return response.data;
  },

  // Create a new todo
  createTodo: async (todo: CreateTodoDto): Promise<Todo> => {
    const response = await api.post('/api/todos', todo);
    return response.data;
  },

  // Update a todo
  updateTodo: async (id: string, todo: UpdateTodoDto): Promise<Todo> => {
    const response = await api.put(`/api/todos/${id}`, todo);
    return response.data;
  },

  // Delete a todo
  deleteTodo: async (id: string): Promise<void> => {
    await api.delete(`/api/todos/${id}`);
  },

  // Get todo statistics
  getStats: async (): Promise<TodoStats> => {
    const response = await api.get('/api/todos/api/stats');
    return response.data;
  },
};

export default api;
