import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
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
  z-index: 100; 
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    padding: 0.75rem 1rem;
  }
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

  @media (max-width: 768px) {
    font-size: 1.5rem;
    & img {
      width: 40px; /* Reduce logo size for mobile */
    }
  }
`;

const Hamburger = styled(motion.div)`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 60px; 
  height: 20px;
  background: transparent;
  margin-right: 40px;
  z-index: 101;

  @media (max-width: 768px) {
    width: 50px; /* Adjust hamburger width for mobile */
    height: 15px; /* Adjust height */
    margin-right: 20px;
  }
`;

const Line = styled.div`
  height: 4px;
  width: 60%;

  background: #ff6b6b;
  border-radius: 5px;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    height: 3px; /* Adjust line thickness */
  }
`;

const Sidebar = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  width: 250px; 
  background-color: rgba(28, 28, 28, 0.95);
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.5);
  padding: 2rem;
  z-index: 200;
  transform: translateX(100%);
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (max-width: 768px) {
    width: 200px; /* Adjust sidebar width for mobile */
    padding: 1.5rem;
  }
`;

const SidebarLink = styled(motion.a)`
  color: white;
  margin: 1rem 0;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    color: #ff6b6b;
  }

  @media (max-width: 768px) {
    margin: 0.75rem 0; /* Adjust spacing for mobile */
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 150;
  display: ${props => (props.isOpen ? 'block' : 'none')}; 
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const getSidebarLinks = () => {
    switch (location.pathname) {
      case '/':
        return [
          { label: "Generate Ideas", path: "/text-to-image" },
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
          { label: "Generate Ideas", path: "/text-to-image" },
          { label: "Home", path: "/" },
          { label: "Gallery", path: "/gallery" }
        ];
      case '/gallery':
        return [
          { label: "Generate Ideas", path: "/text-to-image" },
          { label: "Home", path: "/" },
          { label: "About Us", path: "/about-us" }
        ];
      default:
        return []; 
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

      <Overlay isOpen={isOpen} onClick={toggleSidebar} />

      <Sidebar
        initial={{ transform: 'translateX(100%)' }}
        animate={{ transform: isOpen ? 'translateX(0)' : 'translateX(100%)' }}
      >
        {sidebarLinks.map(({ label, path }, index) => (
          <SidebarLink
            key={index}
            onClick={() => {
              toggleSidebar();
              navigate(path);
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
