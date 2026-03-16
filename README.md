# 🚀 AI Algorithm Visualizer

A powerful, interactive web application designed to visualize complex AI and pathfinding algorithms in real-time. This project features a React-based frontend and a Django-powered backend to provide a seamless learning experience for students and developers.

## ✨ Features

- **🌐 Pathfinding Visualization**: Watch algorithms like A*, Dijkstra, BFS, and DFS navigate grids and find optimal paths.
- **🎮 Interactive Tic-Tac-Toe**: Challenge an AI driven by the Minimax algorithm.
- **🤖 AI Tutor**: Integrated learning module to help understand the logic behind the algorithms.
- **⚡ Real-time Control**: Adjust speed, change starting/ending points, and reset the grid dynamically.
- **🎨 Modern UI**: Built with Tailwind CSS and Framer Motion for smooth animations and a premium look.

## 🛠️ Tech Stack

### Frontend
- **React** (Vite)
- **Tailwind CSS** (Styling)
- **Framer Motion** (Animations)
- **Lucide React** (Icons)
- **Axios** (API Requests)

### Backend
- **Django**
- **Django REST Framework** (API)
- **SQLite** (Database)

## 📂 Project Structure

```text
Algorithm_Visulizer/
├── ai-algorithm-visualizer/
│   ├── frontend/         # React + Vite application
│   └── backend/          # Django application
├── .gitignore            # Root git ignore
└── README.md             # Project overview
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- Python (v3.9+)

### 1. Setup Backend
```bash
cd ai-algorithm-visualizer/backend
# Create virtual environment
python -m venv venv
# Activate virtual environment
# Windows:
.\venv\Scripts\activate
# Install dependencies
pip install -r requirements.txt
# Run migrations
python manage.py migrate
# Start server
python manage.py runserver
```

### 2. Setup Frontend
```bash
cd ai-algorithm-visualizer/frontend
# Install dependencies
npm install
# Start development server
npm run dev
```

## 🧠 Algorithms Implemented

| Category | Algorithm | Description |
| :--- | :--- | :--- |
| **Pathfinding** | **A*** | Optimal path using heuristics. |
| **Pathfinding** | **Dijkstra** | Guarantees the shortest path in weighted graphs. |
| **Pathfinding** | **BFS** | Explores level by level (shortest path in unweighted). |
| **Pathfinding** | **DFS** | Explores as deep as possible. |
| **Pathfinding** | **Greedy BFS** | Best-first search based on distance to target. |
| **Game AI** | **Minimax** | Decision-making algorithm for Zero-Sum games. |

## 📜 License
This project is for educational purposes. Feel free to use and modify it!

---
Built with ❤️ for AI enthusiasts.
