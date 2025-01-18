import { useEffect, useRef, useMemo } from 'react';
import gsap from 'gsap';
import { useResponsive } from '@/hooks/useResponsive';
import { getEllipsesConfig } from './ellipsesConfig';

const Ellipses = ({ startAnimation }) => {
  const containerRef = useRef(null);
  const { isMobile } = useResponsive();
  const ellipses = useMemo(() => getEllipsesConfig(isMobile), [isMobile]);

  const setupAnimations = (container, config, masterTl, index) => {
    const ellipseWrapper = container.children[index];
    const icons = Array.from(ellipseWrapper.querySelectorAll('.icon-wrapper'));
    
    // Continuous rotations
    gsap.to(ellipseWrapper, {
      rotation: config.direction * 360,
      duration: config.duration,
      repeat: -1,
      ease: "none",
      immediateRender: true
    });

    // Separate icon animations for better control
    icons.forEach(icon => {
      // Counter rotation
      gsap.to(icon, {
        rotation: -config.direction * 360,
        duration: config.duration,
        repeat: -1,
        ease: "none",
        transformOrigin: "center center",
        immediateRender: true
      });
    });

    // Fade in both ellipse and icons separately to ensure proper animation
    masterTl
      .to(ellipseWrapper, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        immediateRender: true
      }, index * 0.04)
      .to(icons, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        stagger: 0.04,
        immediateRender: true
      }, `>-0.3`); // Start slightly before the ellipse animation completes
  };

  useEffect(() => {
    if (!startAnimation) {
      const container = containerRef.current;
      if (container) {
        // Set initial state for both ellipses and icons
        gsap.set(container.querySelectorAll('.ellipse-wrapper'), {
          opacity: 0,
          scale: 0.7,
          rotation: 0,
          immediateRender: true
        });
        
        gsap.set(container.querySelectorAll('.icon-wrapper'), {
          opacity: 0,
          scale: 0.7,
          rotation: 0,
          transformOrigin: "center center",
          immediateRender: true
        });
      }
      return;
    }
    
    const container = containerRef.current;
    if (!container) return;

    const masterTl = gsap.timeline({
      defaults: { ease: "power2.out" }
    });

    gsap.killTweensOf(container.querySelectorAll('.ellipse-wrapper, .icon-wrapper'));
    
    ellipses.forEach((config, index) => {
      setupAnimations(container, config, masterTl, index);
    });

    return () => {
      masterTl.kill();
      gsap.killTweensOf(container.querySelectorAll('.ellipse-wrapper, .icon-wrapper'));
    };
  }, [startAnimation, ellipses]);

  return (
    <div ref={containerRef} className="absolute inset-0 flex items-center justify-center">
      {ellipses.map((ellipse, index) => (
        <div
          key={index}
          className="absolute ellipse-wrapper"
          style={{
            width: `${ellipse.size}px`,
            height: `${ellipse.size}px`,
            opacity: 0,
            visibility: 'visible'
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
            const iconSize = isMobile ? 40 : 35;
            const offset = iconSize / 2;

            return (
              <div
                key={iconIndex}
                className="icon-wrapper absolute"
                style={{
                  width: `${iconSize}px`,
                  height: `${iconSize}px`,
                  top: '50%',
                  left: '50%',
                  transform: `translate(${x - offset}px, ${y - offset}px)`,
                  transformOrigin: 'center center',
                  opacity: 0,
                  visibility: 'visible',
                  zIndex: 10,
                  willChange: 'transform, opacity'
                }}
              >
                <img
                  src={icon.src}
                  alt={`Icon ${iconIndex + 1}`}
                  className="w-full h-full"
                  style={{ pointerEvents: 'none' }}
                />
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Ellipses;