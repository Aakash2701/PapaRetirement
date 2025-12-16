import React from 'react';
import { CheckCircle, Home, Heart } from 'lucide-react';

interface SuccessPageProps {
  onBack: () => void;
}

const SuccessPage: React.FC<SuccessPageProps> = ({ onBack }) => {
  return (
    <div className="w-full max-w-md mx-auto bg-royal-900 rounded-2xl shadow-2xl overflow-hidden border border-gold-500/30 p-8 text-center animate-fade-in my-8 relative">
       {/* Confetti-like background effects */}
      <div className="absolute top-10 left-10 w-2 h-2 bg-gold-400 rounded-full animate-pulse"></div>
      <div className="absolute top-20 right-20 w-3 h-3 bg-red-400 rounded-full animate-bounce"></div>
      <div className="absolute bottom-10 right-10 w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-100"></div>

      <div className="flex justify-center mb-8 relative z-10">
        <div className="rounded-full bg-green-500/20 p-6 ring-4 ring-green-500/30">
          <CheckCircle className="w-20 h-20 text-green-400 drop-shadow-lg" />
        </div>
      </div>
      
      <h2 className="text-3xl font-serif text-white mb-4 tracking-wide">Thank You!</h2>
      <p className="text-gray-300 mb-10 font-sans leading-relaxed">
        Your response has been recorded. <br/>
        <span className="text-gold-300 italic">We look forward to seeing you there!</span>
      </p>

      <button
        onClick={onBack}
        className="flex items-center justify-center w-full px-6 py-4 text-royal-900 bg-white hover:bg-gray-100 rounded-xl shadow-lg shadow-white/10 transition-all active:scale-95 font-bold"
      >
        <Home className="w-5 h-5 mr-2 text-royal-800" />
        Back to Invitation
      </button>
      
      <div className="mt-8 flex justify-center text-royal-500/30">
        <Heart className="w-24 h-24 opacity-10" />
      </div>
    </div>
  );
};

export default SuccessPage;
