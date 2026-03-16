import React from 'react';
import Cell from './Cell';

const Grid = ({ grid, start, goal, visitedNodes, pathNodes, frontierNodes, onCellClick, mode }) => {
  return (
    <div
      className="inline-block border-2 border-gray-300 mt-4"
      style={{
        cursor:
          mode === 'start' ? 'crosshair' :
          mode === 'goal'  ? 'crosshair' :
          'pointer'
      }}
    >
      {grid.map((row, i) => (
        <div key={i} className="flex">
          {row.map((cell, j) => {
            const isStart = start && start[0] === i && start[1] === j;
            const isGoal  = goal  && goal[0]  === i && goal[1]  === j;
            
            // Fix: Add null-guards (n && ...) to prevent "Cannot read properties of undefined (reading '0')"
            const isVisited  = visitedNodes.some(n => n && n[0] === i && n[1] === j);
            const isPath     = pathNodes.some(n => n && n[0] === i && n[1] === j);
            const isFrontier = frontierNodes.some(n => n && n[0] === i && n[1] === j);
            
            return (
              <Cell
                key={`${i}-${j}`}
                row={i}
                col={j}
                type={cell}
                isStart={isStart}
                isGoal={isGoal}
                isVisited={isVisited}
                isPath={isPath}
                isFrontier={isFrontier}
                onClick={onCellClick}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Grid;
