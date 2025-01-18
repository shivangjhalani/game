import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import EllipsesDesktop from './EllipsesDesktop';
import EllipsesMobile from './EllipsesMobile';
import { TextHoverEffect } from './text-hover-effect';

const Hero = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [textAnimationComplete, setTextAnimationComplete] = useState(false);

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
      <motion.div 
        className="absolute inset-0 flex items-center justify-center z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.7,
          ease: [0.19, 1, 0.22, 1]
        }}
        onAnimationComplete={() => setTextAnimationComplete(true)}
      >
        <div className="w-[600px] h-[300px]">
          <TextHoverEffect text={['Game', 'Cube']} duration={0.1} />
        </div>
      </motion.div>

      <motion.div 
        className="absolute inset-0 flex items-center justify-center"
        initial="initial"
        animate="animate"
      >
        {isMobile ? (
          <EllipsesMobile startAnimation={textAnimationComplete} />
        ) : (
          <EllipsesDesktop startAnimation={textAnimationComplete} />
        )}
      </motion.div>
    </div>
  );
};

export default Hero;