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
    <div className="relative min-h-screen bg-black overflow-hidden">
      {isMobile ? <EllipsesMobile /> : <EllipsesDesktop />}
      <div className="relative z-10 container mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-screen text-center">
      </div>
    </div>
  );
};

export default Hero;