import React from 'react';
import { Container } from '../Container';

const GradientSection = () => {
  return (
    <div className="relative w-full py-24 md:py-32">
      <div className="absolute inset-0 w-full h-[150%] bg-gradient-to-t from-black from-60% via-black/90 via-40% to-transparent to-100%" />
      <Container>
        <div className="relative z-10 flex items-center justify-center">
          <p className="text-white text-center text-fluid-xl md:text-fluid-3xl max-w-4xl font-bold leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec lacus eu nisi ornare molestie...
            <span className="block mt-4 text-fluid-base md:text-fluid-xl font-normal opacity-80">
              Nulla turpis lorem, consectetur eget lorem at, finibus tincidunt massa. Donec tincidunt vestibulum rutrum. Proin feugiat, odio sit amet rutrum gravida, mauris erat viverra nunc, vel iaculis justo leo sed ipsum. Morbi vulputate, quam ac tristique molestie, justo ex mollis nibh, nec interdum mi mauris eget leo. Sed quam enim, porttitor id metus eu, porttitor aliquam tortor. Cras urna metus, imperdiet ut vulputate nec, bibendum vitae magna. Morbi interdum, magna et ornare tempor, metus risus interdum sapien, vel euismod erat ex nec nisl.
            </span>
          </p>
        </div>
      </Container>
    </div>
  );
};

export default GradientSection;