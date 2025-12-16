import React from 'react';
import { CheckCircle, Home } from 'lucide-react';

interface SuccessPageProps {
  onBack: () => void;
}

const SuccessPage: React.FC<SuccessPageProps> = ({ onBack }) => {
  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 p-8 text-center animate-fade-in my-8">
      <div className="flex justify-center mb-6">
        <div className="rounded-full bg-green-100 p-4">
          <CheckCircle className="w-16 h-16 text-green-600" />
        </div>
      </div>
      
      <h2 className="text-3xl font-serif text-royal-900 mb-4">Thanks for responding!</h2>
      <p className="text-gray-600 mb-8 font-sans">
        We have received your response and look forward to celebrating with you.
      </p>

      <button
        onClick={onBack}
        className="flex items-center justify-center w-full px-6 py-3.5 text-white bg-royal-800 hover:bg-royal-900 rounded-xl shadow-lg shadow-royal-900/20 transition-all active:scale-95 font-semibold"
      >
        <Home className="w-5 h-5 mr-2" />
        Back to Home
      </button>
    </div>
  );
};

export default SuccessPage;