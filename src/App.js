import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TextToImagePage from "./component/TexttoImagePage";
import HomePage from "./component/HomePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/text-to-image" element={<TextToImagePage />} />
      </Routes>
    </Router>
  );
};

export default App;
