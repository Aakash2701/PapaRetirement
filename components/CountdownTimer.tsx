import React, { useState, useEffect } from 'react';
import { getEventDate } from '../constants';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer: React.FC = () => {
  // Initialize with 99 to create the animation effect from high numbers
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 99, hours: 99, minutes: 99, seconds: 99 });
  const [isEventStarted, setIsEventStarted] = useState(false);

  useEffect(() => {
    const targetDate = getEventDate();
    let animationFrameId: number;
    let intervalId: any;

    const getRealTimeDifference = () => {
      const now = new Date();
      return targetDate.getTime() - now.getTime();
    };

    // Animation configuration
    const startTimestamp = Date.now();
    const duration = 1500; // Animation duration in ms
    const startValue = 99;

    const updateFrame = () => {
      const now = Date.now();
      const elapsed = now - startTimestamp;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (easeOutExpo) for a smooth settling effect
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

      const diff = getRealTimeDifference();

      if (diff <= 0) {
        setIsEventStarted(true);
        return;
      }

      // Calculate actual time values
      const realDays = Math.floor(diff / (1000 * 60 * 60 * 24));
      const realHours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const realMinutes = Math.floor((diff / 1000 / 60) % 60);
      const realSeconds = Math.floor((diff / 1000) % 60);

      if (progress < 1) {
        // Interpolate between 99 and the real value based on ease
        setTimeLeft({
          days: Math.floor(startValue - (startValue - realDays) * ease),
          hours: Math.floor(startValue - (startValue - realHours) * ease),
          minutes: Math.floor(startValue - (startValue - realMinutes) * ease),
          seconds: Math.floor(startValue - (startValue - realSeconds) * ease),
        });
        animationFrameId = requestAnimationFrame(updateFrame);
      } else {
        // Animation complete, set final values and start normal interval
        setTimeLeft({ days: realDays, hours: realHours, minutes: realMinutes, seconds: realSeconds });
        
        intervalId = setInterval(() => {
          const currentDiff = getRealTimeDifference();
          if (currentDiff <= 0) {
             setIsEventStarted(true);
             clearInterval(intervalId);
          } else {
             setTimeLeft({
              days: Math.floor(currentDiff / (1000 * 60 * 60 * 24)),
              hours: Math.floor((currentDiff / (1000 * 60 * 60)) % 24),
              minutes: Math.floor((currentDiff / 1000 / 60) % 60),
              seconds: Math.floor((currentDiff / 1000) % 60),
            });
          }
        }, 1000);
      }
    };

    // Start the animation loop
    animationFrameId = requestAnimationFrame(updateFrame);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearInterval(intervalId);
    };
  }, []);

  if (isEventStarted) {
    return (
      <div className="py-4 text-center animate-pulse">
        <span className="text-xl font-serif font-bold text-royal-800">The celebration is here!</span>
      </div>
    );
  }

  return (
    <div className="flex justify-center space-x-3 sm:space-x-4 py-6">
      <TimerBlock value={timeLeft.days} label="Days" />
      <TimerBlock value={timeLeft.hours} label="Hrs" />
      <TimerBlock value={timeLeft.minutes} label="Mins" />
      <TimerBlock value={timeLeft.seconds} label="Secs" />
    </div>
  );
};

const TimerBlock: React.FC<{ value: number; label: string }> = ({ value, label }) => (
  <div className="flex flex-col items-center">
    <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center bg-royal-900 text-gold-300 rounded-lg shadow-md border border-gold-500/30">
      <span className="text-xl sm:text-2xl font-bold font-serif tabular-nums">
        {value.toString().padStart(2, '0')}
      </span>
    </div>
    <span className="text-[10px] sm:text-xs uppercase tracking-wider text-gray-500 mt-1 font-semibold">{label}</span>
  </div>
);

export default CountdownTimer;