import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Visualizer from './pages/Visualizer';
import TicTacToe from './pages/TicTacToe';
import Tutor from './pages/Tutor';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24 pb-12">
          <div className="container mx-auto px-6">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/visualizer" element={<Visualizer />} />
              <Route path="/tictactoe" element={<TicTacToe />} />
              <Route path="/tutor" element={<Tutor />} />
            </Routes>
          </div>
        </main>
        
        {/* Simple Footer */}
        <footer className="py-8 border-t border-gray-200 bg-white">
          <div className="max-w-7xl mx-auto px-6 text-center text-gray-500 text-sm font-medium">
            © 2026 AI Algorithm Lab. Built for interactive learning.
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
