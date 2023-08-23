import React from "react";
import BackgroundVideo from "./components/Moses/VideoPlayer";
import CustomAI from "./components/Moses/CustomAI";

export default function App() {
  return (
    <div className="App">
      <CustomAI />
      <BackgroundVideo />
    </div>
  );
}
