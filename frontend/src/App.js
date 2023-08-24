import React from "react";
import BackgroundVideo from "./components/Moses/VideoPlayer";
import ImageURL from "./components/Moses/ImageURL";
import ImageUploader from "./components/Moses/ImageUploader";

export default function App() {
  return (
    <div className="App">
      <ImageURL />
      <ImageUploader />
      <BackgroundVideo />
    </div>
  );
}
