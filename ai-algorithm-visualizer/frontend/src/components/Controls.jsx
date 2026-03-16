import React from 'react';
import { 
  Play, 
  RotateCcw, 
  Box, 
  Crosshair, 
  Target, 
  MousePointer2, 
  Gauge, 
  Dices 
} from 'lucide-react';

function Controls({ 
  algorithm, 
  setAlgorithm, 
  onRun, 
  onClear, 
  onGenerateWalls, 
  isRunning, 
  mode, 
  setMode,
  speed,
  setSpeed 
}) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6 mb-8 bg-white/50 backdrop-blur-md p-6 rounded-3xl border border-gray-200 shadow-xl">
      
      {/* Placement Modes */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Grid Setup</label>
        <div className="flex bg-white border-2 border-gray-100 rounded-2xl p-1 shadow-sm">
          <button
            onClick={() => setMode('start')}
            disabled={isRunning}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
              mode === 'start' ? 'bg-green-500 text-white shadow-lg' : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            <Crosshair size={16} /> Start
          </button>
          <button
            onClick={() => setMode('goal')}
            disabled={isRunning}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
              mode === 'goal' ? 'bg-red-500 text-white shadow-lg' : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            <Target size={16} /> Goal
          </button>
          <button
            onClick={() => setMode('obstacle')}
            disabled={isRunning}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
              mode === 'obstacle' ? 'bg-gray-800 text-white shadow-lg' : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            <Box size={16} /> Wall
          </button>
        </div>
      </div>

      {/* Speed Control */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Speed</label>
        <div className="flex items-center gap-3 bg-white border-2 border-gray-100 rounded-2xl px-4 py-2 shadow-sm min-h-[44px]">
          <Gauge size={18} className="text-blue-500" />
          <input
            type="range"
            min="10"
            max="300"
            step="10"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            disabled={isRunning}
            className="w-24 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <span className="text-xs font-black text-blue-600 w-10">{speed}ms</span>
        </div>
      </div>

      {/* Algorithm Selection */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Algorithm</label>
        <select
          value={algorithm}
          onChange={(e) => setAlgorithm(e.target.value)}
          disabled={isRunning}
          className="bg-white border-2 border-gray-100 rounded-2xl px-4 py-2.5 font-bold text-gray-700 focus:outline-none focus:border-blue-500 transition-all shadow-sm flex items-center gap-2"
        >
          <option value="bfs">BFS</option>
          <option value="dfs">DFS</option>
          <option value="astar">A* Search</option>
          <option value="greedy">Greedy Search</option>
          <option value="dijkstra">Dijkstra</option>
        </select>
      </div>

      {/* Actions */}
      <div className="flex items-end gap-3 pt-5">
        <button
          onClick={onGenerateWalls}
          disabled={isRunning}
          className="group flex items-center gap-2 bg-white border-2 border-indigo-100 px-5 py-2.5 rounded-2xl font-bold text-indigo-600 hover:bg-indigo-50 hover:border-indigo-200 transition-all active:scale-95 shadow-sm"
          title="Auto-generate walls"
        >
          <Dices size={20} className="group-hover:rotate-12 transition-transform" />
          Auto-Walls
        </button>
        
        <button
          onClick={onClear}
          disabled={isRunning}
          className="flex items-center gap-2 bg-white border-2 border-gray-100 px-5 py-2.5 rounded-2xl font-bold text-gray-500 hover:bg-gray-50 transition-all active:scale-95 shadow-sm"
        >
          <RotateCcw size={20} /> Clear
        </button>

        <button
          onClick={onRun}
          disabled={isRunning}
          className={`
            flex items-center gap-2 px-8 py-2.5 rounded-2xl font-black text-white transition-all shadow-xl active:scale-95
            ${isRunning ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/20'}
          `}
        >
          <Play size={20} fill="currentColor" />
          {isRunning ? 'RUNNING...' : 'START'}
        </button>
      </div>

    </div>
  );
}

export default Controls;
