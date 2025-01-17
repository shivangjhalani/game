import { useEffect, useState } from 'react';
import EllipsesDesktop from './EllipsesDesktop';
import EllipsesMobile from './EllipsesMobile';
import { TextHoverEffect } from './text-hover-effect';

const Hero = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={`relative w-full ${isMobile ? 'min-h-fit py-64' : 'h-screen'}`}>
      <div 
        className={`${isMobile ? 'relative' : 'absolute'} left-1/2 -translate-x-1/2 ${isMobile ? '' : '-translate-y-[15vh]'}`}
        style={{ 
          width: isMobile ? '100vw' : '130vw',
          height: isMobile ? 'auto' : '130vh',
        }}
      >
        {isMobile ? <EllipsesMobile /> : <EllipsesDesktop />}
      </div>
      
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="w-[600px] h-[300px]">
          <TextHoverEffect text={['Game', 'Cube']} duration={0.1} />
        </div>
      </div>
    </div>
  );
};

export default Hero;