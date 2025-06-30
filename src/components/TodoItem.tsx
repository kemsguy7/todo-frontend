import React, { useState } from 'react';
import { format, isToday, isPast } from 'date-fns';
import { Todo, UpdateTodoDto } from '../types/Todos';
import { Trash2, Edit3, Calendar, Tag, CheckCircle, Circle } from 'lucide-react';

interface TodoItemProps {
  todo: Todo;
  onUpdate: (id: string, todo: UpdateTodoDto) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: todo.title,
    description: todo.description || '',
    priority: todo.priority,
    category: todo.category,
    dueDate: todo.dueDate ? format(new Date(todo.dueDate), 'yyyy-MM-dd') : '',
  });

  const priorityColors = {
    low: 'bg-green-100 text-green-800 border-green-300',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    high: 'bg-red-100 text-red-800 border-red-300',
  };

  const handleToggleComplete = async () => {
    await onUpdate(todo._id, { completed: !todo.completed });
  };

  const handleSaveEdit = async () => {
    try {
      await onUpdate(todo._id, {
        ...editData,
        description: editData.description || undefined,
        dueDate: editData.dueDate || undefined,
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update todo:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditData({
      title: todo.title,
      description: todo.description || '',
      priority: todo.priority,
      category: todo.category,
      dueDate: todo.dueDate ? format(new Date(todo.dueDate), 'yyyy-MM-dd') : '',
    });
    setIsEditing(false);
  };

  const isDueToday = todo.dueDate && isToday(new Date(todo.dueDate));
  const isOverdue = todo.dueDate && isPast(new Date(todo.dueDate)) && !isToday(new Date(todo.dueDate));

  if (isEditing) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-4 mb-3">
        <div className="space-y-3">
          <input
            type="text"
            value={editData.title}
            onChange={(e) => setEditData({ ...editData, title: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          
          <textarea
            value={editData.description}
            onChange={(e) => setEditData({ ...editData, description: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            rows={2}
            placeholder="Description..."
          />
          
          <div className="grid grid-cols-3 gap-3">
            <select
              value={editData.priority}
              onChange={(e) => setEditData({ ...editData, priority: e.target.value as any })}
              className={`px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${priorityColors[editData.priority]}`}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            
            <input
              type="text"
              value={editData.category}
              onChange={(e) => setEditData({ ...editData, category: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Category"
            />
            
            <input
              type="date"
              value={editData.dueDate}
              onChange={(e) => setEditData({ ...editData, dueDate: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={handleSaveEdit}
              className="px-3 py-1 bg-primary-600 text-white rounded-md text-sm hover:bg-primary-700 transition-colors"
            >
              Save
            </button>
            <button
              onClick={handleCancelEdit}
              className="px-3 py-1 border border-gray-300 text-gray-700 rounded-md text-sm hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow-sm border p-4 mb-3 transition-all hover:shadow-md ${todo.completed ? 'opacity-75' : ''}`}>
      <div className="flex items-start gap-3">
        <button
          onClick={handleToggleComplete}
          className="mt-1 text-primary-600 hover:text-primary-700 transition-colors"
        >
          {todo.completed ? <CheckCircle size={20} /> : <Circle size={20} />}
        </button>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <h3 className={`font-medium ${todo.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                {todo.title}
              </h3>
              {todo.description && (
                <p className={`mt-1 text-sm ${todo.completed ? 'text-gray-400' : 'text-gray-600'}`}>
                  {todo.description}
                </p>
              )}
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => setIsEditing(true)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Edit3 size={16} />
              </button>
              <button
                onClick={() => onDelete(todo._id)}
                className="text-gray-400 hover:text-red-600 transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
          
          <div className="flex items-center gap-3 mt-3 flex-wrap">
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${priorityColors[todo.priority]}`}>
              {todo.priority}
            </span>
            
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
              <Tag size={12} />
              {todo.category}
            </span>
            
            {todo.dueDate && (
              <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                isOverdue ? 'bg-red-100 text-red-800' : 
                isDueToday ? 'bg-orange-100 text-orange-800' : 
                'bg-blue-100 text-blue-800'
              }`}>
                <Calendar size={12} />
                {format(new Date(todo.dueDate), 'MMM dd')}
                {isDueToday && ' (Today)'}
                {isOverdue && ' (Overdue)'}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
