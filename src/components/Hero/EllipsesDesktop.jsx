import { useEffect } from 'react';
import ellipse1 from '../../assets/images/ellipsis-d1.svg';
import ellipse2 from '../../assets/images/ellipsis-d2.svg';
import ellipse3 from '../../assets/images/ellipsis-d3.svg';
import ellipse4 from '../../assets/images/ellipsis-d4.svg';
import ellipse5 from '../../assets/images/ellipsis-d5.svg';
import ellipse6 from '../../assets/images/ellipsis-d6.svg';
import iconPlaceholder from '../../assets/icons/7bab58c9ec21860becbae1d9eff8eb6ca5dd8c6a-61x61.png';

const EllipsesDesktop = () => {
  const ellipses = [
    { 
      src: ellipse1, 
      size: '478px', 
      duration: 20, 
      direction: 'normal',
      icons: Array.from({ length: 4 }, (_, i) => ({ angle: (i * 90) }))
    },
    { 
      src: ellipse2, 
      size: '666px', 
      duration: 25, 
      direction: 'reverse',
      icons: Array.from({ length: 4 }, (_, i) => ({ angle: (i * 90) }))
    },
    { 
      src: ellipse3, 
      size: '856px', 
      duration: 30, 
      direction: 'normal',
      icons: Array.from({ length: 4 }, (_, i) => ({ angle: (i * 90) }))
    },
    { 
      src: ellipse4, 
      size: '1070px', 
      duration: 35, 
      direction: 'reverse',
      icons: Array.from({ length: 4 }, (_, i) => ({ angle: (i * 90) }))
    },
    { 
      src: ellipse5, 
      size: '1286px', 
      duration: 40, 
      direction: 'normal',
      icons: Array.from({ length: 4 }, (_, i) => ({ angle: (i * 90) }))
    },
    { 
      src: ellipse6, 
      size: '1489px', 
      duration: 45, 
      direction: 'reverse',
      icons: Array.from({ length: 4 }, (_, i) => ({ angle: (i * 90) }))
    },
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
            
            // Calculate position on the ellipse
            const x = radius * Math.cos(angleInRadians);
            const y = radius * Math.sin(angleInRadians);

            return (
              <div
                key={iconIndex}
                className="absolute transition-transform"
                style={{
                  width: '61px',
                  height: '61px',
                  top: '50%',
                  left: '50%',
                  transform: `
                    translate(-50%, -50%)
                    translate(${x}px, ${y}px)
                    rotate(${ellipse.direction === 'normal' ? -icon.angle : icon.angle}deg)
                  `,
                  animation: `${ellipse.direction === 'normal' ? 'counter-rotate' : 'counter-rotate-reverse'} ${ellipse.duration}s linear infinite`
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