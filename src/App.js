import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TextToImagePage from "./component/TexttoImagePage";
import HomePage from "./component/HomePage";
import AboutUs from "./component/AboutUs";
import Gallery from "./component/Gallery";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/text-to-image" element={<TextToImagePage />} />
        <Route path="about-us" element={<AboutUs />} />
        <Route path="gallery" element={<Gallery />} />
      </Routes>
    </Router>
  );
};

export default App;
