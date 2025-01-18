"use client";
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

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
  children
}) => {
  return (
    <div onMouseEnter={() => setActive(item)} className="relative">
      <motion.p
        transition={{ duration: 0.3 }}
        className="cursor-pointer text-white/70 hover:text-white 
          transition-all duration-200 text-sm font-medium">
        {item}
      </motion.p>
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}>
          {active === item && (
            <div className="absolute top-[calc(100%_+_1.2rem)] left-1/2 transform -translate-x-1/2 pt-4">
              <motion.div
                transition={transition}
                layoutId="active"
                className="bg-black/50 backdrop-blur-xl 
                  rounded-2xl overflow-hidden 
                  border border-white/[0.1]
                  shadow-xl shadow-black/[0.05]">
                <motion.div
                  layout
                  className="w-max h-full p-4">
                  <div className="flex flex-col space-y-4 min-w-[200px]">
                    <p className="text-sm text-white/50">
                      {children.props.children[0].props.children}
                    </p>
                    <div className="flex flex-col space-y-2">
                      {children.props.children[1].props.children}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export const Menu = ({
  setActive,
  children
}) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)}
      className="relative rounded-full 
        bg-black/30 backdrop-blur-lg border border-white/[0.1]
        shadow-lg shadow-black/[0.03] 
        flex justify-center space-x-8 px-8 py-4
        transition-all duration-300 ease-in-out
        hover:bg-black/40 hover:border-white/[0.2]">
      {children}
    </nav>
  );
};

export const NavLink = ({ children, ...rest }) => {
  return (
    <Link
      {...rest}
      className="text-white/70 hover:text-white 
        transition-colors duration-200 text-sm font-medium
        relative after:absolute after:left-0 after:bottom-0 
        after:h-[2px] after:w-0 after:bg-white/70
        after:transition-all after:duration-300
        hover:after:w-full">
      {children}
    </Link>
  );
};
export const ProductItem = ({
  title,
  description,
  href,
  src
}) => {
  return (
    (<a href={href} className="flex space-x-2">
      <img
        src={src}
        width={140}
        height={70}
        alt={title}
        className="flex-shrink-0 rounded-md shadow-2xl" />
      <div>
        <h4 className="text-xl font-bold mb-1 text-black dark:text-white">
          {title}
        </h4>
        <p className="text-neutral-700 text-sm max-w-[10rem] dark:text-neutral-300">
          {description}
        </p>
      </div>
    </a>)
  );
};

export const HoveredLink = ({
  children,
  ...rest
}) => {
  return (
    <Link
      {...rest}
      className="text-white/70 hover:text-white
        transition-colors duration-200 text-sm">
      {children}
    </Link>
  );
};
