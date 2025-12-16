import React from 'react';
import { MapPin, Calendar, Clock, Phone, Navigation, MessageCircleHeart, Star } from 'lucide-react';
import { EVENT_DETAILS } from '../constants';
import HeaderImage from './HeaderImage';
import InfoRow from './InfoRow';
import CountdownTimer from './CountdownTimer';

interface InvitationCardProps {
  onRsvpClick: () => void;
  onGreetingsClick: () => void;
}

const InvitationCard: React.FC<InvitationCardProps> = ({ onRsvpClick, onGreetingsClick }) => {
  return (
    <div className="w-full max-w-md mx-auto bg-gradient-to-b from-white via-orange-50/30 to-white rounded-2xl shadow-2xl overflow-hidden border-4 border-double border-gold-200 my-4 sm:my-8 transform transition-all hover:scale-[1.005] relative group">
      
      {/* Subtle texture overlay for "paper" feel */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-40 pointer-events-none z-20"></div>

      <HeaderImage />
      
      <div className="px-6 pb-8 text-center relative z-10">
        
        {/* Profile Picture */}
        <div className="flex justify-center -mt-20 sm:-mt-24 mb-6">
          <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full border-[6px] border-white shadow-2xl overflow-hidden bg-gray-100 ring-1 ring-gray-100 group-hover:shadow-gold-500/20 transition-shadow duration-500">
             <img 
                src={EVENT_DETAILS.profileImage}
                alt={EVENT_DETAILS.honoree}
                className="w-full h-full object-cover"
             />
          </div>
        </div>

        {/* Title Section */}
        <div className="mb-6 relative">
          <div className="flex justify-center items-center gap-2 mb-2">
            <div className="h-[1px] w-8 bg-gold-300"></div>
            <p className="text-xs font-bold text-gold-600 uppercase tracking-[0.2em]">Cordially Invited</p>
            <div className="h-[1px] w-8 bg-gold-300"></div>
          </div>
          
          <h2 className="text-royal-900 font-serif italic text-4xl sm:text-5xl mb-2 tracking-wide leading-tight">Retirement Party</h2>
          
          <div className="mt-4 mb-5">
             <span className="text-gray-400 text-sm font-serif italic">Honoring the career of</span>
             <h1 className="text-2xl sm:text-3xl font-serif font-bold text-royal-900 mt-1 leading-tight px-2 drop-shadow-sm">
              {EVENT_DETAILS.honoree}
            </h1>
          </div>

          {/* Company Logo Section */}
          <div className="flex flex-col items-center justify-center mb-8 bg-white/80 backdrop-blur-sm py-5 px-4 rounded-2xl border border-gold-100 mx-2 shadow-sm">
            <p className="text-gray-600 text-sm font-medium mb-3 uppercase tracking-wide text-[10px]">Retiring as Chief Manager</p>
            <img 
                src={EVENT_DETAILS.companyLogo}
                alt="Oriental Insurance Company Logo"
                className="h-14 sm:h-16 w-auto object-contain mb-3 mix-blend-multiply opacity-90" 
            />
            <span className="text-lg sm:text-xl font-bold text-royal-900 mt-1 leading-snug max-w-xs font-serif">{EVENT_DETAILS.company}</span>
          </div>
        </div>

        {/* Countdown Timer */}
        <div className="mb-8">
           <CountdownTimer />
        </div>

        {/* Invitation Text */}
        <div className="mb-8 px-4">
          <p className="text-gray-600 leading-relaxed font-sans text-sm sm:text-base italic">
            "With a heart full of gratitude and a lifetime of memories, please join us for a celebratory lunch as we honor his dedication and wish him well on his new journey."
          </p>
        </div>

        {/* Details Section */}
        <div className="space-y-3 text-left bg-royal-50/50 rounded-2xl p-5 border border-royal-100/50 transition-transform duration-300 ease-in-out hover:scale-[1.01] hover:bg-royal-50/80">
          <InfoRow 
            icon={Calendar} 
            title="Date" 
            detail={EVENT_DETAILS.date} 
          />
          <div className="h-[1px] bg-royal-100/50 mx-4"></div>
          <InfoRow 
            icon={Clock} 
            title="Time" 
            detail={EVENT_DETAILS.time} 
          />
          <div className="h-[1px] bg-royal-100/50 mx-4"></div>
          <InfoRow 
            icon={MapPin} 
            title="Location" 
            detail={EVENT_DETAILS.venue}
            subDetail={EVENT_DETAILS.venueAddress}
          />
        </div>

        {/* Action Buttons */}
        <div className="mt-8 space-y-4">
          <button 
            onClick={onRsvpClick}
            className="relative overflow-hidden flex items-center justify-center w-full px-6 py-4 text-white bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 rounded-xl shadow-lg shadow-green-900/20 hover:shadow-green-900/30 hover:-translate-y-1 transition-all duration-300 ease-out active:scale-95 font-bold tracking-wide group"
          >
            <span className="absolute inset-0 w-full h-full bg-white/20 group-hover:translate-x-full transition-transform duration-500 ease-in-out -translate-x-full transform skew-x-12"></span>
            <div className="flex items-center relative z-10">
              <Star className="w-5 h-5 mr-2 text-yellow-300 fill-current animate-pulse" />
              <span>RSVP & Join the Celebration</span>
            </div>
          </button>

          <div className="grid grid-cols-2 gap-3">
             <button 
                onClick={onGreetingsClick}
                className="flex flex-col items-center justify-center px-4 py-3 text-white bg-royal-800 hover:bg-royal-700 rounded-xl shadow-md transition-all active:scale-95 text-xs font-semibold border border-royal-700 hover:border-royal-600"
              >
                <MessageCircleHeart className="w-6 h-6 mb-1 text-gold-300" />
                Send Greetings
              </button>

             <a 
                href={EVENT_DETAILS.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center px-4 py-3 text-royal-900 bg-white border border-gray-200 hover:bg-gray-50 rounded-xl shadow-md transition-all active:scale-95 text-xs font-semibold"
              >
                <Navigation className="w-6 h-6 mb-1 text-royal-600" />
                Get Directions
              </a>
          </div>

          
          <a 
            href={`tel:${EVENT_DETAILS.contactNumber}`}
            className="flex items-center justify-center w-full px-6 py-3 text-royal-800/80 hover:text-royal-900 bg-transparent hover:bg-gold-50/50 rounded-xl transition-all active:scale-95 font-medium border border-transparent hover:border-gold-200 text-sm"
          >
            <Phone className="w-4 h-4 mr-2" />
            Have questions? Call Us
          </a>
        </div>

        {/* Footer RSVP */}
        <div className="mt-8 pt-6 border-t border-gray-100/60">
          <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-2">RSVP Co-ordinator</p>
          <p className="font-serif text-lg text-royal-900 font-medium">{EVENT_DETAILS.rsvpName}</p>
        </div>
      </div>
    </div>
  );
};

export default InvitationCard;
