import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "./Navbar";

// Styled components
const GalleryContainer = styled.div`
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
  margin-top: 8rem;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: 1.25rem;
  margin-bottom: 2rem;
  max-width: 600px;
`;

const ImageGallery = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const ImageItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
`;

const StyledImage = styled.img`
  width: 300px;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
`;

const ImageTitle = styled.p`
  margin-top: 5px;
  font-size: 1rem;
  color: #ff6b6b; // Color for the titles
`;

const LoadingScreen = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-size: 2rem;
  color: #fff;
`;

const Footer = styled.footer`
  margin-top: auto;
  padding: 1rem;
  text-align: center;
  color: #ccc;
`;

const Gallery = () => {
  const [images, setImages] = useState([]); // State for images
  const [loadingCount, setLoadingCount] = useState(0); // Track loading images
  const token = "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"; // Replace with your token

  const prompts = [
    // Fashion Design Prompts
    "Elegant floral curtains with a soft pastel color palette",
    "Modern geometric patterned curtains in vibrant shades",
    "Bold animal print cushion covers with plush textures",
    "Vintage-style cushion covers with intricate lace designs",
    "Rustic plaid dining table cloth in warm earth tones",
    "Chic silk table cloth with shimmering metallic accents",
    "Trendy summer shorts and t-shirt for kids",
    "A colorful backpack for school",
    "An elegant party dress for a girl aged 10",
  ];

  const query = async (data) => {
    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/ZB-Tech/Text-to-Image",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({ inputs: data }),
        }
      );

      if (!response.ok) {
        const errorDetails = await response.text();
        throw new Error(
          `HTTP error! status: ${response.status}, details: ${errorDetails}`
        );
      }

      const result = await response.blob();
      return URL.createObjectURL(result); // Convert blob to URL
    } catch (error) {
      console.error("Error during image query:", error);
    }
  };

  useEffect(() => {
    const fetchImages = async () => {
      const storedImages = JSON.parse(localStorage.getItem("galleryImages"));

      if (storedImages && storedImages.length > 0) {
        // If images are stored in localStorage, use them
        setImages(storedImages);
      } else {
        const newImages = [];

        for (let i = 0; i < prompts.length; i++) {
          const prompt = prompts[i];
          setLoadingCount((prev) => prev + 1); // Increment loading counter

          try {
            const imageUrl = await query(prompt); // Fetch image for each prompt
            if (imageUrl) {
              newImages.push({ url: imageUrl, title: prompt, loaded: false }); // Add image and title to the newImages array
            }
          } catch (error) {
            console.error("Error fetching image for prompt:", prompt);
          } finally {
            setLoadingCount((prev) => prev - 1); // Decrement loading counter
          }
        }

        setImages(newImages);
        localStorage.setItem("galleryImages", JSON.stringify(newImages)); // Save fetched images to localStorage
      }
    };

    fetchImages();
  }, []); // Add the empty dependency array to prevent infinite loop

  return (
    <>
      <Navbar />
      <GalleryContainer>
        <Title>Gallery</Title>
        <Description>
          Explore our collection of unique fashion designs created by our AI
          technology. Here are some examples of the outfits we can generate.
        </Description>

        <ImageGallery>
          {images.map((image, index) => (
            <ImageItem key={index}>
              <StyledImage src={image.url} alt={`Design ${index + 1}`} />
              <ImageTitle>{image.title}</ImageTitle> {/* Display image title */}
            </ImageItem>
          ))}
        </ImageGallery>

        {loadingCount > 0 && ( // Show loading message if images are still being fetched
          <LoadingScreen>Loading more images...</LoadingScreen>
        )}

        <Footer>
          &copy; {new Date().getFullYear()} RoboStyle Studio. All rights
          reserved.
        </Footer>
      </GalleryContainer>
    </>
  );
};

export default Gallery;
