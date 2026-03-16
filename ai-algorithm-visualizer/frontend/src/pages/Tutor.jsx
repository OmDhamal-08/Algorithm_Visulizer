import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BrainCircuit, 
  Send, 
  Sparkles, 
  History, 
  Trash2, 
  ArrowRight,
  User,
  Bot
} from 'lucide-react';
import { askTutor } from '../services/api';

const suggestedTopics = [
  { label: 'Shortest Path', q: 'How does Dijkstra algorithm find shortest path?' },
  { label: 'A* Magic', q: 'Explain A* heuristic magic formula' },
  { label: 'Minimax AI', q: 'How does AI think in Tic-Tac-Toe?' },
  { label: 'BFS vs DFS', q: 'What is the difference between BFS and DFS?' }
];

function Tutor() {
  const [question, setQuestion] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, loading]);

  const handleSubmit = async (e, customQuestion = null) => {
    if (e) e.preventDefault();
    const finalQuestion = customQuestion || question;
    if (!finalQuestion.trim() || loading) return;

    const userMsg = { role: 'user', text: finalQuestion };
    setChatHistory(prev => [...prev, userMsg]);
    setQuestion('');
    setLoading(true);

    try {
      const data = await askTutor(finalQuestion);
      const aiMsg = { 
        role: 'ai', 
        title: data.title, 
        explanation: data.explanation, 
        image: data.image 
      };
      setChatHistory(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error(error);
      setChatHistory(prev => [...prev, { 
        role: 'ai', 
        title: 'System Error', 
        explanation: 'I am having trouble connecting to my knowledge base. Please ensure the backend is running.' 
      }]);
    } finally {
      setLoading(false);
    }
  };

  const clearHistory = () => {
    setChatHistory([]);
  };

  return (
    <div className="max-w-5xl mx-auto h-[80vh] flex flex-col gap-6">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="bg-blue-600 p-1.5 rounded-lg shadow-lg shadow-blue-500/20">
              <BrainCircuit className="text-white" size={24} />
            </div>
            <span className="text-xs font-black text-blue-600 uppercase tracking-widest">AI LAB Assistant</span>
          </div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">Algorithm Architect</h1>
        </div>
        
        <button 
          onClick={clearHistory}
          className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-red-500 font-bold transition-colors text-sm"
        >
          <Trash2 size={16} /> Clear Session
        </button>
      </div>

      {/* Main Chat Window */}
      <div className="flex-grow bg-white/50 backdrop-blur-xl border border-gray-200 rounded-[32px] shadow-2xl overflow-hidden flex flex-col">
        
        {/* Messages Area */}
        <div className="flex-grow overflow-y-auto p-6 md:p-10 space-y-8 custom-scrollbar">
          {chatHistory.length === 0 && !loading && (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
              <div className="bg-blue-100 p-6 rounded-full animate-bounce">
                <Sparkles className="text-blue-600" size={48} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Hello! I'm your AI Tutor.</h2>
                <p className="text-gray-500 font-medium max-w-sm mx-auto mt-2">
                  Ask me anything about pathfinding algorithms, heuristics, or game trees.
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-xl">
                {suggestedTopics.map((topic, i) => (
                  <button
                    key={i}
                    onClick={() => handleSubmit(null, topic.q)}
                    className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl hover:border-blue-300 hover:bg-blue-50 transition-all text-left group shadow-sm"
                  >
                    <span className="font-bold text-gray-700">{topic.label}</span>
                    <ArrowRight size={18} className="text-gray-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          )}

          <AnimatePresence initial={false}>
            {chatHistory.map((chat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-4 ${chat.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {chat.role === 'ai' && (
                  <div className="flex-shrink-0 w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                    <Bot className="text-white" size={20} />
                  </div>
                )}
                
                <div className={`max-w-[85%] ${chat.role === 'user' ? 'order-1' : 'order-2'}`}>
                  {chat.role === 'user' ? (
                    <div className="bg-blue-600 text-white px-6 py-3 rounded-2xl rounded-tr-none shadow-lg font-bold">
                      {chat.text}
                    </div>
                  ) : (
                    <div className="bg-white border border-gray-100 p-1 rounded-3xl shadow-xl overflow-hidden">
                      <div className="flex flex-col lg:flex-row min-h-[300px]">
                        {chat.image && (
                          <div className="lg:w-[40%] bg-gray-50 flex items-center justify-center p-6 border-b lg:border-b-0 lg:border-r border-gray-100">
                            <img 
                              src={chat.image} 
                              alt={chat.title} 
                              className="max-w-full h-auto rounded-xl shadow-md hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                        )}
                        <div className={`p-8 ${chat.image ? 'lg:w-[60%]' : 'w-full'}`}>
                          <h3 className="text-2xl font-black text-blue-600 mb-4 flex items-center gap-2">
                            {chat.title}
                          </h3>
                          <div className="prose prose-blue max-w-none prose-p:text-gray-600 prose-li:text-gray-600 prose-strong:text-indigo-700 font-medium">
                            <ReactMarkdown>{chat.explanation}</ReactMarkdown>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {chat.role === 'user' && (
                  <div className="flex-shrink-0 w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center order-2">
                    <User className="text-gray-500" size={20} />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {loading && (
            <div className="flex gap-4 justify-start translate-y-2">
              <div className="flex-shrink-0 w-10 h-10 bg-indigo-600/50 rounded-full flex items-center justify-center animate-pulse">
                <Bot className="text-white" size={20} />
              </div>
              <div className="bg-white border border-gray-100 px-6 py-4 rounded-3xl rounded-tl-none shadow-md flex items-center gap-3">
                <div className="flex gap-1">
                  <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1 }} className="w-2 h-2 bg-blue-500 rounded-full"></motion.div>
                  <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-2 h-2 bg-blue-500 rounded-full"></motion.div>
                  <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-2 h-2 bg-blue-500 rounded-full"></motion.div>
                </div>
                <span className="text-sm font-bold text-gray-400">Thinking...</span>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-6 bg-gray-50/50 border-t border-gray-100">
          <form onSubmit={handleSubmit} className="flex gap-3 relative max-w-3xl mx-auto">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask anything about AI algorithms..."
              className="w-full bg-white border-2 border-gray-100 rounded-2xl px-6 py-4 pr-16 focus:outline-none focus:border-blue-500 transition-all font-bold text-gray-700 shadow-sm"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !question.trim()}
              className="absolute right-2 top-2 bottom-2 bg-blue-600 text-white px-5 rounded-xl font-bold hover:bg-blue-700 disabled:opacity-50 transition-all flex items-center justify-center shadow-lg active:scale-95"
            >
              <Send size={20} />
            </button>
          </form>
          <div className="text-center mt-3 flex items-center justify-center gap-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
            <span>Powered by Algorithm Intelligence</span>
            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
            <span>Real-time Learning</span>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Tutor;
