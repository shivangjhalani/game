"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { debounce } from 'lodash';
import { useResponsive } from '@/hooks/useResponsive';

export const TextHoverEffect = ({
  text,
  duration,
  onAnimationComplete,
  id = "default"
}) => {
  const { isMobile } = useResponsive();
  const svgRef = useRef(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });
  const [fontLoaded, setFontLoaded] = useState(false);

  const textLines = Array.isArray(text) ? text : [text];
  const lineHeight = isMobile ? 70 : 50;
  const totalHeight = lineHeight * textLines.length;
  const baseY = 50 - ((textLines.length - 1) * lineHeight) / 2;

  const textGradientId = `textGradient-${id}`;
  const revealMaskId = `revealMask-${id}`;
  const textMaskId = `textMask-${id}`;

  const commonTextStyles = {
    paintOrder: 'stroke fill',
    stroke: 'rgb(235, 228, 216)',
    strokeWidth: isMobile ? '0.5px' : '0.75px',
    fill: 'transparent',
    vectorEffect: 'non-scaling-stroke',
    fontVariationSettings: '"ital" 0',
    letterSpacing: isMobile ? '0.02em' : '0.03em',
    padding: isMobile ? '1vw 0' : '2vw 0',
    shapeRendering: 'geometricPrecision',
    textRendering: 'geometricPrecision'
  };

  const handleMouseMove = debounce((e) => {
    if (!svgRef.current) return;
    const svgRect = svgRef.current.getBoundingClientRect();
    const x = e.clientX - svgRect.left;
    const y = e.clientY - svgRect.top;
    
    const cxPercentage = (x / svgRect.width) * 100;
    const cyPercentage = (y / svgRect.height) * 100;
    
    setMaskPosition({
      cx: `${cxPercentage}%`,
      cy: `${cyPercentage}%`,
    });
  }, 16);
  
  const handleTouch = debounce((e) => {
    if (!svgRef.current) return;
    const touch = e.touches[0];
    const svgRect = svgRef.current.getBoundingClientRect();
    const x = touch.clientX - svgRect.left;
    const y = touch.clientY - svgRect.top;
    
    const cxPercentage = (x / svgRect.width) * 100;
    const cyPercentage = (y / svgRect.height) * 100;
    
    setMaskPosition({
      cx: `${cxPercentage}%`,
      cy: `${cyPercentage}%`,
    });
  }, 16);

  useEffect(() => {
    return () => {
      handleMouseMove.cancel();
      handleTouch.cancel();
    };
  }, []);

  useEffect(() => {
    document.fonts.ready.then(() => {
      setFontLoaded(true);
    });
  }, []);

  if (!fontLoaded) {
    return null; // Or a loading placeholder
  }

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox={`0 0 300 ${Math.max(100, totalHeight)}`}
      xmlns="http://www.w3.org/2000/svg"
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouch}
      style={{ 
        touchAction: 'none',
        shapeRendering: 'geometricPrecision'
      }}
      className="select-none"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <radialGradient
          id={textGradientId}
          cx="50%"
          cy="50%"
          r="50%"
          fx="50%"
          fy="50%">
          <stop offset="0%" stopColor="#FFD700" />
          <stop offset="25%" stopColor="#FF6B6B" />
          <stop offset="50%" stopColor="#4169E1" />
          <stop offset="75%" stopColor="#00CED1" />
          <stop offset="100%" stopColor="#9370DB" />
        </radialGradient>

        <motion.radialGradient
          id={revealMaskId}
          cx="50%"
          cy="50%"
          r={isMobile ? "30%" : "20%"}
          animate={maskPosition}
          transition={{ 
            duration: isMobile ? 0 : (duration ?? 0), 
            ease: "easeOut" 
          }}>
          <stop offset="0%" stopColor="white" />
          <stop offset={isMobile ? "80%" : "100%"} stopColor="black" />
        </motion.radialGradient>
        <mask id={textMaskId}>
          <rect x="0" y="0" width="100%" height="100%" fill={`url(#${revealMaskId})`} />
        </mask>
      </defs>

      {textLines.map((line, index) => {
        const yPos = baseY + index * lineHeight;
        return (
          <g key={index}>
            <text
              x="50%"
              y={`${yPos}%`}
              textAnchor="middle"
              dominantBaseline="middle"
              className={`uppercase font-spektra ${
                isMobile ? 'text-[6rem]' : 'text-[3.5rem]'
              } ${isMobile ? 'leading-[4.5rem]' : 'leading-[8rem]'}`}
              style={{ 
                ...commonTextStyles,
                opacity: 0.7,
              }}>
              {line}
            </text>
            <motion.text
              x="50%"
              y={`${yPos}%`}
              textAnchor="middle"
              dominantBaseline="middle"
              className={`uppercase font-spektra ${
                isMobile ? 'text-[6rem]' : 'text-[3.5rem]'
              } ${isMobile ? 'leading-[4.5rem]' : 'leading-[8rem]'}`}
              style={commonTextStyles}
              initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
              animate={{
                strokeDashoffset: 0,
                strokeDasharray: 1000,
              }}
              transition={{
                duration: 2,
                ease: "easeInOut",
              }}
              onAnimationComplete={() => {
                if (index === textLines.length - 1) {
                  onAnimationComplete?.();
                }
              }}>
              {line}
            </motion.text>
            <text
              x="50%"
              y={`${yPos}%`}
              textAnchor="middle"
              dominantBaseline="middle"
              mask={`url(#${textMaskId})`}
              className={`uppercase font-spektra ${
                isMobile ? 'text-[6rem]' : 'text-[3.5rem]'
              } ${isMobile ? 'leading-[4.5rem]' : 'leading-[8rem]'}`}
              style={{ 
                ...commonTextStyles,
                stroke: `url(#${textGradientId})`,
              }}>
              {line}
            </text>
          </g>
        );
      })}
    </svg>
  );
};
