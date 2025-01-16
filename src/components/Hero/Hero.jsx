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
    <div className="absolute inset-0">
      <div 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" 
        style={{ 
          width: isMobile ? '120vw' : '130vw',
          height: isMobile ? '120vh' : '130vh',
        }}
      >
        {isMobile ? <EllipsesMobile /> : <EllipsesDesktop />}
      </div>
    </div>
  );
};

export default Hero;