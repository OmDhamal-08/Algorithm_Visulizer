import React, { useState } from 'react';
import Grid from '../components/Grid';
import Controls from '../components/Controls';
import { runAlgorithm } from '../services/api';

const ROWS = 15;
const COLS = 15;

function createEmptyGrid() {
  return Array(ROWS).fill(null).map(() => Array(COLS).fill(0));
}

function Visualizer() {
  const [grid, setGrid] = useState(createEmptyGrid());
  const [start, setStart] = useState(null);
  const [goal, setGoal] = useState(null);
  const [algorithm, setAlgorithm] = useState('bfs');
  const [isRunning, setIsRunning] = useState(false);
  const [visitedNodes, setVisitedNodes] = useState([]);
  const [pathNodes, setPathNodes] = useState([]);
  const [frontierNodes, setFrontierNodes] = useState([]);
  // mode: 'obstacle' | 'start' | 'goal'
  const [mode, setMode] = useState('obstacle');
  const [status, setStatus] = useState('');
  const [speed, setSpeed] = useState(50); // Speed in ms

  const handleCellClick = (row, col) => {
    if (isRunning) return;

    if (mode === 'start') {
      // Unblock the cell if it was an obstacle
      const newGrid = grid.map(r => [...r]);
      newGrid[row][col] = 0;
      setGrid(newGrid);
      setStart([row, col]);
      setMode('obstacle'); // revert to obstacle mode after placing
    } else if (mode === 'goal') {
      const newGrid = grid.map(r => [...r]);
      newGrid[row][col] = 0;
      setGrid(newGrid);
      setGoal([row, col]);
      setMode('obstacle');
    } else {
      // obstacle mode — don't overwrite start/goal
      if (start && start[0] === row && start[1] === col) return;
      if (goal && goal[0] === row && goal[1] === col) return;
      const newGrid = grid.map(r => [...r]);
      newGrid[row][col] = newGrid[row][col] === 0 ? 1 : 0;
      setGrid(newGrid);
    }
  };

  const handleRun = async () => {
    if (!start || !goal) {
      alert('Please set both a Start node (green) and a Goal node (red) first.');
      return;
    }

    setIsRunning(true);
    setVisitedNodes([]);
    setPathNodes([]);
    setFrontierNodes([]);
    setStatus('Searching for path...');

    try {
      const data = await runAlgorithm(algorithm, grid, start, goal);
      animateResult(data.visited || [], data.path || []);
    } catch (error) {
      console.error('Algorithm error:', error);
      const msg = error.response?.data
        ? JSON.stringify(error.response.data)
        : 'Could not connect to the backend. Is the Django server running on port 8000?';
      alert(`Error running algorithm:\n${msg}`);
    } finally {
      setIsRunning(false);
    }
  };

  const animateResult = (visited, path) => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < visited.length) {
        setVisitedNodes(prev => [...prev, visited[i]]);
        i++;
      } else {
        clearInterval(interval);
        if (path && path.length > 0) {
          setPathNodes(path);
          setStatus('Path found!');
        } else {
          setStatus('No path found! The goal is unreachable.');
        }
      }
    }, speed);
  };

  const handleGenerateWalls = () => {
    if (isRunning) return;
    const newGrid = createEmptyGrid();
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        // Skip start and goal nodes
        if (start && start[0] === r && start[1] === c) continue;
        if (goal && goal[0] === r && goal[1] === c) continue;
        
        // ~30% chance of being a wall
        if (Math.random() < 0.3) {
          newGrid[r][c] = 1;
        }
      }
    }
    setGrid(newGrid);
  };

  const handleClear = () => {
    setGrid(createEmptyGrid());
    setStart(null);
    setGoal(null);
    setVisitedNodes([]);
    setPathNodes([]);
    setFrontierNodes([]);
    setMode('obstacle');
    setStatus('');
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold my-4">Algorithm Visualizer</h1>
      <p className="text-gray-500 mb-2 text-sm">
        Click <strong>Set Start</strong> then click a cell → click <strong>Set Goal</strong> then click a cell → draw obstacles or use <strong>Auto-Walls</strong> → select <strong>Algo</strong> (BFS, DFS, A*, Greedy, Dijkstra) → <strong>Run</strong>
      </p>
      {status && (
        <div className={`mb-4 font-semibold ${status.includes('No path') ? 'text-red-600' : 'text-blue-600'}`}>
          {status}
        </div>
      )}
      <Controls
        algorithm={algorithm}
        setAlgorithm={setAlgorithm}
        onRun={handleRun}
        onClear={handleClear}
        onGenerateWalls={handleGenerateWalls}
        isRunning={isRunning}
        mode={mode}
        setMode={setMode}
        speed={speed}
        setSpeed={setSpeed}
      />
      <Grid
        grid={grid}
        start={start}
        goal={goal}
        visitedNodes={visitedNodes}
        pathNodes={pathNodes}
        frontierNodes={frontierNodes}
        onCellClick={handleCellClick}
        mode={mode}
      />
      <div className="mt-4 flex gap-6 text-sm text-gray-600">
        <span className="flex items-center gap-1"><span className="inline-block w-4 h-4 bg-green-500 rounded"></span> Start</span>
        <span className="flex items-center gap-1"><span className="inline-block w-4 h-4 bg-red-500 rounded"></span> Goal</span>
        <span className="flex items-center gap-1"><span className="inline-block w-4 h-4 bg-gray-800 rounded"></span> Obstacle</span>
        <span className="flex items-center gap-1"><span className="inline-block w-4 h-4 bg-blue-300 rounded"></span> Visited</span>
        <span className="flex items-center gap-1"><span className="inline-block w-4 h-4 bg-green-300 rounded"></span> Path</span>
      </div>
    </div>
  );
}

export default Visualizer;
