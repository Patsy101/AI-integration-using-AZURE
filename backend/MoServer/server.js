const cors = require("cors");
const express = require("express");
const app = express();
const axios = require("axios");
const multer = require("multer");
const https = require("https");
require("dotenv").config();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
app.use(express.json());
app.use(cors());

app.post("/carsimageurl", async (req, res) => {
  const { imageUrl } = req.body;

  // Your Custom Vision API endpoint and prediction key
  const apiUrl = process.env.CAR_IMAGE_TEXT;
  const predictionKey = process.env.VISION_PREDICTION_KEY;

  try {
    const response = await axios.post(
      apiUrl,
      { Url: imageUrl },
      {
        headers: {
          "Prediction-Key": predictionKey,
          "Content-Type": "application/json",
        },
      }
    );

    // Respond with the classification result
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.post("/classifyuploadimage", upload.single("image"), async (req, res) => {
  const imageBuffer = req.file.buffer;

  // Your Custom Vision API endpoint and prediction key
  const apiUrl = process.env.CAR_IMAGE_URL;
  const predictionKey = process.env.VISION_PREDICTION_KEY;

  try {
    const response = await axios.post(apiUrl, imageBuffer, {
      headers: {
        "Prediction-Key": predictionKey,
        "Content-Type": "application/octet-stream",
      },
    });

    // Respond with the classification result
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server confirmed for http://localhost:${PORT}`);
});
