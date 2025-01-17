export const smoothScroll = (targetY, duration = 1000) => {
  const startY = window.pageYOffset;
  const difference = targetY - startY;
  const startTime = performance.now();

  const step = () => {
    const progress = (performance.now() - startTime) / duration;
    const amount = easeInOutQuint(progress);
    
    if (progress < 1) {
      window.scrollTo(0, startY + difference * amount);
      requestAnimationFrame(step);
    } else {
      window.scrollTo(0, targetY);
    }
  };

  step();
};

const easeInOutQuint = t => t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t; 