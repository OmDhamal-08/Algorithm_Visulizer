import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Home, 
  Layers, 
  Gamepad2, 
  BrainCircuit, 
  Menu, 
  X,
  Code2
} from 'lucide-react';

const navItems = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'Visualizer', path: '/visualizer', icon: Layers },
  { name: 'Tic-Tac-Toe', path: '/tictactoe', icon: Gamepad2 },
  { name: 'AI Tutor', path: '/tutor', icon: BrainCircuit },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/70 backdrop-blur-lg shadow-md py-2' : 'bg-transparent py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-blue-600 p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300">
              <Code2 className="text-white" size={24} />
            </div>
            <span className="font-black text-2xl tracking-tighter text-gray-900">
              AI<span className="text-blue-600">LAB</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center bg-gray-100/50 p-1 rounded-2xl border border-gray-200/50">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    relative flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300
                    ${isActive ? 'text-blue-600' : 'text-gray-500 hover:text-gray-900'}
                  `}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-white shadow-sm rounded-xl"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <item.icon size={18} className="relative z-10" />
                  <span className="relative z-10">{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-gray-600"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <motion.div
        initial={false}
        animate={isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
        className="md:hidden overflow-hidden bg-white border-b"
      >
        <div className="p-6 space-y-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-4 text-lg font-bold text-gray-700 hover:text-blue-600"
            >
              <item.icon size={24} />
              {item.name}
            </Link>
          ))}
        </div>
      </motion.div>
    </nav>
  );
}

export default Navbar;
