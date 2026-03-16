import React from 'react';

const Cell = ({ row, col, type, isStart, isGoal, isVisited, isPath, isFrontier, onClick }) => {
  let bgColor = 'bg-white';
  if (isStart) bgColor = 'bg-green-500';
  else if (isGoal) bgColor = 'bg-red-500';
  else if (isPath) bgColor = 'bg-green-300';
  else if (isVisited) bgColor = 'bg-blue-300';
  else if (isFrontier) bgColor = 'bg-yellow-300';
  else if (type === 1) bgColor = 'bg-gray-800';

  return (
    <div
      className={`w-8 h-8 border border-gray-200 ${bgColor} cursor-pointer`}
      onClick={() => onClick(row, col)}
    />
  );
};

export default Cell;
