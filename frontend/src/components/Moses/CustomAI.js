import React, { useState } from "react";
import axios from "axios";

const CarImageClassifier = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Your Custom Vision API endpoint and prediction key
    // Change this URL if the API is not hosted on the same domain
    const apiUrl = process.env.IMAGE_URL;

    try {
      const response = await axios.post(
        apiUrl + "/CarImage",
        { imageUrl },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setResult(response.data);
    } catch (err) {
      console.error(err);
      setError("An error has occurred");
    }
  };

  return (
    <div>
      <h1>Car Image Classification</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="imageUrl">Enter the Image URL:</label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          required
        />
        <button type="submit">Classify</button>
      </form>
      {result && (
        <div>
          <h3>Results:</h3>
          {result.predictions.map((prediction) => (
            <div key={prediction.tagName}>
              {prediction.tagName}:{" "}
              {(prediction.probability * 100.0).toFixed(2)}%
            </div>
          ))}
        </div>
      )}
      {error && <div>{error}</div>}
    </div>
  );
};

export default CarImageClassifier;
