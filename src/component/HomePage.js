import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import sampleImage from "../sample1.png";

// Styled components
const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  min-height: 100vh;
  background: linear-gradient(135deg, #1c1c1c, #2e2e2e);
  color: white;
  text-align: center;
  padding: 40px 20px;
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
  width: 80%;
  max-width: 600px;
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
  margin-bottom: 1rem;
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
  margin-bottom: 1rem;
`;

// Main Component
const HomePage = () => {
  const navigate = useNavigate();

  return (
    <HomeContainer>
      <Title>Welcome to AI for Sustainable Fashion for Children</Title>

      <CentralImage src={sampleImage} alt="Highlight" />

      <Description>
        This application leverages AI to create unique and sustainable fashion
        designs for children. With just a few clicks, you can generate
        personalized outfits based on gender and age group.
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
          <h3>Generate Outfits</h3>
          <p>💡 Generate outfits based on user inputs.</p>
        </FeatureBox>
        <FeatureBox>
          <h3>Unique Designs</h3>
          <p>🎨 AI-generated unique designs.</p>
        </FeatureBox>
        <FeatureBox>
          <h3>Customizable</h3>
          <p>👗 Gender and age group customization.</p>
        </FeatureBox>
      </FeatureSection>

      {/* Testimonials Section */}
      <TestimonialTitle>User Testimonials</TestimonialTitle>
      <TestimonialsSection>
        <TestimonialBox>
          <p>"This app is amazing! My kids love the designs!"</p>
        </TestimonialBox>
        <TestimonialBox>
          <p>"Finally, a way to find unique outfits for my children!"</p>
        </TestimonialBox>
        <TestimonialBox>
          <p>"Sustainable fashion made easy!"</p>
        </TestimonialBox>
      </TestimonialsSection>

      {/* Footer Section */}
      <Footer>
        &copy; {new Date().getFullYear()} AI for Sustainable Fashion. All rights
        reserved.
      </Footer>
    </HomeContainer>
  );
};

export default HomePage;
