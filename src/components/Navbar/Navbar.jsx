import React, { useState } from 'react';
import { Menu, MenuItem, HoveredLink } from './NavbarHelper';

const Navbar = () => {
  const [active, setActive] = useState(null);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center p-4">
      <Menu setActive={setActive}>
        <MenuItem setActive={setActive} active={active} item="Home">
          <div className="flex flex-col space-y-4 min-w-[200px]">
            <p className="text-sm text-neutral-500">Navigate to</p>
            <div className="flex flex-col space-y-2">
              <HoveredLink to="/">Main Page</HoveredLink>
              <HoveredLink to="/dashboard">Dashboard</HoveredLink>
            </div>
          </div>
        </MenuItem>

        <MenuItem setActive={setActive} active={active} item="About">
          <div className="flex flex-col space-y-4 min-w-[200px]">
            <p className="text-sm text-neutral-500">Learn more</p>
            <div className="flex flex-col space-y-2">
              <HoveredLink to="/about">Our Story</HoveredLink>
              <HoveredLink to="/mission">Mission & Vision</HoveredLink>
            </div>
          </div>
        </MenuItem>

        <MenuItem setActive={setActive} active={active} item="Team">
          <div className="flex flex-col space-y-4 min-w-[200px]">
            <p className="text-sm text-neutral-500">Meet the team</p>
            <div className="flex flex-col space-y-2">
              <HoveredLink to="/team">Our Team</HoveredLink>
              <HoveredLink to="/careers">Careers</HoveredLink>
            </div>
          </div>
        </MenuItem>

        <MenuItem setActive={setActive} active={active} item="Events">
          <div className="flex flex-col space-y-4 min-w-[200px]">
            <p className="text-sm text-neutral-500">Upcoming Events</p>
            <div className="flex flex-col space-y-2">
              <HoveredLink to="/events">All Events</HoveredLink>
              <HoveredLink to="/calendar">Calendar</HoveredLink>
            </div>
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default Navbar; 