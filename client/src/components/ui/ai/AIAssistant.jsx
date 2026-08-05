import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Send, User, Bot, TrendingUp, Package, Users } from 'lucide-react';

const suggestedPrompts = [
  { text: "How were sales today?", icon: TrendingUp },
  { text: "What should I restock?", icon: Package },
  { text: "Inactive customers?", icon: Users },
];

export const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Hello! I am your AI Business Assistant. How can I help you optimize your restaurant today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (text = input) => {
    if (!text.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { role: 'user', text }]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      let response = "I've analyzed your data. Based on recent trends, everything is operating smoothly.";
      
      if (text.toLowerCase().includes('sales')) {
        response = "Today's gross sales are ₹12,400, up 15% from last week. The peak order time was between 1 PM and 2 PM.";
      } else if (text.toLowerCase().includes('restock')) {
        response = "Based on current inventory and forecasted demand, you should restock: Mozzarella Cheese (low), Pizza Dough (critical), and Coca-Cola cans.";
      }

      setMessages(prev => [...prev, { role: 'assistant', text: response }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 p-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-full shadow-2xl shadow-orange-500/40 flex items-center justify-center hover:shadow-orange-500/60 transition-shadow"
      >
        <Sparkles size={24} />
      </motion.button>

      {/* Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
            />

            {/* AI Drawer */}
            <motion.div
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-sm bg-white dark:bg-slate-900 shadow-2xl z-50 flex flex-col border-l border-gray-100 dark:border-slate-800"
            >
              {/* Header */}
              <div className="p-4 border-b border-gray-100 dark:border-slate-800 flex items-center justify-between bg-gradient-to-r from-orange-50 dark:from-orange-500/10 to-transparent">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-500 rounded-xl">
                    <Sparkles size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 dark:text-white">AI Assistant</h3>
                    <p className="text-xs text-orange-600 dark:text-orange-500 font-semibold">Online & Analyzing</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Chat Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-gray-50/50 dark:bg-slate-900/50">
                {messages.map((msg, idx) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={idx} 
                    className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.role === 'assistant' && (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center text-white shrink-0 mt-1">
                        <Bot size={16} />
                      </div>
                    )}
                    
                    <div className={`px-4 py-2.5 rounded-2xl max-w-[80%] text-sm ${
                      msg.role === 'user' 
                        ? 'bg-gray-900 dark:bg-slate-700 text-white rounded-tr-sm' 
                        : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-200 border border-gray-100 dark:border-slate-700 rounded-tl-sm shadow-sm'
                    }`}>
                      {msg.text}
                    </div>

                    {msg.role === 'user' && (
                      <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-slate-600 flex items-center justify-center text-gray-500 dark:text-gray-300 shrink-0 mt-1">
                        <User size={16} />
                      </div>
                    )}
                  </motion.div>
                ))}

                {isTyping && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3 justify-start">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center text-white shrink-0 mt-1">
                      <Bot size={16} />
                    </div>
                    <div className="px-4 py-3 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-tl-sm shadow-sm flex gap-1">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Suggestions */}
              {messages.length === 1 && (
                <div className="px-4 pb-2 pt-2 flex gap-2 overflow-x-auto custom-scrollbar whitespace-nowrap bg-gray-50/50 dark:bg-slate-900/50 border-t border-gray-100 dark:border-slate-800">
                  {suggestedPrompts.map((p, i) => (
                    <button
                      key={i}
                      onClick={() => handleSend(p.text)}
                      className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-gray-300 hover:border-orange-500 hover:text-orange-500 transition-colors"
                    >
                      <p.icon size={12} />
                      {p.text}
                    </button>
                  ))}
                </div>
              )}

              {/* Input */}
              <div className="p-4 border-t border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900">
                <div className="relative">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Ask about sales, stock, customers..."
                    className="w-full pl-4 pr-12 py-3 rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-sm text-gray-800 dark:text-white transition-all"
                  />
                  <button 
                    onClick={() => handleSend()}
                    disabled={!input.trim()}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:hover:bg-orange-500 transition"
                  >
                    <Send size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
