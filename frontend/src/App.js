// ./src/App.js

import React, { useState } from 'react';
import axios from 'axios';
import ImageUrlClassification from './components/Patrick/UrlImage';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../src/components/Patrick/navbar';
import Footer from '../src/components/Patrick/Footer';
import CarsAvailability from '../src/components/Patrick/CarsAvailability';

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
      <Navbar></Navbar>
      <br></br>

      <h2>Image Classification</h2>

      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={handleUpload}>Upload</button>

      <div className="results">
        {imageUrl && <img src={imageUrl} alt="Uploaded" width="300" />}
        <h1> Results:</h1>
        {results.map((result, index) => (
          <p key={index}>
            {result.tagName}: {Math.round(result.probability * 100)}%
          </p>
        ))}
      </div>
      <CarsAvailability></CarsAvailability>

      <ImageUrlClassification />
      <Footer></Footer>
    </div>
  );
}

export default App;
