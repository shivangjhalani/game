import React from "react";

const DotBg = ({ children }) => {
  return (
    <div className="relative w-full min-h-full">
      <div className="absolute inset-0 dark:bg-black bg-white dark:bg-dot-white/[0.2] bg-dot-black/[0.2]">
        {/* Radial gradient for the background only */}
        <div className="absolute inset-0 dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_50%,black)]"></div>
      </div>
      
      {/* Children rendered separately from the gradient background */}
      <div className="relative h-full">
        {children}
      </div>
    </div>
  );
};

export default DotBg;
