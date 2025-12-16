import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { Lock, LogOut, Users, MessageSquare, Loader2 } from 'lucide-react';

interface AdminPanelProps {
  onBack: () => void;
}

interface RsvpData {
  id: string;
  name: string;
  phone: string;
  status: string;
  timestamp: any;
}

interface MessageData {
  id: string;
  name: string;
  text: string;
  timestamp: any;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onBack }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const [activeTab, setActiveTab] = useState<'guests' | 'messages'>('guests');
  const [isLoading, setIsLoading] = useState(false);
  const [guests, setGuests] = useState<RsvpData[]>([]);
  const [messages, setMessages] = useState<MessageData[]>([]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      // Fetch RSVPs
      const rsvpQuery = query(collection(db, 'rsvps'), orderBy('timestamp', 'desc'));
      const rsvpSnapshot = await getDocs(rsvpQuery);
      const rsvpList = rsvpSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as RsvpData));
      setGuests(rsvpList);

      // Fetch Messages
      const msgQuery = query(collection(db, 'messages'), orderBy('timestamp', 'desc'));
      const msgSnapshot = await getDocs(msgQuery);
      const msgList = msgSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as MessageData));
      setMessages(msgList);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Simple static authentication
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      setIsAuthenticated(true);
      fetchData();
    } else {
      setError('Invalid credentials');
    }
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return '-';
    // Handle Firestore Timestamp or standard Date
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' 
    }).format(date);
  };

  if (!isAuthenticated) {
    return (
      <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 my-8 p-8">
        <div className="text-center mb-6">
          <div className="bg-royal-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
             <Lock className="w-6 h-6 text-royal-800" />
          </div>
          <h2 className="text-2xl font-serif text-royal-900">Admin Access</h2>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input 
              type="text" 
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-royal-800 focus:border-royal-800"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-royal-800 focus:border-royal-800"
            />
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <div className="flex gap-3 pt-2">
            <button 
              type="button"
              onClick={onBack}
              className="flex-1 py-2.5 px-4 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 font-medium"
            >
              Back
            </button>
            <button 
              type="submit"
              className="flex-1 py-2.5 px-4 bg-royal-800 text-white rounded-xl hover:bg-royal-900 font-medium shadow-lg shadow-royal-900/20"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 my-4 sm:my-8 flex flex-col h-[80vh]">
      {/* Header */}
      <div className="bg-royal-900 p-4 flex justify-between items-center text-white shrink-0">
        <h2 className="font-serif text-xl flex items-center gap-2">
           Admin Dashboard
        </h2>
        <button onClick={onBack} className="text-gold-300 hover:text-white flex items-center text-sm gap-1 transition-colors">
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 bg-gray-50 shrink-0">
        <button
          onClick={() => setActiveTab('guests')}
          className={`flex-1 py-3 text-sm font-medium text-center flex items-center justify-center gap-2 transition-colors ${activeTab === 'guests' ? 'text-royal-800 border-b-2 border-royal-800 bg-white' : 'text-gray-500 hover:text-gray-700'}`}
        >
          <Users className="w-4 h-4" /> Guest List ({guests.length})
        </button>
        <button
          onClick={() => setActiveTab('messages')}
          className={`flex-1 py-3 text-sm font-medium text-center flex items-center justify-center gap-2 transition-colors ${activeTab === 'messages' ? 'text-royal-800 border-b-2 border-royal-800 bg-white' : 'text-gray-500 hover:text-gray-700'}`}
        >
          <MessageSquare className="w-4 h-4" /> Messages ({messages.length})
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4 bg-white relative">
        {isLoading ? (
          <div className="absolute inset-0 flex justify-center items-center bg-white/80 z-10">
            <Loader2 className="w-8 h-8 text-royal-800 animate-spin" />
          </div>
        ) : (
          <>
            {activeTab === 'guests' && (
              <div className="overflow-x-auto">
                 <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50 sticky top-0">
                      <tr>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {guests.map((guest) => (
                        <tr key={guest.id} className="hover:bg-gray-50">
                          <td className="px-3 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{guest.name}</td>
                          <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-500">
                            <a href={`tel:${guest.phone}`} className="hover:text-royal-800 hover:underline">{guest.phone}</a>
                          </td>
                          <td className="px-3 py-3 whitespace-nowrap text-xs text-gray-400">{formatDate(guest.timestamp)}</td>
                        </tr>
                      ))}
                      {guests.length === 0 && (
                        <tr>
                          <td colSpan={3} className="px-3 py-8 text-center text-sm text-gray-500">No RSVPs received yet.</td>
                        </tr>
                      )}
                    </tbody>
                 </table>
              </div>
            )}

            {activeTab === 'messages' && (
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className="border border-gray-100 rounded-lg p-3 hover:bg-gray-50 transition-colors bg-slate-50">
                     <div className="flex justify-between items-start mb-1">
                        <h4 className="font-bold text-royal-900">{msg.name}</h4>
                        <span className="text-xs text-gray-400">{formatDate(msg.timestamp)}</span>
                     </div>
                     <p className="text-gray-600 text-sm whitespace-pre-wrap">"{msg.text}"</p>
                  </div>
                ))}
                {messages.length === 0 && (
                   <p className="text-center text-gray-500 py-8">No messages received yet.</p>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
