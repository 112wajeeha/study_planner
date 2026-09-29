# 📚 Study Planner

A frontend-only Study Planner web app built for the "React App Development with AI" Week 3 assignment. Users can add, edit, complete, delete, search, and filter study tasks, with live dashboard statistics and full persistence via browser localStorage.

## Features

- ✅ Add study tasks (title, subject, due date, priority)
- ✅ View all tasks in a task list
- ✅ Mark tasks as completed
- ✅ Edit existing tasks
- ✅ Delete tasks
- ✅ Search tasks by title or subject
- ✅ Filter tasks (All / Pending / Completed / High Priority)
- ✅ Dashboard statistics (total, completed, pending, high-priority counts)
- ✅ Data persists across browser refreshes via localStorage

## Tech Stack

- **React** (JavaScript, no TypeScript)
- **Vite** — build tool and dev server
- **Plain CSS** — no CSS framework
- **Browser localStorage** — for persistence

No backend, database, authentication, or external APIs are used — this is a fully frontend-only application, per assignment requirements.

## Project Structure

```
study-planner/
├── index.html
├── package.json
├── vite.config.js
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx
    ├── App.jsx                 # Top-level state, handlers, layout
    ├── index.css                # All app styling
    ├── components/
    │   ├── Header.jsx           # App title/branding
    │   ├── Dashboard.jsx        # Wraps 4 StatCards, computes stats
    │   ├── StatCard.jsx         # Single reusable stat display box
    │   ├── TaskForm.jsx         # Controlled form for add/edit
    │   ├── SearchBar.jsx        # Search input
    │   ├── FilterButtons.jsx    # All/Pending/Completed/High buttons
    │   ├── TaskList.jsx         # Maps tasks to TaskCards + empty state
    │   └── TaskCard.jsx         # Single task display + actions
    └── utils/
        └── localStorage.js      # loadTasks() / saveTasks() helpers
```

## How State Is Organized

All task data lives in a single `useState` in `App.jsx` (the "single source of truth"). Other pieces of state in `App.jsx`:

- `tasks` — array of all task objects
- `editingTask` — the task currently being edited (or `null`)
- `searchText` — current search query
- `activeFilter` — current filter (`'all' | 'pending' | 'completed' | 'high'`)

`filteredTasks` and the dashboard's stat counts are **derived values** — calculated fresh from `tasks` on every render rather than stored in their own state, to avoid state getting out of sync.

## Running Locally

```bash
npm install
npm run dev
```

Then open the URL shown in the terminal (typically `http://localhost:5173`).

## Data Persistence

Tasks are automatically saved to `localStorage` under the key `studyPlannerTasks` every time the `tasks` array changes (via a `useEffect`), and loaded back in on first app load. No manual save action is needed — it's fully automatic.

## AI-Assisted Development

This project was built step-by-step with AI acting as a mentor rather than a code generator — architecture and concepts were explained first, then each feature was implemented, tested, and reviewed individually before moving to the next. See `PROMPT_LOG.md` for the full development log and reflection.