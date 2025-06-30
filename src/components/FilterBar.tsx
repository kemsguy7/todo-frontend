import React from 'react';
import { Search, Filter, X } from 'lucide-react';

interface FilterBarProps {
  search: string;
  onSearchChange: (search: string) => void;
  priority: string;
  onPriorityChange: (priority: string) => void;
  category: string;
  onCategoryChange: (category: string) => void;
  completed: string;
  onCompletedChange: (completed: string) => void;
  onClearFilters: () => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  search,
  onSearchChange,
  priority,
  onPriorityChange,
  category,
  onCategoryChange,
  completed,
  onCompletedChange,
  onClearFilters,
}) => {
  const hasActiveFilters = search || priority || category || completed !== 'all';

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex-1 min-w-[200px]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search todos..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Filter size={16} className="text-gray-500" />
          
          <select
            value={completed}
            onChange={(e) => onCompletedChange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
          >
            <option value="all">All Tasks</option>
            <option value="false">Pending</option>
            <option value="true">Completed</option>
          </select>

          <select
            value={priority}
            onChange={(e) => onPriorityChange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
          >
            <option value="">All Priorities</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>

          <input
            type="text"
            placeholder="Category..."
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm w-32"
          />

          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              title="Clear filters"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;

