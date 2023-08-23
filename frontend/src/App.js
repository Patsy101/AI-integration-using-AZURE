// ./src/App.js

import React, { useState } from 'react';
import axios from 'axios';
import ImageUrlClassification from './components/Patrick/UrlImage';

function App() {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [results, setResults] = useState([]);

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
    setImageUrl(URL.createObjectURL(selectedImage)); // Create a temporary URL for the selected image
  };

  const handleUpload = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await axios.post(
        'http://localhost:4000/classifyuploadimage',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      setResults(response.data.predictions);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <h1>Image Classification</h1>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={handleUpload}>Upload</button>

      <div className="results">
        <h2>Classification Results:</h2>

        {imageUrl && <img src={imageUrl} alt="Uploaded" width="300" />}
        {results.map((result, index) => (
          <p key={index}>
            {result.tagName}: {Math.round(result.probability * 100)}%
          </p>
        ))}
      </div>
      <ImageUrlClassification />
    </div>
  );
}

export default App;
