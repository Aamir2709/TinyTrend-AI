// AboutUs.js
import React from "react";
import styled from "styled-components";
import Navbar from "./Navbar";

// Styled components
const AboutContainer = styled.div`
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
  margin-top: 5rem;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: 1.25rem;
  margin-bottom: 2rem;
  max-width: 600px;
`;

const Section = styled.div`
  margin: 2rem 0;
  padding: 20px;
  background: #ff6b6b;
  border-radius: 8px;
  max-width: 800px;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const SectionText = styled.p`
  font-size: 1rem;
  margin-bottom: 1rem;
`;

const Footer = styled.footer`
  margin-top: auto;
  padding: 1rem;
  text-align: center;
  color: #ccc;
`;

const AboutUs = () => {
  return (
    <>
      <Navbar />
      <AboutContainer>
        <Title>About Us</Title>
        <Description>
          Welcome to RoboStyle Studio! Our mission is to leverage AI technology
          to create unique and sustainable fashion designs. We aim to provide a
          seamless experience for parents to design personalized outfits for
          their children.
        </Description>

        <Section>
          <SectionTitle>Our Mission</SectionTitle>
          <SectionText>
            At RoboStyle Studio, we believe in revolutionizing the fashion
            industry through innovative technology. Our goal is to empower
            parents to express their creativity while providing children with
            stylish, custom-made outfits that reflect their unique
            personalities.
          </SectionText>
        </Section>

        <Section>
          <SectionTitle>Our Values</SectionTitle>
          <SectionText>
            We prioritize sustainability, creativity, and inclusivity in our
            designs. By using eco-friendly materials and promoting fair
            practices, we aim to make a positive impact on the environment and
            society.
          </SectionText>
        </Section>

        <Footer>
          &copy; {new Date().getFullYear()} RoboStyle Studio. All
          rights reserved.
        </Footer>
      </AboutContainer>
    </>
  );
};

export default AboutUs;
