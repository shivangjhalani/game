import { useEffect } from 'react';
import ellipse1 from '../../assets/images/ellipsis-m1.svg';
import ellipse2 from '../../assets/images/ellipsis-m2.svg';
import ellipse3 from '../../assets/images/ellipsis-m3.svg';
import iconPlaceholder from '../../assets/icons/7bab58c9ec21860becbae1d9eff8eb6ca5dd8c6a-61x61.png';

const EllipsesMobile = () => {
  const ellipses = [
    { 
      src: ellipse1, 
      size: '252px', 
      duration: 15, 
      direction: 'normal',
      icons: [{ angle: 0 }, { angle: 180 }]
    },
    { 
      src: ellipse2, 
      size: '352px', 
      duration: 20, 
      direction: 'reverse',
      icons: [{ angle: 90 }, { angle: 270 }]
    },
    { 
      src: ellipse3, 
      size: '452px', 
      duration: 25, 
      direction: 'normal',
      icons: [{ angle: 0 }, { angle: 180 }]
    }
  ];

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {ellipses.map((ellipse, index) => (
        <div
          key={index}
          className={`absolute ${ellipse.direction === 'normal' ? 'animate-rotate' : 'animate-rotate-reverse'}`}
          style={{
            width: ellipse.size,
            height: ellipse.size,
            animationDuration: `${ellipse.duration}s`,
          }}
        >
          <img
            src={ellipse.src}
            alt={`Ellipse ${index + 1}`}
            className="w-full h-full ellipse"
          />
          
          {ellipse.icons.map((icon, iconIndex) => {
            const radius = parseInt(ellipse.size) / 2;
            const angleInRadians = (icon.angle * Math.PI) / 180;
            const x = radius * Math.cos(angleInRadians);
            const y = radius * Math.sin(angleInRadians);

            return (
              <div
                key={iconIndex}
                className={`absolute ${ellipse.direction === 'normal' ? 'animate-counter-rotate' : 'animate-counter-rotate-reverse'}`}
                style={{
                  width: '61px',
                  height: '61px',
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: `translate(${x}px, ${y}px) rotate(${-icon.angle}deg)`,
                  animationDuration: `${ellipse.duration}s`,
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

export default EllipsesMobile; 