import React, { useState, useEffect } from 'react';
import { Plus, BarChart3, CheckSquare } from 'lucide-react';
import Header from './components/Header';
import TodoItem from './components/TodoItem';
import TodoForm from './components/TodoForm';
import FilterBar from './components/FilterBar';
import { useTodos } from './hooks/useTodos';
import { todoApi } from './services/api';
import { TodoStats } from './types/Todos';
import './App.css';

function App() {
  const {
    todos,
    loading,
    error,
    createTodo,
    updateTodo,
    deleteTodo,
    filterTodos,
  } = useTodos();

  const [showForm, setShowForm] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [stats, setStats] = useState<TodoStats | null>(null);
  
  // Filter states
  const [search, setSearch] = useState('');
  const [priority, setPriority] = useState('');
  const [category, setCategory] = useState('');
  const [completed, setCompleted] = useState('all');

  // Debounced filter effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const filters: any = {};
      
      if (search) filters.search = search;
      if (priority) filters.priority = priority;
      if (category) filters.category = category;
      if (completed !== 'all') filters.completed = completed === 'true';
      
      filterTodos(filters);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [search, priority, category, completed, filterTodos]);

  const fetchStats = async () => {
    try {
      const statsData = await todoApi.getStats();
      setStats(statsData);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  const handleClearFilters = () => {
    setSearch('');
    setPriority('');
    setCategory('');
    setCompleted('all');
  };

  const toggleStats = () => {
    if (!showStats) {
      fetchStats();
    }
    setShowStats(!showStats);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Action Bar */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">My Tasks</h2>
            <p className="text-gray-600">
              {todos.length} {todos.length === 1 ? 'task' : 'tasks'} total
            </p>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={toggleStats}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              <BarChart3 size={16} />
              {showStats ? 'Hide Stats' : 'Show Stats'}
            </button>
            
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
            >
              <Plus size={16} />
              Add Task
            </button>
          </div>
        </div>

        {/* Statistics Panel */}
        {showStats && stats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow-sm border p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Tasks</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-orange-600">{stats.pending}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add Todo Form */}
        {showForm && (
          <div className="mb-6">
            <TodoForm
              onSubmit={createTodo}
              onCancel={() => setShowForm(false)}
            />
          </div>
        )}

        {/* Filter Bar */}
        <FilterBar
          search={search}
          onSearchChange={setSearch}
          priority={priority}
          onPriorityChange={setPriority}
          category={category}
          onCategoryChange={setCategory}
          completed={completed}
          onCompletedChange={setCompleted}
          onClearFilters={handleClearFilters}
        />

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
            <div className="text-red-800">{error}</div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          </div>
        )}

        {/* Todo List */}
        <div className="space-y-3">
          {!loading && todos.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <CheckSquare size={48} className="mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
              <p className="text-gray-600 mb-4">
                {search || priority || category || completed !== 'all'
                  ? 'Try adjusting your filters or search terms.'
                  : 'Get started by adding your first task!'}
              </p>
              {(!search && !priority && !category && completed === 'all') && (
                <button
                  onClick={() => setShowForm(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
                >
                  <Plus size={16} />
                  Add Your First Task
                </button>
              )}
            </div>
          ) : (
            todos.map((todo) => (
              <TodoItem
                key={todo._id}
                todo={todo}
                onUpdate={updateTodo}
                onDelete={deleteTodo}
              />
            ))
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-gray-600">
            <p>Built with React, TypeScript, TailwindCSS, Express, and MongoDB</p>
            <p className="mt-2">Features: Priority levels, Categories, Due dates, Search & Filter</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
