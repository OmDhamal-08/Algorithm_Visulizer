import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Layers, 
  Gamepad2, 
  BrainCircuit, 
  Zap, 
  Search, 
  Cpu 
} from 'lucide-react';

const features = [
  {
    title: 'Pathfinding Visualizer',
    description: 'Watch BFS, DFS, A*, and Dijkstra find the shortest path in real-time. Add obstacles and see algorithms adapt.',
    link: '/visualizer',
    icon: Layers,
    color: 'bg-blue-500',
    hover: 'hover:shadow-blue-500/20'
  },
  {
    title: 'Tic-Tac-Toe AI',
    description: 'Challenge an unbeatable AI powered by Minimax and Alpha-Beta pruning. See the "brain" work in real-time.',
    link: '/tictactoe',
    icon: Gamepad2,
    color: 'bg-indigo-500',
    hover: 'hover:shadow-indigo-500/20'
  },
  {
    title: 'AI Algorithm Tutor',
    description: 'An interactive textbook. Ask about any algorithm and get rich explanations with generated diagrams.',
    link: '/tutor',
    icon: BrainCircuit,
    color: 'bg-purple-500',
    hover: 'hover:shadow-purple-500/20'
  }
];

function Home() {
  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="relative pt-12 text-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full text-blue-600 font-bold text-sm mb-6 border border-blue-100">
            <Zap size={16} /> Now with Dijkstra's Algorithm
          </div>
          <h1 className="text-6xl md:text-7xl font-black tracking-tighter text-gray-900 mb-6">
            Understand AI through <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Interactive Visualization
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-gray-500 font-medium leading-relaxed mb-10">
            A high-fidelity platform designed to simplify complex algorithms. From pathfinding on grids to game trees, learn AI by seeing it in action.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/visualizer" className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white rounded-2xl font-black text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/30 active:scale-95 flex items-center justify-center gap-2">
              Start Visualizing <ArrowRight size={20} />
            </Link>
            <Link to="/tutor" className="w-full sm:w-auto px-8 py-4 bg-white border-2 border-gray-100 text-gray-900 rounded-2xl font-black text-lg hover:border-gray-200 transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2">
              Learn Algorithms <Search size={20} />
            </Link>
          </div>
        </motion.div>

        {/* Background glow effects */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-[120px] -z-10 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-indigo-400/10 rounded-full blur-[100px] -z-10"></div>
      </section>

      {/* Feature Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 px-2">
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ y: -8 }}
            className={`group bg-white rounded-3xl p-8 border border-gray-100 shadow-xl transition-all duration-300 ${feature.hover}`}
          >
            <div className={`${feature.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-8 shadow-lg group-hover:rotate-12 transition-transform duration-300`}>
              <feature.icon className="text-white" size={28} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
            <p className="text-gray-500 font-medium leading-relaxed mb-8">
              {feature.description}
            </p>
            <Link 
              to={feature.link}
              className="inline-flex items-center gap-2 font-black text-blue-600 hover:gap-3 transition-all"
            >
              Get Started <ArrowRight size={18} />
            </Link>
          </motion.div>
        ))}
      </section>

      {/* Stat Section */}
      <section className="bg-gray-900 rounded-[40px] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="text-5xl font-black text-white mb-2 italic">100%</div>
            <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">Interactive</p>
          </div>
          <div>
            <div className="text-5xl font-black text-white mb-2 italic">5+</div>
            <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">Core Algorithms</p>
          </div>
          <div>
            <div className="text-5xl font-black text-white mb-2 italic">AI</div>
            <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">Powered Tutor</p>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 p-8 opacity-20 text-blue-400">
          <Cpu size={120} />
        </div>
      </section>
    </div>
  );
}

export default Home;
