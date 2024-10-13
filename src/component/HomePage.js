import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import logo from "../logo.webp";
import Navbar from "./Navbar";

// Styled components
const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; /* Changed to flex-start for proper alignment */
  min-height: 100vh;
  background: linear-gradient(135deg, #1c1c1c, #2e2e2e);
  color: white;
  text-align: center;
  padding: 80px 20px; /* Increased top padding for navbar */
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: 1.25rem;
  margin-bottom: 2rem;
  max-width: 600px;
`;

const CentralImage = styled.img`
  width: 50%;
  max-width: 400px;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  margin-bottom: 2rem;
`;

const TryButton = styled(motion.button)`
  padding: 1rem 3rem;
  background-color: #ff6b6b;
  border: none;
  color: white;
  border-radius: 50px;
  font-size: 1.5rem;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ff4c4c;
  }
`;

// Feature and Testimonial Box Styles
const FeatureBox = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 2rem;
  border-radius: 15px;
  margin: 1rem;
  width: 300px; /* Fixed width for boxes */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
`;

const TestimonialBox = styled(FeatureBox)`
  background: rgba(255, 255, 255, 0.2);
`;

const FeatureSection = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 2rem 0;
`;

const FeatureTitle = styled.h2`
  font-size: 2rem;
  margin: 2rem 0 1rem; /* Added margin for spacing */
`;

const Footer = styled.footer`
  margin-top: auto;
  padding: 1rem;
  text-align: center;
  color: #ccc;
`;

const TestimonialsSection = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 2rem 0;
`;

const TestimonialTitle = styled.h2`
  font-size: 2rem;
  margin: 2rem 0 1rem; /* Added margin for spacing */
`;

// Main Component
const HomePage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <HomeContainer>
        <Title>Welcome to RoboStyle Studio!</Title> {/* Added Title */}
        <CentralImage src={logo} alt="Highlight" />
        <Description>
          Unleash your creativity! Our AI-driven website effortlessly turns your
          raw materials into exquisite designer items—curtains, cushions,
          tablecloths, and everything else you can envision—in mere moments.
        </Description>
        <TryButton
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate("/text-to-image")}
        >
          Try it Out
        </TryButton>
        {/* Feature Highlights Section */}
        <FeatureTitle>Key Features</FeatureTitle>
        <FeatureSection>
          <FeatureBox>
            <h3>Fabric Transformation</h3>
            <p>
              💡 Turn raw materials into stunning designer pieces effortlessly.
            </p>
          </FeatureBox>
          <FeatureBox>
            <h3>Instant Design Generation</h3>
            <p>🎨 Generate unique designs in real-time.</p>
          </FeatureBox>
          <FeatureBox>
            <h3>User-Friendly Interface</h3>
            <p>👗 Simple and intuitive design process.</p>
          </FeatureBox>
          <FeatureBox>
            <h3>Customizable Options</h3>
            <p>✨ Tailor designs to your preferences.</p>
          </FeatureBox>
          <FeatureBox>
            <h3>Sustainability Focused</h3>
            <p>🌱 Promote sustainable fashion practices.</p>
          </FeatureBox>
        </FeatureSection>
        {/* Testimonials Section */}
        <TestimonialTitle>User Testimonials</TestimonialTitle>
        <TestimonialsSection>
          <TestimonialBox>
            <p>
              "I never thought I could turn my old fabric into beautiful
              cushions! This tool makes it so easy!"
            </p>
          </TestimonialBox>
          <TestimonialBox>
            <p>
              "I love how quickly I can create custom curtains for my home. The
              designs are stunning!"
            </p>
          </TestimonialBox>
          <TestimonialBox>
            <p>
              "Transforming raw material into unique tablecloths has never been
              easier. I'm obsessed with the results!"
            </p>
          </TestimonialBox>
        </TestimonialsSection>
        {/* Footer Section */}
        <Footer>
          &copy; {new Date().getFullYear()} RoboStyle Studio. All
          rights reserved.
        </Footer>
      </HomeContainer>
    </>
  );
};

export default HomePage;
