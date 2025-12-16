import React, { useState } from 'react';
import { User, Phone, ArrowLeft, Loader2, Sparkles, CheckCircle, XCircle } from 'lucide-react';
import { EVENT_DETAILS } from '../constants';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface RsvpFormProps {
  onBack: () => void;
  onSubmit: () => void;
}

const RsvpForm: React.FC<RsvpFormProps> = ({ onBack, onSubmit }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [attending, setAttending] = useState<'yes' | 'no'>('yes');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    setIsSubmitting(true);

    const statusText = attending === 'yes' ? 'I will be joining the retirement party.' : 'Sorry, I will not be able to attend.';
    const dbStatus = attending === 'yes' ? 'confirmed' : 'declined';

    // 1. Construct WhatsApp message & Redirect immediately
    const message = `*RSVP Response*\nName: ${name}\nPhone: ${phone}\nAttendance: ${attending === 'yes' ? 'Yes ✅' : 'No ❌'}\n${statusText}`;
    const waUrl = `https://wa.me/91${EVENT_DETAILS.contactNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(waUrl, '_blank');

    try {
      // 2. Save to Firebase
      await addDoc(collection(db, 'rsvps'), {
        name: name,
        phone: phone,
        attending: attending === 'yes',
        status: dbStatus,
        timestamp: serverTimestamp()
      });
    } catch (error) {
      console.error("Error saving RSVP to database:", error);
    }
    
    setIsSubmitting(false);

    // 3. Trigger success view
    onSubmit();
  };

  return (
    <div className="w-full max-w-md mx-auto bg-royal-900 rounded-2xl shadow-2xl overflow-hidden border border-gold-500/30 my-8 relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-royal-600/10 rounded-full blur-3xl -ml-10 -mb-10 pointer-events-none"></div>

      <div className="bg-royal-950/50 p-4 flex items-center border-b border-gold-500/20 backdrop-blur-sm">
        <button onClick={onBack} className="text-gold-300 hover:text-white hover:bg-white/10 p-2 rounded-full mr-2 transition-all">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-gold-100 font-serif text-xl flex items-center gap-2 tracking-wide">
          <Sparkles className="w-5 h-5 text-gold-400" />
          RSVP
        </h2>
      </div>

      <div className="p-8 relative z-10">
        <p className="text-royal-200 mb-6 text-sm leading-relaxed text-center font-serif">
          "We would be honored by your presence." <br/>
          <span className="text-gold-400/80 text-xs font-sans mt-2 block uppercase tracking-wider">Please confirm your details below</span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Attendance Selection */}
          <div className="grid grid-cols-2 gap-4">
            <label className={`cursor-pointer relative rounded-xl border-2 p-4 flex flex-col items-center justify-center transition-all duration-200 ${attending === 'yes' ? 'border-gold-500 bg-gold-500/20 shadow-lg shadow-gold-500/10' : 'border-royal-700 bg-royal-950/30 hover:bg-royal-950/50'}`}>
              <input 
                type="radio" 
                name="attendance" 
                value="yes" 
                checked={attending === 'yes'} 
                onChange={() => setAttending('yes')}
                className="sr-only"
              />
              <CheckCircle className={`w-8 h-8 mb-2 ${attending === 'yes' ? 'text-gold-400' : 'text-royal-600'}`} />
              <span className={`text-sm font-bold ${attending === 'yes' ? 'text-gold-100' : 'text-gray-400'}`}>Joyfully<br/>Accept</span>
            </label>

            <label className={`cursor-pointer relative rounded-xl border-2 p-4 flex flex-col items-center justify-center transition-all duration-200 ${attending === 'no' ? 'border-red-500 bg-red-500/20 shadow-lg shadow-red-500/10' : 'border-royal-700 bg-royal-950/30 hover:bg-royal-950/50'}`}>
              <input 
                type="radio" 
                name="attendance" 
                value="no" 
                checked={attending === 'no'} 
                onChange={() => setAttending('no')}
                className="sr-only"
              />
              <XCircle className={`w-8 h-8 mb-2 ${attending === 'no' ? 'text-red-400' : 'text-royal-600'}`} />
              <span className={`text-sm font-bold ${attending === 'no' ? 'text-red-100' : 'text-gray-400'}`}>Regretfully<br/>Decline</span>
            </label>
          </div>

          <div className="group">
            <label htmlFor="name" className="block text-sm font-medium text-gold-200 mb-2 transition-colors group-focus-within:text-gold-400">Full Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gold-500/50 group-focus-within:text-gold-400 transition-colors" />
              </div>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full pl-10 pr-3 py-3.5 bg-royal-950/50 border border-royal-700 rounded-xl focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 text-black placeholder-royal-400/50 transition-all outline-none"
                placeholder="Ex. Aakash Aggarwal"
                required
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="group">
            <label htmlFor="phone" className="block text-sm font-medium text-gold-200 mb-2 transition-colors group-focus-within:text-gold-400">Phone Number</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone className="h-5 w-5 text-gold-500/50 group-focus-within:text-gold-400 transition-colors" />
              </div>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="block w-full pl-10 pr-3 py-3.5 bg-royal-950/50 border border-royal-700 rounded-xl focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 text-black placeholder-royal-400/50 transition-all outline-none"
                placeholder="Ex. 9876543210"
                required
                disabled={isSubmitting}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full flex justify-center items-center py-4 px-4 border border-transparent rounded-xl shadow-lg text-base font-bold text-royal-950 transition-all transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed mt-4
              ${attending === 'yes' 
                ? 'bg-gradient-to-r from-gold-300 via-gold-400 to-gold-300 hover:from-gold-200 hover:via-gold-300 hover:to-gold-200 shadow-gold-900/10 focus:ring-gold-400' 
                : 'bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 hover:from-gray-200 hover:via-gray-300 hover:to-gray-200 shadow-gray-900/10 focus:ring-gray-400'
              }`}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin text-royal-900" />
                Processing...
              </>
            ) : (
              'Confirm & Notify via WhatsApp'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RsvpForm;
