import React, { useState, useCallback, useRef } from 'react';
import { Menu, MenuItem, HoveredLink } from './NavbarHelper';

const Navbar = () => {
  const [active, setActive] = useState(null);
  const timeoutRef = useRef();

  const handleMenuItemHover = useCallback((value) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (value === null) {
      timeoutRef.current = setTimeout(() => {
        setActive(null);
      }, 100);
    } else {
      setActive(value);
    }
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center p-4">
      <Menu setActive={handleMenuItemHover} activeItem={active}>
        <MenuItem to="/" item="Home" />

        <MenuItem setActive={handleMenuItemHover} active={active} item="About">
          <div className="flex flex-col space-y-4 min-w-[200px]">
            <HoveredLink to="/about">Our Story</HoveredLink>
            <HoveredLink to="/mission">Mission & Vision</HoveredLink>
          </div>
        </MenuItem>

        <MenuItem setActive={handleMenuItemHover} active={active} item="Team">
          <div className="flex flex-col space-y-4 min-w-[200px]">
            <HoveredLink to="/team">Our Team</HoveredLink>
            <HoveredLink to="/careers">Careers</HoveredLink>
          </div>
        </MenuItem>

        <MenuItem setActive={handleMenuItemHover} active={active} item="More">
          <div className="flex flex-col space-y-4 min-w-[200px]">
            <HoveredLink to="/events">Events</HoveredLink>
            <HoveredLink to="/showcase">Showcase</HoveredLink>
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default Navbar; 