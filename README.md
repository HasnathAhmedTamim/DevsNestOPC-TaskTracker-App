# Task Tracker App

A complete task management application built with React, Redux Toolkit, and Tailwind CSS. Features user authentication, CRUD operations for tasks, and user-specific task storage.

## Features Implemented

- ✅ **User Authentication**: Login/logout with email-based authentication
- ✅ **Task Management**: Create, read, update, delete tasks with title, description, due date, status, and priority
- ✅ **User-Specific Tasks**: Each user sees only their own tasks (localStorage per user)
- ✅ **Responsive Design**: Mobile-friendly UI with Tailwind CSS and custom navy theme
- ✅ **State Management**: Redux Toolkit for global state management
- ✅ **Routing**: Protected routes with React Router DOM
- ✅ **Notifications**: Toast notifications for user feedback
- ✅ **Data Persistence**: localStorage for tasks and authentication
- ✅ **Task Filtering**: View tasks by status (All, Pending, Completed)
- ✅ **Task Priorities**: High, Medium, Low priority levels

## Tech Stack

- **Frontend**: React 19.1.0, Vite 7.0.5
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS with custom navy color theme
- **Routing**: React Router DOM
- **Notifications**: React Hot Toast
- **Storage**: localStorage (frontend-only implementation)

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

## Usage

1. **Login**: Enter any email and password to access the app
2. **Create Tasks**: Click "Add Task" to create new tasks with title, description, due date, status, and priority
3. **Manage Tasks**: Edit, delete, or toggle task status from the task list
4. **User Separation**: Each email creates a separate user account with isolated tasks
5. **Logout**: Click logout to clear session and switch users

## Future Enhancements (Option A)

- Backend API with Node.js + Express + MongoDB
- Real user authentication with JWT
- Database persistence
- User registration system
- API integration replacing localStorage

---

## Development Notes

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
