import React, { useState } from 'react';
import { Send, MessageSquareHeart, User, ArrowLeft } from 'lucide-react';
import { EVENT_DETAILS } from '../constants';

interface GuestBookProps {
  onBack?: () => void;
  onSubmitSuccess?: () => void;
}

const GuestBook: React.FC<GuestBookProps> = ({ onBack, onSubmitSuccess }) => {
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  
  // Local state for demo purposes, in a real app this might come from a backend
  // For the "Send Greetings" flow, we focus on the form.
  const [recentMessages] = useState([
    { id: 1, name: 'Family & Friends', text: 'Best wishes for your second innings!', date: 'Recently' }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;

    // Send to WhatsApp
    const waText = encodeURIComponent(`*New Greeting*\nFrom: ${name}\nMessage: "${text}"`);
    window.open(`https://wa.me/91${EVENT_DETAILS.contactNumber}?text=${waText}`, '_blank');

    // Clear form
    setName('');
    setText('');

    // Trigger success navigation if prop provided
    if (onSubmitSuccess) {
      onSubmitSuccess();
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 my-8">
      <div className="bg-royal-900 p-4 flex items-center">
        {onBack && (
          <button onClick={onBack} className="text-gold-300 hover:text-white mr-3 transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
        )}
        <div className="flex-1 text-center pr-8"> {/* pr-8 balances the back button width for centering */}
            <h2 className="text-gold-300 font-serif text-2xl flex items-center justify-center gap-2">
            <MessageSquareHeart className="w-6 h-6" />
            Send Greetings
            </h2>
        </div>
      </div>
      
      <div className="bg-royal-50 p-3 text-center border-b border-royal-100">
        <p className="text-royal-800 text-xs uppercase tracking-widest font-semibold">Leave a message for Vishnu</p>
      </div>

      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4 mb-8">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-royal-800 focus:border-royal-800 sm:text-sm"
                placeholder="Enter your name"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
            <textarea
              id="message"
              rows={4}
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="block w-full p-3 border border-gray-300 rounded-lg focus:ring-royal-800 focus:border-royal-800 sm:text-sm"
              placeholder="Write your wishes here..."
              required
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-royal-800 hover:bg-royal-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-royal-800 transition-colors"
          >
            <Send className="w-4 h-4 mr-2" />
            Send Greeting via WhatsApp
          </button>
        </form>

        <div className="mt-8 border-t border-gray-100 pt-6">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 text-center">Recent Wishes</h3>
            <div className="space-y-3 opacity-80 hover:opacity-100 transition-opacity">
            {recentMessages.map((msg) => (
              <div key={msg.id} className="bg-slate-50 rounded-lg p-3 border border-slate-100 relative">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-bold text-royal-900 text-sm">{msg.name}</h4>
                  <span className="text-[10px] text-gray-400">{msg.date}</span>
                </div>
                <p className="text-gray-600 text-xs italic">"{msg.text}"</p>
              </div>
            ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default GuestBook;