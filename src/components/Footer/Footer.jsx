import React from 'react';
import { Link } from 'react-router-dom';
import { TextHoverEffect } from '../Hero/TextHoverHeading';

const Footer = () => {
  return (
    <footer className="relative w-full mt-20 pb-8">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        {/* Main Footer Content */}
        <div className="relative rounded-[60px] bg-black/30 backdrop-blur-xl 
                      border border-white/[0.2] shadow-lg shadow-white/8
                      px-8 py-12 transition-colors duration-200
                      hover:bg-black/40 hover:border-white/30
                      hover:shadow-2xl hover:shadow-white/10">
          
          {/* Logo Section */}
          <div className="w-full md:w-[800px] h-[150px] mx-auto">
            <TextHoverEffect 
              text={['Game Cube']} 
              duration={0.1}
              id="footer-game-cube"
              className="tracking-[0.2em] scale-125"
            />
          </div>

          {/* Red Separator Line */}
          <div className="w-full h-[1px] mx-auto my-12 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-70" />

          {/* Links and Info */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-white/70">
            <div className="text-sm">
              GAME GAME GAME GAME and <a href="#" className="underline hover:text-white transition-colors">SLEEP</a>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col text-center md:flex-row gap-4 md:gap-8">
              <Link to="/" className="hover:text-white transition-colors">home</Link>
              <Link to="/about" className="hover:text-white transition-colors">about</Link>
              <Link to="/team" className="hover:text-white transition-colors">team</Link>
              <Link to="/contact" className="hover:text-white transition-colors">contact</Link>
              <a href="mailto:contact@gamecube.com" className="hover:text-white transition-colors">
                contact@gamecube.com
              </a>
            </nav>
          </div>

          {/* Copyright */}
          <div className="mt-8 flex flex-col md:flex-row justify-between items-center text-sm text-white/50">
            <div>© 2024 GAME CUBE. All rights reserved.</div>
            <div>
              Made with ❤️ by <a href="https://shivangjhalani.com" target="_blank" className="underline hover:text-white/70 transition-colors">Shivang Jhalani</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
