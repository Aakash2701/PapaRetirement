import React, { useState } from 'react';
import InvitationCard from './components/InvitationCard';
import GuestBook from './components/GuestBook';
import RsvpForm from './components/RsvpForm';
import SuccessPage from './components/SuccessPage';
import AdminPanel from './components/AdminPanel';

type ViewState = 'home' | 'rsvp' | 'greetings' | 'success' | 'admin';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('home');

  const renderContent = () => {
    switch (view) {
      case 'rsvp':
        return (
          <RsvpForm 
            onBack={() => setView('home')} 
            onSubmit={() => setView('success')} 
          />
        );
      case 'greetings':
        return (
          <GuestBook 
            onBack={() => setView('home')} 
            onSubmitSuccess={() => setView('success')} 
          />
        );
      case 'success':
        return (
          <SuccessPage 
            onBack={() => setView('home')} 
          />
        );
      case 'admin':
        return (
          <AdminPanel 
            onBack={() => setView('home')}
          />
        );
      case 'home':
      default:
        return (
          <InvitationCard 
            onRsvpClick={() => setView('rsvp')}
            onGreetingsClick={() => setView('greetings')}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-fixed bg-slate-100 py-6 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-br from-royal-900/5 to-gold-500/5 pointer-events-none z-0"></div>
      
      <div className="z-10 w-full mb-12">
        {renderContent()}
        
        {view !== 'admin' && (
          <footer className="mt-12 text-center text-gray-500 text-sm pb-8">
            <p>© {new Date().getFullYear()} Aggarwal Family</p>
            <p className="text-xs mt-1 opacity-60">We look forward to seeing you!</p>
            <button 
              onClick={() => setView('admin')}
              className="mt-6 text-[10px] uppercase tracking-widest text-gray-400 hover:text-royal-800 transition-colors border-b border-transparent hover:border-royal-800"
            >
              Admin Login
            </button>
          </footer>
        )}
      </div>
    </div>
  );
};

export default App;
