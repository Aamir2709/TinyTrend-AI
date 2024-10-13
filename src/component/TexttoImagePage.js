import React, { useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import Navbar from "./Navbar";

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

const BubbleOptions = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const BubbleButton = styled(motion.button)`
  padding: 1rem 2rem;
  background-color: #ff6b6b;
  border: none;
  border-radius: 50px;
  font-size: 1rem;
  color: white;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  outline: none;

  &:hover {
    background-color: #ff4d4d;
  }

  &.active {
    background-color: #ff3030;
    font-weight: bold;
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

const MagicWandIcon = styled(motion.div)`
  width: 60px;
  height: 60px;
  position: relative;
  margin-bottom: 1.5rem;

  &::before {
    content: "✨";
    position: absolute;
    font-size: 3rem;
    animation: sparkle 1s ease-in-out infinite alternate;
    top: -20px;
    left: 20px;
  }

  @keyframes sparkle {
    0% {
      opacity: 0.6;
      transform: translateX(0) rotate(0deg);
    }
    100% {
      opacity: 1;
      transform: translateX(10px) rotate(15deg);
    }
  }
`;

const Tagline = styled(motion.div)`
  font-size: 1.5rem;
  color: #ff6b6b;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  margin-top: 1rem;
`;

const MagicLoadingSpinner = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={{ textAlign: "center" }}
    >
      <MagicWandIcon
        initial={{ scale: 0.8, rotate: 0 }}
        animate={{ scale: 1.2, rotate: 360 }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
        }}
      />
      <Tagline
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        Your imagination is coming into existence....
      </Tagline>
    </motion.div>
  );
};

const options = [
  {
    display: "Dining Table Cloth",
    prompt: "dining table",
  },
  { display: "Cushion Cover", prompt: "2 cushions on a sofa" },
  { display: "Curtain", prompt: "Curtains on the wall" },
  { display: "Dress", prompt: "Dress" },
  { display: "Bedsheet", prompt: "king size bed" },
];

// Main Component
const TextToImagePage = () => {
  const [images, setImages] = useState({});
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const token = "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"; // Example token

  // Function to query the image generation API
  const query = async (data) => {
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
    return URL.createObjectURL(result); // Convert blob to URL
  };

  const handleGenerateImage = async () => {
    setLoading(true);
    try {
      const allImages = {};

      // Generate images for each option concurrently
      await Promise.all(
        options.map(async (item) => {
          allImages[item.display] = [];

          // Generate 3 images in parallel for each option
          const imagePromises = Array(3)
            .fill(null)
            .map(async () => {
              const prompt = `Generate ${item.prompt} with the following material design: ${text}`;
              return await query({ inputs: prompt });
            });

          const generatedImages = await Promise.all(imagePromises);
          allImages[item.display] = generatedImages; // Store the generated images
        })
      );

      setImages(allImages);
    } catch (error) {
      console.error("Error generating images:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleItemSelect = (item) => {
    setSelectedItem(item);
  };

  return (
    <>
      <Navbar></Navbar>
      <Container>
        <Title>AI Design Generator</Title>
        <Input
          placeholder="Enter the description of the material you have"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <GenerateButton
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleGenerateImage}
        >
          Generate Designs
        </GenerateButton>

        {loading && <MagicLoadingSpinner />}

        {Object.keys(images).length > 0 && !loading && (
          <>
            <BubbleOptions>
              {options.map((item) => (
                <BubbleButton
                  key={item.display}
                  whileHover={{ scale: 1.1 }}
                  onClick={() => handleItemSelect(item)}
                  className={selectedItem === item ? "active" : ""}
                >
                  {item.display}
                </BubbleButton>
              ))}
            </BubbleOptions>

            {selectedItem && (
              <ImageGrid>
                {images[selectedItem.display]?.map((imgSrc, index) => (
                  <GeneratedImage
                    key={index}
                    src={imgSrc}
                    alt={`Generated image for ${selectedItem.display} ${
                      index + 1
                    }`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.3 }}
                  />
                ))}
              </ImageGrid>
            )}
          </>
        )}
      </Container>
    </>
  );
};

export default TextToImagePage;
