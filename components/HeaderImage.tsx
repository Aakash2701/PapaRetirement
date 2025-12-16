import React, { useEffect, useRef } from 'react';
import { headerImage } from '../assets/images';

const HeaderImage: React.FC = () => {
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!imageRef.current) return;
      const scrolled = window.scrollY;
      
      // Optimize: Stop calculating if the header is well out of view
      if (scrolled > 600) return;

      // Parallax factor: 0.4 means the image moves at 40% speed of scroll
      const val = scrolled * 0.4;
      
      requestAnimationFrame(() => {
        if (imageRef.current) {
          // Maintain the base offset of -15% (to center the taller image) and add the parallax scroll offset
          imageRef.current.style.transform = `translateY(calc(-15% + ${val}px))`;
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial calculation to set position
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative h-48 sm:h-56 w-full overflow-hidden rounded-t-2xl bg-royal-900 z-0">
      <img 
        ref={imageRef}
        src={headerImage}
        alt="Celebration Background" 
        // Height is set to 140% to allow room for parallax movement without showing empty space
        className="w-full h-[140%] object-cover opacity-80"
        // Initial transform sets the starting position
        style={{ willChange: 'transform', transform: 'translateY(-15%)' }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 pointer-events-none z-10"></div>
    </div>
  );
};

export default HeaderImage;