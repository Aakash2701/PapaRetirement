import React, { useState } from 'react';
import { User, Phone, ArrowLeft } from 'lucide-react';
import { EVENT_DETAILS } from '../constants';

interface RsvpFormProps {
  onBack: () => void;
  onSubmit: () => void;
}

const RsvpForm: React.FC<RsvpFormProps> = ({ onBack, onSubmit }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    // Construct WhatsApp message
    const message = `*RSVP Confirmation*\nName: ${name}\nPhone: ${phone}\nStatus: I will be joining the retirement party.`;
    const waUrl = `https://wa.me/91${EVENT_DETAILS.contactNumber}?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp in new tab
    window.open(waUrl, '_blank');
    
    // Trigger success view
    onSubmit();
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 my-8">
      <div className="bg-green-600 p-4 flex items-center">
        <button onClick={onBack} className="text-white hover:bg-green-700 p-1 rounded-full mr-2">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-white font-serif text-xl flex items-center gap-2">
          Confirm Attendance
        </h2>
      </div>

      <div className="p-6">
        <p className="text-gray-600 mb-6 text-sm">
          Please fill in your details to confirm your presence at Mr. Vishnu Aggarwal's retirement party.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-green-500 focus:border-green-500"
                placeholder="Ex. Aakash Aggarwal"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-green-500 focus:border-green-500"
                placeholder="Ex. 9876543210"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-lg shadow-green-900/20 text-base font-semibold text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all active:scale-95"
          >
            Confirm & Send via WhatsApp
          </button>
        </form>
      </div>
    </div>
  );
};

export default RsvpForm;
