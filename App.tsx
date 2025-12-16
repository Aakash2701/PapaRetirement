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
            onSubmit={() => setView('success')} 
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
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* Animated Background Gradient - Light Version */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-orange-50 animate-gradient-slow"></div>

      {/* Floating Particles/Balloons Effect - Adjusted for light background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[10%] w-24 h-24 bg-gold-500/10 rounded-full blur-2xl animate-float-slow"></div>
        <div className="absolute top-[60%] right-[10%] w-32 h-32 bg-royal-800/5 rounded-full blur-3xl animate-float-medium delay-1000"></div>
        <div className="absolute bottom-[10%] left-[20%] w-20 h-20 bg-green-500/5 rounded-full blur-xl animate-float-fast delay-2000"></div>
        
        {/* Confetti specs - Darker for visibility on light bg */}
        <div className="absolute top-[20%] left-[5%] w-2 h-2 bg-gold-400/60 rounded-full animate-bounce delay-700"></div>
        <div className="absolute bottom-[40%] right-[5%] w-3 h-3 bg-royal-400/40 rounded-full animate-bounce delay-150"></div>
      </div>
      
      {/* Texture overlay */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-30 pointer-events-none mix-blend-multiply"></div>

      <div className="z-10 w-full mb-12 relative">
        {renderContent()}
        
        {view !== 'admin' && (
          <footer className="mt-12 text-center text-gray-500 text-sm pb-8">
            <p className="font-serif italic">© {new Date().getFullYear()} Aggarwal Family</p>
            <p className="text-xs mt-2 opacity-60">We look forward to seeing you!</p>
          </* button 
              onClick={() => setView('admin')}
              className="mt-6 text-[10px] uppercase tracking-widest text-gray-400 hover:text-royal-800 transition-colors border-b border-transparent hover:border-royal-800"
            >
              Admin Login
            </button*/>
          </footer>
        )}
      </div>

      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-20px) scale(1.05); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-15px) translateX(10px); }
        }
        @keyframes float-fast {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float-slow { animation: float-slow 8s infinite ease-in-out; }
        .animate-float-medium { animation: float-medium 6s infinite ease-in-out; }
        .animate-float-fast { animation: float-fast 4s infinite ease-in-out; }
        .animate-gradient-slow { background-size: 200% 200%; animation: gradient 15s ease infinite; }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
};

export default App;
