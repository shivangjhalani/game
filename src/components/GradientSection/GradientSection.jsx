import React from 'react';
import { Container } from '../Container';

const GradientSection = () => {
  return (
    <div className="relative w-full py-24 md:py-32">
      <div className="absolute inset-0 w-full h-[150%] bg-gradient-to-t from-black from-60% via-black/90 via-40% to-transparent to-100%" />
      <Container>
        <div className="relative z-10 flex items-center justify-center">
          <p className="text-white text-center text-fluid-xl md:text-fluid-3xl max-w-4xl font-bold leading-relaxed">
            It's 2021, and humanity is broken...
            <span className="block mt-4 text-fluid-base md:text-fluid-xl font-normal opacity-80">
              The climate crisis isn't coming. It's already here.
            </span>
          </p>
        </div>
      </Container>
    </div>
  );
};

export default GradientSection;