import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ellipse1 from '../../assets/images/ellipsis-d1.svg';
import ellipse2 from '../../assets/images/ellipsis-d2.svg';
import ellipse3 from '../../assets/images/ellipsis-d3.svg';
import ellipse4 from '../../assets/images/ellipsis-d4.svg';
import ellipse5 from '../../assets/images/ellipsis-d5.svg';
import ellipse6 from '../../assets/images/ellipsis-d6.svg';
import iconPlaceholder from '../../assets/icons/7bab58c9ec21860becbae1d9eff8eb6ca5dd8c6a-61x61.png';

const EllipsesDesktop = () => {
  const containerRef = useRef(null);
  const ellipses = [
    { 
      src: ellipse1, 
      size: 478, 
      duration: 20, 
      direction: 1,
      icons: Array.from({ length: 4 }, (_, i) => ({ angle: (i * 90) }))
    },
    { 
      src: ellipse2, 
      size: 666, 
      duration: 25, 
      direction: -1,
      icons: Array.from({ length: 4 }, (_, i) => ({ angle: (i * 90) }))
    },
    { 
      src: ellipse3, 
      size: 856, 
      duration: 30, 
      direction: 1,
      icons: Array.from({ length: 4 }, (_, i) => ({ angle: (i * 90) }))
    },
    { 
      src: ellipse4, 
      size: 1070, 
      duration: 35, 
      direction: -1,
      icons: Array.from({ length: 4 }, (_, i) => ({ angle: (i * 90) }))
    },
    { 
      src: ellipse5, 
      size: 1286, 
      duration: 40, 
      direction: 1,
      icons: Array.from({ length: 4 }, (_, i) => ({ angle: (i * 90) }))
    },
    { 
      src: ellipse6, 
      size: 1489, 
      duration: 45, 
      direction: -1,
      icons: Array.from({ length: 4 }, (_, i) => ({ angle: (i * 90) }))
    },
  ];

  useEffect(() => {
    const container = containerRef.current;
    const ellipseElements = container.children;
    
    ellipses.forEach((config, index) => {
      const ellipseWrapper = ellipseElements[index];
      const icons = Array.from(ellipseWrapper.querySelectorAll('.icon-wrapper'));
      
      // Rotate the ellipse
      gsap.to(ellipseWrapper, {
        rotation: config.direction * 360,
        duration: config.duration,
        repeat: -1,
        ease: "none"
      });

      // Counter-rotate each icon
      icons.forEach((icon, iconIndex) => {
        gsap.to(icon, {
          rotation: -config.direction * 360,
          duration: config.duration,
          repeat: -1,
          ease: "none"
        });
      });
    });

    return () => gsap.killTweensOf(container.children);
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 flex items-center justify-center">
      {ellipses.map((ellipse, index) => (
        <div
          key={index}
          className="absolute"
          style={{
            width: `${ellipse.size}px`,
            height: `${ellipse.size}px`,
          }}
        >
          <img
            src={ellipse.src}
            alt={`Ellipse ${index + 1}`}
            className="w-full h-full ellipse"
          />
          
          {ellipse.icons.map((icon, iconIndex) => {
            const radius = ellipse.size / 2;
            const angleInRadians = (icon.angle * Math.PI) / 180;
            const x = radius * Math.cos(angleInRadians);
            const y = radius * Math.sin(angleInRadians);

            return (
              <div
                key={iconIndex}
                className="icon-wrapper absolute"
                style={{
                  width: '61px',
                  height: '61px',
                  top: '50%',
                  left: '50%',
                  transform: `translate(${x - 30.5}px, ${y - 30.5}px)`
                }}
              >
                <img
                  src={iconPlaceholder}
                  alt={`Icon ${iconIndex + 1}`}
                  className="w-full h-full"
                />
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default EllipsesDesktop; 