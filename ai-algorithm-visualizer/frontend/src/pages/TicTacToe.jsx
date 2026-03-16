import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Circle, RotateCcw, Cpu, Zap, Activity } from 'lucide-react';
import { getAIMove } from '../services/api';

const WIN_COMBOS = [
  [[0, 0], [0, 1], [0, 2]],
  [[1, 0], [1, 1], [1, 2]],
  [[2, 0], [2, 1], [2, 2]],
  [[0, 0], [1, 0], [2, 0]],
  [[0, 1], [1, 1], [2, 1]],
  [[0, 2], [1, 2], [2, 2]],
  [[0, 0], [1, 1], [2, 2]],
  [[0, 2], [1, 1], [2, 0]],
];

function TicTacToe() {
  const [board, setBoard] = useState(Array(3).fill().map(() => Array(3).fill('')));
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [winLine, setWinLine] = useState(null);
  const [useAlphaBeta, setUseAlphaBeta] = useState(true);
  const [nodesEvaluated, setNodesEvaluated] = useState(null);
  const [history, setHistory] = useState([]);

  const checkWinner = (currentBoard) => {
    for (const combo of WIN_COMBOS) {
      const [[aR, aC], [bR, bC], [cR, cC]] = combo;
      if (
        currentBoard[aR][aC] &&
        currentBoard[aR][aC] === currentBoard[bR][bC] &&
        currentBoard[aR][aC] === currentBoard[cR][cC]
      ) {
        return { winner: currentBoard[aR][aC], line: combo };
      }
    }
    return null;
  };

  const isBoardFull = (currentBoard) => {
    return currentBoard.every(row => row.every(cell => cell !== ''));
  };

  const handleCellClick = async (row, col) => {
    if (gameOver || board[row][col] !== '' || isAiThinking) return;

    // Human move
    const newBoard = board.map(r => [...r]);
    newBoard[row][col] = 'X';
    setBoard(newBoard);
    setHistory(prev => [...prev, { p: 'X', r: row, c: col }]);

    const result = checkWinner(newBoard);
    if (result) {
      setWinner(result.winner);
      setWinLine(result.line);
      setGameOver(true);
      return;
    }

    if (isBoardFull(newBoard)) {
      setGameOver(true);
      return;
    }

    // AI move
    setIsAiThinking(true);
    try {
      const data = await getAIMove(newBoard, 'O', useAlphaBeta);
      if (data.nodes_evaluated !== undefined) {
        setNodesEvaluated(data.nodes_evaluated);
      }
      
      if (data.move) {
        const [aiRow, aiCol] = data.move;
        setTimeout(() => {
          newBoard[aiRow][aiCol] = 'O';
          setBoard([...newBoard]);
          setHistory(prev => [...prev, { p: 'O', r: aiRow, c: aiCol }]);
          setIsAiThinking(false);

          const aiResult = checkWinner(newBoard);
          if (aiResult) {
            setWinner(aiResult.winner);
            setWinLine(aiResult.line);
            setGameOver(true);
            return;
          }
          if (isBoardFull(newBoard)) {
            setGameOver(true);
            return;
          }
        }, 600); // Small delay to feel more natural
      }
    } catch (error) {
      console.error(error);
      setIsAiThinking(false);
    }
  };

  const resetGame = () => {
    setBoard(Array(3).fill().map(() => Array(3).fill('')));
    setGameOver(false);
    setWinner(null);
    setWinLine(null);
    setNodesEvaluated(null);
    setHistory([]);
    setIsAiThinking(false);
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        {/* Left Side: Game Board */}
        <div className="flex flex-col items-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-black mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600"
          >
            Tic-Tac-Toe AI
          </motion.h1>

          <div className="relative group">
            {/* Ambient background glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            
            <div className="relative bg-white/80 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-2xl">
              <div className="grid grid-cols-3 gap-3">
                {board.map((row, i) =>
                  row.map((cell, j) => {
                    const isWinningCell = winLine?.some(([r, c]) => r === i && c === j);
                    return (
                      <motion.div
                        key={`${i}-${j}`}
                        whileHover={!cell && !gameOver ? { scale: 1.05 } : {}}
                        whileTap={!cell && !gameOver ? { scale: 0.95 } : {}}
                        onClick={() => handleCellClick(i, j)}
                        className={`
                          w-24 h-24 rounded-xl flex items-center justify-center cursor-pointer transition-all duration-300
                          ${cell ? 'bg-white shadow-sm' : 'bg-gray-100/50 hover:bg-white'}
                          ${isWinningCell ? 'ring-4 ring-blue-500 ring-offset-2 scale-105 z-10' : ''}
                          border border-gray-200/50
                        `}
                      >
                        <AnimatePresence mode="wait">
                          {cell === 'X' && (
                            <motion.div
                              initial={{ scale: 0, rotate: -45 }}
                              animate={{ scale: 1, rotate: 0 }}
                              exit={{ scale: 0 }}
                              className="text-blue-600"
                            >
                              <X size={48} strokeWidth={3} />
                            </motion.div>
                          )}
                          {cell === 'O' && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              exit={{ scale: 0 }}
                              className="text-indigo-600"
                            >
                              <Circle size={48} strokeWidth={3} />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })
                )}
              </div>

              {/* AI Thinking Overlay */}
              <AnimatePresence>
                {isAiThinking && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-white/30 backdrop-blur-[2px] rounded-2xl flex flex-col items-center justify-center pointer-events-none"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="bg-indigo-600 p-4 rounded-full shadow-lg"
                    >
                      <Cpu className="text-white" size={32} />
                    </motion.div>
                    <span className="mt-2 font-bold text-indigo-700 bg-white/80 px-4 py-1 rounded-full text-sm">AI Thinking...</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="mt-8 flex gap-4">
            <button
              onClick={resetGame}
              className="group flex items-center gap-2 bg-white border-2 border-gray-200 px-6 py-2.5 rounded-xl font-bold text-gray-700 hover:border-blue-500 hover:text-blue-600 transition-all active:scale-95 shadow-sm"
            >
              <RotateCcw size={20} className="group-hover:rotate-[-45deg] transition-transform" />
              Reset Game
            </button>
            <label className="flex items-center gap-3 bg-white border-2 border-gray-200 px-6 py-2.5 rounded-xl font-bold text-gray-700 cursor-pointer hover:bg-gray-50 transition-all shadow-sm">
              <input
                type="checkbox"
                checked={useAlphaBeta}
                onChange={(e) => setUseAlphaBeta(e.target.checked)}
                className="w-5 h-5 rounded-md border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="flex items-center gap-2">
                <Zap size={18} className={useAlphaBeta ? "text-yellow-500" : "text-gray-400"} />
                Alpha-Beta
              </span>
            </label>
          </div>
        </div>

        {/* Right Side: Performance Dashboard */}
        <div className="space-y-6">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Activity className="text-blue-600" size={24} />
              </div>
              <h2 className="text-xl font-bold text-gray-800">AI Performance</h2>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              <div className="p-4 bg-gray-50 rounded-xl flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 font-medium">Nodes Evaluated</p>
                  <p className="text-3xl font-black text-blue-600">{nodesEvaluated ?? '--'}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400">Optimization</p>
                  <p className={`text-sm font-bold ${useAlphaBeta ? 'text-green-600' : 'text-gray-600'}`}>
                    {useAlphaBeta ? 'Active (Pruning)' : 'Standard'}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Game History</h3>
              <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                {history.length === 0 ? (
                  <p className="text-gray-400 italic text-sm">No moves made yet...</p>
                ) : (
                  history.map((move, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg text-sm"
                    >
                      <span className={`w-6 h-6 rounded flex items-center justify-center font-bold text-white ${move.p === 'X' ? 'bg-blue-500' : 'bg-indigo-500'}`}>
                        {move.p}
                      </span>
                      <span className="font-medium text-gray-700">Placed on Row {move.r + 1}, Col {move.c + 1}</span>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </motion.div>

          <AnimatePresence>
            {gameOver && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className={`p-8 rounded-2xl text-center shadow-2xl ${
                  winner === 'X' ? 'bg-blue-600 text-white' :
                  winner === 'O' ? 'bg-indigo-600 text-white' :
                  'bg-gray-800 text-white'
                }`}
              >
                <h2 className="text-3xl font-black mb-2">
                  {winner ? (winner === 'X' ? 'Victory!' : 'AI Wins!') : "It's a Draw!"}
                </h2>
                <p className="mb-6 opacity-80 font-medium">
                  {winner ? `${winner === 'X' ? 'You defeated' : 'You were bested by'} the Minimax algorithm.` : "A perfectly played game by both sides."}
                </p>
                <button
                  onClick={resetGame}
                  className="bg-white text-gray-900 px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition-all shadow-lg active:scale-95"
                >
                  Challenge Again
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default TicTacToe;
