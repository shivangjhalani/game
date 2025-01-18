import { useEffect, useRef, useMemo } from 'react';
import gsap from 'gsap';
import ellipse1 from '../../assets/images/ellipsis-d1.svg';
import ellipse2 from '../../assets/images/ellipsis-d2.svg';
import ellipse3 from '../../assets/images/ellipsis-d3.svg';
import ellipse4 from '../../assets/images/ellipsis-d4.svg';
import ellipse5 from '../../assets/images/ellipsis-d5.svg';
import ellipse6 from '../../assets/images/ellipsis-d6.svg';

// Import icons
import icon1 from '../../assets/icons/0261f74a0018ae68ace667e12adaa1f1b6071b75-61x61.png';
import icon2 from '../../assets/icons/30abc8b689aa5d011379367d8e6f8873ff5f3e46-61x61.png';
import icon3 from '../../assets/icons/6078c7a174c289c130a7bbf47048f42455e2a59b-61x61.png';
import icon4 from '../../assets/icons/69dc8d3b9ec4e14cb106c1b594aef0a318f3e992-61x61.png';
import icon5 from '../../assets/icons/73e584bfb5d186e0ab19e22d2c7a1f914712f874-61x61.png';
import icon6 from '../../assets/icons/7a62d9645d933360895c451d6c46c03360f2f108-61x61.png';
import icon7 from '../../assets/icons/81e48f6362235e015f4a0f48ae4a880012dc7c4d-61x61.png';
import icon8 from '../../assets/icons/84d4dd7fb68ce0757428e07e7639e1884af3e736-61x61.png';
import icon9 from '../../assets/icons/b167f2ca3ea2d3632fd07f2b4da89cec3523b795-61x61.png';
import icon10 from '../../assets/icons/b4df99190f0c4307335a7194ee292b42ad2eb3d6-61x61.png';
import icon11 from '../../assets/icons/c0a32129cc15c1c14615d4a5a290b7650e0f2c1d-61x61.png';
import icon12 from '../../assets/icons/c0ac4640d5ab4f66fc187c7e54574a4459503376-61x61.png';
import icon13 from '../../assets/icons/cbe7c9ebb37062468d76cc51b5734a6429d59074-61x61.png';
import icon14 from '../../assets/icons/dbde5604dfa254389c43acb85a97f03561b4210c-61x61.png';
import icon15 from '../../assets/icons/de7ef99de23fcaf90b724af99a557ae849d573cf-61x61.png';

const EllipsesDesktop = ({ startAnimation }) => {
  const containerRef = useRef(null);
  const ellipses = useMemo(() => [
    { 
      src: ellipse1, 
      size: 600,
      duration: 20, 
      direction: 1,
      offset: 30,
      icons: [
        { src: icon1, angle: 30 },
        { src: icon2, angle: 150 },
        { src: icon3, angle: 270 }
      ]
    },
    { 
      src: ellipse2, 
      size: 820,
      duration: 25, 
      direction: -1,
      offset: 15,
      icons: [
        { src: icon4, angle: 15 },
        { src: icon5, angle: 87 },
        { src: icon6, angle: 159 },
        { src: icon7, angle: 231 },
        { src: icon8, angle: 303 }
      ]
    },
    { 
      src: ellipse3, 
      size: 1040,
      duration: 30, 
      direction: 1,
      offset: 45,
      icons: [
        { src: icon9, angle: 45 },
        { src: icon10, angle: 117 },
        { src: icon11, angle: 189 },
        { src: icon12, angle: 261 },
        { src: icon13, angle: 333 }
      ]
    },
    { 
      src: ellipse4, 
      size: 1260,
      duration: 35, 
      direction: -1,
      offset: 20,
      icons: [
        { src: icon14, angle: 20 },
        { src: icon15, angle: 80 },
        { src: icon1, angle: 140 },
        { src: icon2, angle: 200 },
        { src: icon3, angle: 260 },
        { src: icon4, angle: 320 }
      ]
    },
    { 
      src: ellipse5, 
      size: 1480,
      duration: 40, 
      direction: 1,
      offset: 35,
      icons: [
        { src: icon5, angle: 35 },
        { src: icon6, angle: 86.43 },
        { src: icon7, angle: 137.86 },
        { src: icon8, angle: 189.29 },
        { src: icon9, angle: 240.72 },
        { src: icon10, angle: 292.15 },
        { src: icon11, angle: 343.58 }
      ]
    },
    { 
      src: ellipse6, 
      size: 1700,
      duration: 45, 
      direction: -1,
      offset: 25,
      icons: [
        { src: icon12, angle: 25 },
        { src: icon13, angle: 70 },
        { src: icon14, angle: 115 },
        { src: icon15, angle: 160 },
        { src: icon1, angle: 205 },
        { src: icon2, angle: 250 },
        { src: icon3, angle: 295 },
        { src: icon4, angle: 340 }
      ]
    }
  ], []);

  useEffect(() => {
    if (!startAnimation) {
      // Initial state
      const container = containerRef.current;
      if (container) {
        gsap.set(['.ellipse-wrapper', '.icon-wrapper'], {
          opacity: 0,
          scale: 0.7
        });
      }
      return;
    }
    
    const container = containerRef.current;
    const masterTl = gsap.timeline({
      defaults: { ease: "power2.out" }
    });

    ellipses.forEach((config, index) => {
      const ellipseWrapper = container.children[index];
      const icons = Array.from(ellipseWrapper.querySelectorAll('.icon-wrapper'));
      
      // Start continuous rotations
      gsap.to(ellipseWrapper, {
        rotation: config.direction * 360,
        duration: config.duration,
        repeat: -1,
        ease: "none"
      });

      icons.forEach(icon => {
        gsap.to(icon, {
          rotation: -config.direction * 360,
          duration: config.duration,
          repeat: -1,
          ease: "none",
          transformOrigin: "center center"
        });
      });

      // Fade in timeline
      masterTl.to([ellipseWrapper, icons], {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        stagger: 0.04
      }, index * 0.04);
    });

    return () => masterTl.kill();
  }, [startAnimation]);

  return (
    <div ref={containerRef} className="absolute inset-0 flex items-center justify-center">
      {ellipses.map((ellipse, index) => (
        <div
          key={index}
          className="absolute ellipse-wrapper"
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
                  width: '35px',
                  height: '35px',
                  top: '50%',
                  left: '50%',
                  transform: `translate(${x - 17.5}px, ${y - 17.5}px)`,
                  transformOrigin: 'center center'
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

export default EllipsesDesktop;