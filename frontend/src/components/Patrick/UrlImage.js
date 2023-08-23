import React, { useState } from 'react';
import axios from 'axios';

function ImageUrlClassification() {
  const [imageUrl, setImageUrl] = useState('');
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');
  const [results, setResults] = useState([]);
  const [showImagePreview, setShowImagePreview] = useState(false);

  const handleImageUrlChange = (event) => {
    setImageUrl(event.target.value);
    setShowImagePreview(false); // Reset image preview when URL changes
  };

  const handleClassify = async () => {
    if (!imageUrl) return;

    try {
      const response = await axios.post('http://localhost:4000/carsimageurl', {
        imageUrl: imageUrl,
      });

      setResults(response.data.predictions);
      setShowImagePreview(true); // Show image preview after classifying
      setImagePreviewUrl(imageUrl); // Set image preview URL
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Image URL Classification</h2>
      <div>
        <label htmlFor="imageUrl">Image URL: </label>
        <input
          type="text"
          id="imageUrl"
          value={imageUrl}
          onChange={handleImageUrlChange}
        />
        <button onClick={handleClassify}>Classify</button>
      </div>
      {showImagePreview && imagePreviewUrl && (
        <div className="image-preview">
          <img src={imagePreviewUrl} alt="Preview" width={300} height={300} />
        </div>
      )}
      <div className="results">
        <h3>Classification Results:</h3>
        {results.map((result, index) => (
          <p key={index}>
            {result.tagName}: {Math.round(result.probability * 100)}%
          </p>
        ))}
      </div>
    </div>
  );
}

export default ImageUrlClassification;
