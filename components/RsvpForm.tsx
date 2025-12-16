import React, { useState, useEffect } from 'react';
import { Send, MessageSquareHeart, User, ArrowLeft, Loader2 } from 'lucide-react';
import { EVENT_DETAILS } from '../constants';
import { db } from '../firebase';
import { collection, addDoc, query, orderBy, limit, onSnapshot, serverTimestamp } from 'firebase/firestore';

interface GuestBookProps {
  onBack?: () => void;
  onSubmitSuccess?: () => void;
}

interface Message {
  id: string;
  name: string;
  text: string;
  timestamp: any;
}

const GuestBook: React.FC<GuestBookProps> = ({ onBack, onSubmitSuccess }) => {
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recentMessages, setRecentMessages] = useState<Message[]>([]);
  const [isLoadingMessages, setIsLoadingMessages] = useState(true);

  // Subscribe to messages
  useEffect(() => {
    const q = query(
      collection(db, 'messages'),
      orderBy('timestamp', 'desc'),
      limit(10)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs: Message[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Message));
      setRecentMessages(msgs);
      setIsLoadingMessages(false);
    }, (error) => {
      console.error("Error fetching messages:", error);
      setIsLoadingMessages(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;

    setIsSubmitting(true);

    // 1. Send to WhatsApp immediately (to avoid popup blockers)
    const waText = encodeURIComponent(`*New Greeting*\nFrom: ${name}\nMessage: "${text}"`);
    window.open(`https://wa.me/91${EVENT_DETAILS.contactNumber}?text=${waText}`, '_blank');

    try {
      // 2. Save to Firebase
      await addDoc(collection(db, 'messages'), {
        name: name,
        text: text,
        timestamp: serverTimestamp()
      });
    } catch (error) {
      console.error("Error saving message to database:", error);
    }

    // Clear form
    setName('');
    setText('');
    setIsSubmitting(false);

    // Trigger success navigation if prop provided
    if (onSubmitSuccess) {
      onSubmitSuccess();
    }
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'Just now';
    // Handle Firestore Timestamp or standard Date
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(date);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 my-8">
      <div className="bg-royal-900 p-4 flex items-center">
        {onBack && (
          <button onClick={onBack} className="text-gold-300 hover:text-white mr-3 transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
        )}
        <div className="flex-1 text-center pr-8">
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
                disabled={isSubmitting}
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
              disabled={isSubmitting}
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-royal-800 hover:bg-royal-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-royal-800 transition-colors disabled:opacity-70"
          >
            {isSubmitting ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Send className="w-4 h-4 mr-2" />
            )}
            Send Greeting & WhatsApp
          </button>
        </form>

        <div className="mt-8 border-t border-gray-100 pt-6">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 text-center">Recent Wishes</h3>
            
            {isLoadingMessages ? (
               <div className="flex justify-center p-4">
                 <Loader2 className="w-6 h-6 text-gray-300 animate-spin" />
               </div>
            ) : recentMessages.length === 0 ? (
              <p className="text-center text-gray-400 text-sm italic">Be the first to leave a message!</p>
            ) : (
              <div className="space-y-3">
                {recentMessages.map((msg) => (
                  <div key={msg.id} className="bg-slate-50 rounded-lg p-3 border border-slate-100 relative hover:shadow-sm transition-shadow">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-bold text-royal-900 text-sm">{msg.name}</h4>
                      <span className="text-[10px] text-gray-400">{formatDate(msg.timestamp)}</span>
                    </div>
                    <p className="text-gray-600 text-xs italic">"{msg.text}"</p>
                  </div>
                ))}
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default GuestBook;
