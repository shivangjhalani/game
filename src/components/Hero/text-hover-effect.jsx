"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

export const TextHoverEffect = ({
  text,
  duration
}) => {
  const svgRef = useRef(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });

  const textLines = Array.isArray(text) ? text : [text];
  const lineHeight = 60; // Reduced line height
  const totalHeight = lineHeight * textLines.length;
  const baseY = 50 - ((textLines.length - 1) * lineHeight) / 2;

  const handleMouseMove = (e) => {
    if (!svgRef.current) return;
    const svgRect = svgRef.current.getBoundingClientRect();
    const x = e.clientX - svgRect.left;
    const y = e.clientY - svgRect.top;
    setCursor({ x, y });
  };

  useEffect(() => {
    if (svgRef.current && cursor.x !== null && cursor.y !== null) {
      const svgRect = svgRef.current.getBoundingClientRect();
      const cxPercentage = (cursor.x / svgRect.width) * 100;
      const cyPercentage = (cursor.y / svgRect.height) * 100;
      setMaskPosition({
        cx: `${cxPercentage}%`,
        cy: `${cyPercentage}%`,
      });
    }
  }, [cursor]);

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox={`0 0 300 ${Math.max(100, totalHeight)}`}
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setCursor({ x: 0, y: 0 });
      }}
      onMouseMove={handleMouseMove}
      style={{ touchAction: 'none' }}
      className="select-none">
      <defs>
        <radialGradient
          id="textGradient"
          cx="50%"
          cy="50%"
          r="50%"
          fx="50%"
          fy="50%">
          {hovered && (
            <>
              <stop offset="0%" stopColor="#FFD700" />
              <stop offset="25%" stopColor="#FF6B6B" />
              <stop offset="50%" stopColor="#4169E1" />
              <stop offset="75%" stopColor="#00CED1" />
              <stop offset="100%" stopColor="#9370DB" />
            </>
          )}
        </radialGradient>

        <motion.radialGradient
          id="revealMask"
          cx="50%"
          cy="50%"
          r="20%"
          animate={maskPosition}
          transition={{ duration: duration ?? 0, ease: "easeOut" }}>
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>
        <mask id="textMask">
          <rect x="0" y="0" width="100%" height="100%" fill="url(#revealMask)" />
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
              strokeWidth="0.3"
              className="font-[helvetica] font-bold stroke-neutral-200 dark:stroke-neutral-800 fill-transparent text-7xl"
              style={{ opacity: hovered ? 0.7 : 0, vectorEffect: 'non-scaling-stroke' }}>
              {line}
            </text>
            <motion.text
              x="50%"
              y={`${yPos}%`}
              textAnchor="middle"
              dominantBaseline="middle"
              strokeWidth="0.3"
              className="font-[helvetica] font-bold fill-transparent text-7xl stroke-neutral-200 dark:stroke-neutral-800"
              style={{ vectorEffect: 'non-scaling-stroke' }}
              initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
              animate={{
                strokeDashoffset: 0,
                strokeDasharray: 1000,
              }}
              transition={{
                duration: 4,
                ease: "easeInOut",
              }}>
              {line}
            </motion.text>
            <text
              x="50%"
              y={`${yPos}%`}
              textAnchor="middle"
              dominantBaseline="middle"
              stroke="url(#textGradient)"
              strokeWidth="0.3"
              mask="url(#textMask)"
              style={{ vectorEffect: 'non-scaling-stroke' }}
              className="font-[helvetica] font-bold fill-transparent text-7xl">
              {line}
            </text>
          </g>
        );
      })}
    </svg>
  );
};
