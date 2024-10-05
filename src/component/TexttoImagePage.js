import React, { useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

// Styled components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #1c1c1c, #2e2e2e);
  color: white;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 4rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
`;

const Input = styled.input`
  width: 60%;
  padding: 1rem;
  border: none;
  border-radius: 50px;
  font-size: 1.2rem;
  outline: none;
  text-align: center;
  margin-bottom: 2rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
`;

const Select = styled.select`
  width: 60%;
  padding: 1rem;
  border: none;
  border-radius: 50px;
  font-size: 1.2rem;
  outline: none;
  margin-bottom: 1rem;
  background: rgba(255, 255, 255, 0.1); // Transparent dark background
  color: white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  appearance: absolute; // Hide default dropdown arrow
  position: relative;

  &::-ms-expand {
    display: none; // Hide default dropdown arrow in IE
  }

  // Custom dropdown arrow
  &::after {
    content: '▼';
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    color: white;
    pointer-events: none;
  }

  option {
    background: rgba(255, 255, 255, 0.1); // Same background for options
    color: black; // White text for options
  }
`;

const GenerateButton = styled(motion.button)`
  padding: 1rem 3rem;
  background-color: #ff6b6b;
  border: none;
  color: white;
  border-radius: 50px;
  font-size: 1.2rem;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  margin-bottom: 3rem;
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  padding: 2rem;
`;

const GeneratedImage = styled(motion.img)`
  width: 100%;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.3);
`;

const LoadingSpinner = styled(motion.div)`
  border: 8px solid rgba(255, 255, 255, 0.2);
  border-left-color: #ff6b6b; /* Color of the spinner */
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 0.8s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    25% {
      transform: rotate(90deg);
      border-left-color: #ff6b6b;
    }
    50% {
      transform: rotate(180deg);
      border-left-color: #ff6b6b;
    }
    75% {
      transform: rotate(270deg);
      border-left-color: #ff6b6b;
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

// Main Component
const TextToImagePage = () => {
  const [image, setImage] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const [gender, setGender] = useState("boy");
  const [ageGroup, setAgeGroup] = useState("0-5");
  const token = "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";

  // Function to query the image generation API
  const query = async (data) => {
    console.log("Got the following params: ", data);
    const response = await fetch(
      "https://api-inference.huggingface.co/models/ZB-Tech/Text-to-Image",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    const result = await response.blob();
    console.log("Got the following result: ", result);
    return URL.createObjectURL(result); // Convert blob to URL
  };

  const handleGenerateImage = async () => {
    setLoading(true); // Set loading to true
    try {
      const prompt = `Generate a sustainable fashion outfit for a ${ageGroup} ${gender}. Description: ${text}`;
      const imageUrl = await query({ inputs: prompt });
      console.log("Image URL: ", imageUrl);
      setImage([imageUrl]); // Set images to an array containing the single image
    } catch (error) {
      console.error("Error generating images:", error);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <Container>
      <Title>AI for Sustainable Fashion for Children</Title>
      <Input
        placeholder="Enter additional description..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      
      <Select value={gender} onChange={(e) => setGender(e.target.value)}>
        <option value="boy">Boy</option>
        <option value="girl">Girl</option>
      </Select>

      <Select value={ageGroup} onChange={(e) => setAgeGroup(e.target.value)}>
        <option value="0-5">0-5</option>
        <option value="5-10">5-10</option>
        <option value="10-15">10-15</option>
        <option value="15-20">15-20</option>
      </Select>

      <GenerateButton
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleGenerateImage}
      >
        Generate
      </GenerateButton>

      {loading && <LoadingSpinner />}

      {image.length > 0 && !loading && (
        <ImageGrid>
          <GeneratedImage
            src={image}
            alt={`Generated image`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          />
        </ImageGrid>
      )}
    </Container>
  );
};

export default TextToImagePage;
