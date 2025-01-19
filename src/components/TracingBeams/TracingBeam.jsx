"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useTransform, useScroll, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

export default function TracingBeam({
  children,
  className
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const contentRef = useRef(null);
  const [svgHeight, setSvgHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setSvgHeight(contentRef.current.offsetHeight);
    }
  }, []);

  const y1 = useSpring(useTransform(scrollYProgress, [0, 0.8], [50, svgHeight]), {
    stiffness: 300,
    damping: 50,
  });
  const y2 = useSpring(useTransform(scrollYProgress, [0, 1], [50, svgHeight - 100]), {
    stiffness: 300,
    damping: 50,
  });

  return (
    <motion.div
      ref={ref}
      className={cn("relative w-full", className)}>
      {/* Left Beam */}
      <div className="absolute -left-6 md:left-6 lg:left-8 top-3">
        <BeamElement 
          scrollYProgress={scrollYProgress}
          svgHeight={svgHeight}
          y1={y1}
          y2={y2}
        />
      </div>
      
      {/* Right Beam */}
      <div className="absolute -right-6 md:right-6 lg:right-8 top-3">
        <BeamElement 
          scrollYProgress={scrollYProgress}
          svgHeight={svgHeight}
          y1={y1}
          y2={y2}
          isRight
        />
      </div>

      <div className="max-w-4xl mx-auto" ref={contentRef}>
        {children}
      </div>
    </motion.div>
  );
};

const BeamElement = ({ scrollYProgress, svgHeight, y1, y2, isRight = false }) => {
  const pathD = isRight 
    ? `M 19 0V -36 l -18 24 V ${svgHeight * 0.9} l 18 24V ${svgHeight}`
    : `M 1 0V -36 l 18 24 V ${svgHeight * 0.9} l -18 24V ${svgHeight}`;

  return (
    <>
      <motion.div
        className={`${isRight ? 'ml-[-6px]' : 'ml-[27px]'} h-4 w-4 rounded-full border border-netural-200 flex items-center justify-center`}>
        <motion.div
          className="h-2 w-2 rounded-full bg-red-700" />
      </motion.div>
      <svg
        viewBox={`0 0 20 ${svgHeight}`}
        width="20"
        height={svgHeight}
        className={`${isRight ? 'mr-4' : 'ml-4'} block`}
        aria-hidden="true">
        <motion.path
          d={pathD}
          fill="none"
          stroke="#9091A0"
          strokeOpacity="0.16"
          strokeWidth="1" />
        <motion.path
          d={pathD}
          fill="none"
          stroke={`url(#gradient${isRight ? 'Right' : 'Left'})`}
          strokeWidth="1.25"
          className="motion-reduce:hidden"
          transition={{
            duration: 10,
          }} />
        <defs>
          <motion.linearGradient
            id={`gradient${isRight ? 'Right' : 'Left'}`}
            gradientUnits="userSpaceOnUse"
            x1="0"
            x2="0"
            y1={y1}
            y2={y2}>
            <stop stopColor="#FF0000" stopOpacity="0" />
            <stop stopColor="#FF0000" />
            <stop offset="0.325" stopColor="#FF0000" />
            <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
          </motion.linearGradient>
        </defs>
      </svg>
    </>
  );
};
