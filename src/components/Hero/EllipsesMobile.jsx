import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ellipse1 from '../../assets/images/ellipsis-m1.svg';
import ellipse2 from '../../assets/images/ellipsis-m2.svg';
import ellipse3 from '../../assets/images/ellipsis-m3.svg';
import ellipse4 from '../../assets/images/ellipsis-m4.svg';

// Import mobile icons
import mobileIcon1 from '../../assets/icons/0261f74a0018ae68ace667e12adaa1f1b6071b75-61x61.png';
import mobileIcon2 from '../../assets/icons/30abc8b689aa5d011379367d8e6f8873ff5f3e46-61x61.png';
import mobileIcon3 from '../../assets/icons/6078c7a174c289c130a7bbf47048f42455e2a59b-61x61.png';
import mobileIcon4 from '../../assets/icons/69dc8d3b9ec4e14cb106c1b594aef0a318f3e992-61x61.png';

const EllipsesMobile = () => {
  const containerRef = useRef(null);
  const ellipses = [
    { 
      src: ellipse1, 
      size: 420,
      duration: 20, 
      direction: 1,
      offset: 30,
      icons: [] // No icons on first ellipse
    },
    { 
      src: ellipse2, 
      size: 560,
      duration: 25, 
      direction: -1,
      offset: 45,
      icons: [
        { src: mobileIcon1, angle: 45 },
        { src: mobileIcon2, angle: 135 },
        { src: mobileIcon3, angle: 225 },
        { src: mobileIcon4, angle: 315 }
      ]
    },
    { 
      src: ellipse3, 
      size: 700 ,
      duration: 30, 
      direction: 1,
      offset: 15,
      icons: [
        { src: mobileIcon2, angle: 60 },
        { src: mobileIcon3, angle: 180 },
        { src: mobileIcon4, angle: 300 }
      ]
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
      icons.forEach((icon) => {
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
                  width: '40px',
                  height: '40px',
                  top: '50%',
                  left: '50%',
                  transform: `translate(${x - 20}px, ${y - 20}px)`
                }}
              >
                <img
                  src={icon.src}
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

export default EllipsesMobile; 