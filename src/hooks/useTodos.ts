import { useState, useEffect, useCallback } from 'react';
import { Todo, CreateTodoDto, UpdateTodoDto } from '../types/Todos';
import { todoApi } from '../services/api';

interface UseTodosReturn {
  todos: Todo[];
  loading: boolean;
  error: string | null;
  createTodo: (todo: CreateTodoDto) => Promise<void>;
  updateTodo: (id: string, todo: UpdateTodoDto) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  refetch: () => Promise<void>;
  filterTodos: (filters: {
    completed?: boolean;
    priority?: string;
    category?: string;
    search?: string;
  }) => Promise<void>;
}

export const useTodos = (): UseTodosReturn => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTodos = useCallback(async (filters?: any) => {
    try {
      setLoading(true);
      setError(null);
      const fetchedTodos = await todoApi.getTodos(filters);
      setTodos(fetchedTodos);
    } catch (err) {
      setError('Failed to fetch todos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createTodo = async (todo: CreateTodoDto) => {
    try {
      setError(null);
      const newTodo = await todoApi.createTodo(todo);
      setTodos(prev => [newTodo, ...prev]);
    } catch (err) {
      setError('Failed to create todo');
      throw err;
    }
  };

  const updateTodo = async (id: string, todo: UpdateTodoDto) => {
    try {
      setError(null);
      const updatedTodo = await todoApi.updateTodo(id, todo);
      setTodos(prev => prev.map(t => t._id === id ? updatedTodo : t));
    } catch (err) {
      setError('Failed to update todo');
      throw err;
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      setError(null);
      await todoApi.deleteTodo(id);
      setTodos(prev => prev.filter(t => t._id !== id));
    } catch (err) {
      setError('Failed to delete todo');
      throw err;
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return {
    todos,
    loading,
    error,
    createTodo,
    updateTodo,
    deleteTodo,
    refetch: fetchTodos,
    filterTodos: fetchTodos,
  };
};
