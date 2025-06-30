
// src/components/Header.tsx
import React from 'react';
import { CheckSquare, Github, Globe, Server, FileText } from 'lucide-react';

const Header: React.FC = () => {
  const links = [
    {
      label: 'GitHub',
      url: 'https://github.com/yourusername/todo-app',
      icon: Github,
      description: 'View source code'
    },
    {
      label: 'Frontend',
      url: 'https://todo-app-frontend.vercel.app',
      icon: Globe,
      description: 'Live frontend demo'
    },
    {
      label: 'Backend',
      url: 'https://todo-app-backend.onrender.com',
      icon: Server,
      description: 'API server'
    },
    {
      label: 'API Docs',
      url: 'https://todo-app-backend.onrender.com/api/docs',
      icon: FileText,
      description: 'API documentation'
    }
  ];

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-600 rounded-lg">
              <CheckSquare className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">TaskMaster Pro</h1>
              <p className="text-sm text-gray-600">Advanced Todo Management System</p>
            </div>
          </div>

          <nav className="flex items-center gap-4">
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                  title={link.description}
                >
                  <Icon size={16} />
                  <span className="hidden sm:inline">{link.label}</span>
                </a>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
