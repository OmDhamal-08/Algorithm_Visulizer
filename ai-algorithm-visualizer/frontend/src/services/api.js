import axios from 'axios';

const API_BASE = 'http://localhost:8000/api';

export const runAlgorithm = async (algorithm, grid, start, goal) => {
  const response = await axios.post(`${API_BASE}/${algorithm}/`, {
    grid,
    start,
    goal,
  });
  return response.data;
};

export const getAIMove = async (board, player, useAlphaBeta) => {
  const response = await axios.post(`${API_BASE}/minimax/`, {
    board,
    player,
    use_alphabeta: useAlphaBeta,
  });
  return response.data;
};

export const askTutor = async (question) => {
  const response = await axios.post(`${API_BASE}/tutor/`, {
    question,
  });
  return response.data;
};