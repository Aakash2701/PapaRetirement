import React from 'react';
import { MapPin, Calendar, Clock, Phone, Navigation, CheckCircle, MessageCircleHeart } from 'lucide-react';
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
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 my-4 sm:my-8 transform transition-all hover:scale-[1.01]">
      <HeaderImage />
      
      <div className="px-6 pb-8 text-center relative z-10">
        
        {/* Profile Picture Placeholder - Overlapping the header */}
        <div className="flex justify-center -mt-20 sm:-mt-24 mb-4">
          <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full border-4 border-white shadow-xl overflow-hidden bg-gray-100 ring-1 ring-gray-100">
             <img 
                src={EVENT_DETAILS.profileImage}
                alt={EVENT_DETAILS.honoree}
                className="w-full h-full object-cover"
             />
          </div>
        </div>

        {/* Title Section */}
        <div className="mb-4">
          {/* Changed font from script to serif italic for a more distinct/formal look as requested */}
          <h2 className="text-royal-800 font-serif italic text-4xl mb-1 tracking-wide">Retirement Party</h2>
          <p className="text-xs font-bold text-gold-700 uppercase tracking-widest mb-3">Honoring</p>
          
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 mb-4 leading-tight px-2">
            {EVENT_DETAILS.honoree}
          </h1>

          {/* Company Logo Section */}
          <div className="flex flex-col items-center justify-center mb-6 bg-slate-50 py-5 px-4 rounded-xl border border-slate-100 mx-2">
            <p className="text-gray-700 text-lg sm:text-xl font-semibold mb-3">Retiring as Chief Manager from</p>
            <img 
                src={EVENT_DETAILS.companyLogo}
                alt="Oriental Insurance Company Logo"
                className="h-16 sm:h-20 w-auto object-contain mb-3 mix-blend-multiply" 
            />
            <span className="text-xl sm:text-2xl font-bold text-royal-900 mt-1 leading-snug max-w-xs">{EVENT_DETAILS.company}</span>
          </div>
        </div>

        {/* Countdown Timer */}
        <div className="mb-8">
           <CountdownTimer />
        </div>

        {/* Invitation Text */}
        <div className="mb-8 px-2">
          <p className="text-gray-600 leading-relaxed font-sans text-sm sm:text-base">
            With a heart full of gratitude and a lifetime of memories, please join us for a celebratory lunch as we honor his dedication and wish him well on his new journey.
          </p>
        </div>

        {/* Details Section */}
        <div className="space-y-2 text-left bg-slate-50 rounded-xl p-4 border border-slate-100 transition-transform duration-300 ease-in-out hover:scale-[1.02] hover:shadow-md">
          <InfoRow 
            icon={Calendar} 
            title="Date" 
            detail={EVENT_DETAILS.date} 
          />
          <InfoRow 
            icon={Clock} 
            title="Time" 
            detail={EVENT_DETAILS.time} 
          />
          <InfoRow 
            icon={MapPin} 
            title="Location" 
            detail={EVENT_DETAILS.venue}
            subDetail={EVENT_DETAILS.venueAddress}
          />
        </div>

        {/* Action Buttons */}
        <div className="mt-8 space-y-3">
          <button 
            onClick={onRsvpClick}
            className="flex items-center justify-center w-full px-6 py-3.5 text-white bg-green-600 hover:bg-green-700 rounded-xl shadow-lg shadow-green-900/20 hover:shadow-green-900/40 hover:-translate-y-1 transition-all duration-300 ease-in-out active:scale-95 font-semibold group"
          >
            <CheckCircle className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
            Confirm Attendance
          </button>

          <button 
            onClick={onGreetingsClick}
            className="flex items-center justify-center w-full px-6 py-3.5 text-white bg-royal-800 hover:bg-royal-900 rounded-xl shadow-lg shadow-royal-900/20 transition-all active:scale-95 font-semibold group"
          >
            <MessageCircleHeart className="w-5 h-5 mr-2" />
            Send Greetings
          </button>

          <a 
            href={EVENT_DETAILS.mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-full px-6 py-3.5 text-royal-800 bg-white border-2 border-royal-100 hover:bg-royal-50 rounded-xl transition-all active:scale-95 font-semibold group"
          >
            <Navigation className="w-5 h-5 mr-2 group-hover:animate-bounce" />
            Get Directions
          </a>
          
          <a 
            href={`tel:${EVENT_DETAILS.contactNumber}`}
            className="flex items-center justify-center w-full px-6 py-3.5 text-royal-800 bg-gold-100 hover:bg-gold-300 rounded-xl transition-all active:scale-95 font-semibold border border-gold-300"
          >
            <Phone className="w-5 h-5 mr-2" />
            Call for Queries
          </a>
        </div>

        {/* Footer RSVP */}
        <div className="mt-10 pt-6 border-t border-gray-100">
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">RSVP</p>
          <p className="font-serif text-lg text-gray-800">{EVENT_DETAILS.rsvpName}</p>
        </div>
      </div>
    </div>
  );
};

export default InvitationCard;