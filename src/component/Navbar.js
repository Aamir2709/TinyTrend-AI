import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useLocation and useNavigate
import logo from "../logo.webp"; // Make sure the logo path is correct

// Styled Components
const NavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #1c1c1c;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 100; /* Lower z-index */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
`;

const Logo = styled(motion.div)`
  font-size: 2rem;
  font-weight: bold;
  color: #ff6b6b;
  cursor: pointer;
  display: flex;
  align-items: center;

  & img {
    width: 50px;
    margin-right: 8px;
  }
`;

const Hamburger = styled(motion.div)`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 70px; /* Width of the hamburger */
  height: 25px; /* Height of the hamburger */
  background: transparent;
  margin-left: 20px; /* Added margin for spacing */
  z-index: 101; /* Ensure hamburger is above sidebar */
`;

const Line = styled.div`
  height: 4px;
  width: 100%;
  background: #ff6b6b; /* Change to orange */
  border-radius: 5px;
  transition: all 0.3s ease;
`;

// Sidebar Styles
const Sidebar = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  width: 250px; 
  background-color: rgba(28, 28, 28, 0.95); /* Slight transparency */
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.5);
  padding: 2rem;
  z-index: 200; /* Higher z-index to show above the navbar */
  transform: translateX(100%);
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

// Sidebar link styles
const SidebarLink = styled(motion.a)`
  color: white;
  margin: 1rem 0;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    color: #ff6b6b;
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 150; /* Lower z-index than sidebar */
  display: ${props => (props.isOpen ? 'block' : 'none')}; /* Show or hide based on sidebar state */
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); // Get the current location
  const navigate = useNavigate(); // Initialize useNavigate

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Define sidebar links based on the current page
  const getSidebarLinks = () => {
    switch (location.pathname) {
      case '/':
        return [
          { label: "Try Out", path: "/text-to-image" },
          { label: "About Us", path: "/about-us" },
          { label: "Gallery", path: "/gallery" }
        ];
      case '/text-to-image':
        return [
          { label: "Home", path: "/" },
          { label: "About Us", path: "/about-us" },
          { label: "Gallery", path: "/gallery" }
        ];
      case '/about-us':
        return [
          { label: "Try Out", path: "/text-to-image" },
          { label: "Home", path: "/" },
          { label: "Gallery", path: "/gallery" }
        ];
      case '/gallery':
        return [
          { label: "Try Out", path: "/text-to-image" },
          { label: "Home", path: "/" },
          { label: "About Us", path: "/about-us" }
        ];
      default:
        return []; // Fallback in case of an unknown route
    }
  };

  const sidebarLinks = getSidebarLinks();

  return (
    <>
      <NavBar>
        <Logo whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }} onClick={() => navigate("/")}>
          <img src={logo} alt="Logo" />
          RoboStyle Studio
        </Logo>
        <Hamburger onClick={toggleSidebar} whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
          <Line />
          <Line />
          <Line />
        </Hamburger>
      </NavBar>

      {/* Overlay for better UX */}
      <Overlay isOpen={isOpen} onClick={toggleSidebar} />

      <Sidebar
        initial={{ transform: 'translateX(100%)' }}
        animate={{ transform: isOpen ? 'translateX(0)' : 'translateX(100%)' }}
      >
        {sidebarLinks.map(({ label, path }, index) => (
          <SidebarLink
            key={index}
            onClick={() => {
              toggleSidebar(); // Close sidebar
              navigate(path); // Navigate to the correct page
            }}
          >
            {label}
          </SidebarLink>
        ))}
      </Sidebar>
    </>
  );
};

export default Navbar;
