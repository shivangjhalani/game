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
    <div className="relative min-h-screen bg-black overflow-x-hidden">
      <div className="absolute inset-0" style={{ 
        width: isMobile ? '120vw' : '150vw',
        height: isMobile ? '120vh' : '150vh',
        left: isMobile ? '-10vw' : '-25vw',
        top: isMobile ? '-10vh' : '-25vh'
      }}>
        {isMobile ? <EllipsesMobile /> : <EllipsesDesktop />}
      </div>
      <div className="relative z-10 container mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-screen text-center">
      </div>
    </div>
  );
};

export default Hero;