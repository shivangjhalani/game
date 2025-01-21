"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Image from "@/components/Image";

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({
  setActive,
  active,
  item,
  children,
  to
}) => {
  const isActive = active === item;
  
  // If "to" prop is provided, render a simple link
  if (to) {
    return (
      <Link 
        to={to}
        className="relative py-2 px-3"
      >
        <motion.div className="relative z-10">
          <p className="cursor-pointer text-sm font-medium whitespace-nowrap text-white/70 hover:text-white transition-colors duration-200">
            {item}
          </p>
          <motion.div
            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-white"
            initial={{ scaleX: 0 }}
            whileHover={{ scaleX: 1 }}
            transition={{ duration: 0.2 }}
          />
        </motion.div>
      </Link>
    );
  }

  // Otherwise render the dropdown menu item
  return (
    <div 
      onMouseEnter={() => setActive(item)} 
      className="relative py-2 px-3"
    >
      <motion.div
        className="relative z-10"
        animate={{
          color: isActive ? "rgb(255, 255, 255)" : "rgba(255, 255, 255, 0.7)",
        }}
        transition={transition}
      >
        <p className="cursor-pointer text-sm font-medium whitespace-nowrap">
          {item}
        </p>
        {isActive && (
          <motion.div
            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-white"
            layoutId="popup-underline"
            transition={transition}
          />
        )}
      </motion.div>

      <AnimatePresence>
        {isActive && children && (
          <motion.div
            initial={{ opacity: 1, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={transition}
            className="absolute top-full pt-4 w-max mt-0.5 -left-1/2 origin-top"
          >
            <div className="bg-black/50 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/[0.1] shadow-xl shadow-black/[0.05]">
              <div className="p-4">
                {children}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const Menu = ({
  setActive,
  children,
  leftLogo,
  rightLogo
}) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)}
      className="relative flex items-center justify-between w-full max-w-6xl"
    >
      {/* Left Logo */}
      <div className="w-12 h-12 flex items-center justify-center">
        {leftLogo}
      </div>

      {/* Menu Items */}
      <div className="rounded-full bg-black/30 backdrop-blur-xl 
                    border border-white/[0.2] shadow-lg shadow-white/8
                    flex justify-center space-x-2 px-4 py-2
                    transition-colors duration-200
                    hover:bg-black/40 hover:border-white/30">
        {children}
      </div>

      {/* Right Logo */}
      <div className="w-12 h-12 flex items-center justify-center">
        {rightLogo}
      </div>
    </nav>
  );
};

export const ProductItem = ({
  title,
  description,
  href,
  src
}) => {
  return (
    <Link 
      to={href} 
      className="flex space-x-2 group"
    >
      <Image
        src={src}
        width={140}
        height={70}
        alt={title}
        className="flex-shrink-0 rounded-md shadow-2xl" 
      />
      <div>
        <h4 className="text-xl font-bold mb-1 text-white/90 group-hover:text-white transition-colors duration-200">
          {title}
        </h4>
        <p className="text-white/70 text-sm max-w-[10rem] group-hover:text-white/80 transition-colors duration-200">
          {description}
        </p>
      </div>
    </Link>
  );
};

export const HoveredLink = ({
  children,
  ...rest
}) => {
  return (
    <Link
      {...rest}
      className="text-white/70 hover:text-white transition-colors duration-200 text-sm"
    >
      {children}
    </Link>
  );
};
