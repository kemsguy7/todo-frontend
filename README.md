# TaskMaster Pro - Frontend

A modern, responsive React application for advanced todo management with priority levels, categories, due dates, and comprehensive filtering capabilities.

## 🚀 Features

- **Modern UI/UX** - Clean, intuitive interface with responsive design
- **Real-time Updates** - Live todo management with instant feedback
- **Priority Color Coding** - Visual priority indicators (Low: Green, Medium: Yellow, High: Red)
- **Smart Categories** - Organize todos by work, personal, or custom categories
- **Due Date Intelligence** - Shows "Today", "Tomorrow", "Overdue" indicators
- **Advanced Search & Filter** - Multi-criteria filtering with real-time search
- **Statistics Dashboard** - Visual analytics and completion tracking
- **Inline Editing** - Edit todos directly in the list view
- **Keyboard Shortcuts** - Efficient task management
- **Dark/Light Themes** - Modern design with TailwindCSS
- **Mobile Responsive** - Works perfectly on all devices
- **Performance Optimized** - Fast loading with Vite bundler

## 🛠️ Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite (fast development and building)
- **Styling**: TailwindCSS for modern, responsive design
- **Icons**: Lucide React for beautiful, consistent icons
- **HTTP Client**: Axios for API communication
- **Date Handling**: date-fns for date manipulation
- **State Management**: React Hooks (useState, useEffect, custom hooks)
- **Development**: Hot Module Replacement (HMR) with Vite

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager
- Running backend API server

## ⚡ Quick Start

### 1. Clone & Install
```bash
git clone <repository-url>
cd todo-frontend
npm install
```

### 2. Environment Setup
Create a `.env` file in the root directory:
```env
VITE_API_URL=http://localhost:5000
```

### 3. Start Development Server
```bash
npm run dev
```

The application will start on `http://localhost:5173`

## 🔗 Backend Connection

Ensure your backend API is running on the URL specified in `VITE_API_URL`. The frontend will automatically connect to:
- **Local Development**: http://localhost:5000
- **Production**: Update `.env` with your deployed backend URL

## 🎨 Key Components

### 📝 TodoForm
- Create new todos with title, description, priority, category, and due date
- Form validation and error handling
- Priority color preview

### 📋 TodoItem  
- Display todo information with priority color coding
- Inline editing capabilities
- Due date indicators (Today, Overdue, etc.)
- Toggle completion status
- Delete functionality

### 🔍 FilterBar
- Real-time search across title and description
- Filter by completion status (All, Pending, Completed)
- Filter by priority level (All, High, Medium, Low)
- Filter by category
- Clear all filters button

### 📊 Statistics
- Total, completed, and pending task counts
- Visual progress indicators
- Quick overview of productivity

### 🎛️ Header
- Application branding and navigation
- Quick links to GitHub, frontend demo, backend API, and documentation
- Responsive navigation menu

## 🗂️ Project Structure
```
frontend/
├── src/
│   ├── components/
│   │   ├── Header.tsx         # App header with navigation
│   │   ├── TodoForm.tsx       # Create/edit todo form
│   │   ├── TodoItem.tsx       # Individual todo display
│   │   └── FilterBar.tsx      # Search and filter controls
│   ├── hooks/
│   │   └── useTodos.ts        # Custom hook for todo management
│   ├── services/
│   │   └── api.ts             # API client and methods
│   ├── types/
│   │   └── Todo.ts            # TypeScript interfaces
│   ├── App.tsx                # Main application component
│   ├── App.css                # Global styles
│   ├── main.tsx               # Application entry point
│   └── vite-env.d.ts          # Vite environment types
├── public/
├── index.html                 # HTML template
├── package.json
├── tsconfig.json
├── vite.config.ts             # Vite configuration
├── tailwind.config.js         # TailwindCSS configuration
├── .env                       # Environment variables
└── README.md
```

## 📜 Available Scripts

```bash
npm run dev        # Start development server with HMR
npm run build      # Build for production
npm run preview    # Preview production build locally
npm run lint       # Run ESLint for code quality
```

## 🎯 Key Features Walkthrough

### ✨ Todo Management
1. **Create**: Click "Add Task" button or use the form
2. **Edit**: Click the edit icon on any todo for inline editing
3. **Complete**: Click the circle icon to toggle completion
4. **Delete**: Click the trash icon to remove todos

### 🔍 Smart Filtering
- **Search**: Type in the search box to find todos by title/description
- **Status Filter**: Show all, pending, or completed todos
- **Priority Filter**: Filter by High, Medium, or Low priority
- **Category Filter**: Filter by specific categories
- **Combined Filters**: Use multiple filters simultaneously

### 📊 Analytics
- Toggle statistics view to see:
  - Total task count
  - Completion statistics  
  - Progress overview

### 📱 Responsive Design
- **Desktop**: Full-featured interface with sidebar navigation
- **Tablet**: Adapted layout with collapsible elements
- **Mobile**: Touch-friendly interface with optimized navigation

## 🌍 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API base URL | `http://localhost:5000` |

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variable: `VITE_API_URL=https://taskmaster-backend-wyfc.onrender.com`
3. Deploy automatically on every push

### Netlify
1. Build the project: `npm run build`
2. Upload `dist` folder to Netlify
3. Set environment variables in Netlify dashboard

### Manual Deployment
```bash
# Build for production
npm run build

# Serve the dist folder with any static server
npm install -g serve
serve -s dist
```

## 🎨 Customization

### Colors & Themes
Update `tailwind.config.js` to customize:
```javascript
theme: {
  extend: {
    colors: {
      primary: {
        50: '#eff6ff',
        500: '#3b82f6',
        600: '#2563eb',
        700: '#1d4ed8',
      }
    }
  }
}
```

### Priority Colors
Modify priority colors in components:
```typescript
const priorityColors = {
  low: 'bg-green-100 text-green-800 border-green-300',
  medium: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  high: 'bg-red-100 text-red-800 border-red-300',
};
```

## 🔧 Configuration

### Vite Configuration
The `vite.config.ts` includes:
- React plugin for JSX support
- Development server configuration
- Build optimization settings
- Environment variable prefixing

### TailwindCSS
Pre-configured with:
- Custom color palette
- Responsive design utilities
- Component-friendly classes
- Optimized for production builds

## 📱 Browser Support

- **Chrome** 88+
- **Firefox** 85+
- **Safari** 14+
- **Edge** 88+

## 🐛 Troubleshooting

**API Connection Issues:**
```bash
# Check if backend is running
curl http://localhost:5000/health

# Verify environment variable
echo $VITE_API_URL
```

**Build Issues:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
rm -rf .vite
```

**TypeScript Errors:**
- Ensure all types are properly imported
- Check `src/vite-env.d.ts` for environment variable types
- Verify backend API response matches frontend types

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Make changes with proper TypeScript types
4. Test thoroughly across different screen sizes
5. Commit changes (`git commit -m 'Add amazing feature'`)
6. Push to branch (`git push origin feature/amazing-feature`)
7. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Backend Repository**: [TaskMaster Pro Backend](https://github.com/kemsguy7/taskmaster-backend)
- **API Documentation**: http://localhost:5000/api-docs or https://todobackend.buyinbytes.com/api-docs
- **Design System**: Built with TailwindCSS
- **Icons**: [Lucide React](https://lucide.dev)

---

**Built with ❤️ using React, TypeScript, and TailwindCSS**