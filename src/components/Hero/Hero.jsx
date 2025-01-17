import { useEffect, useState } from 'react';
import EllipsesDesktop from './EllipsesDesktop';
import EllipsesMobile from './EllipsesMobile';

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
    </div>
  );
};

export default Hero;