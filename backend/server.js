const express = require('express');
const https = require('https');
const cors = require('cors');
const axios = require('axios');
const app = express();
const multer = require('multer');

const PORT = process.env.PORT || 4000;

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
app.use(express.json());
app.use(cors());
// cars image url
app.post('/carsimageurl', async (req, res) => {
  const { imageUrl } = req.body;

  // Your Custom Vision API endpoint and prediction key
  const apiUrl =
    'https://australiaeast.api.cognitive.microsoft.com/customvision/v3.0/Prediction/b91065f7-7f9f-4d01-a7da-b6be39c3ca93/classify/iterations/Iteration1/url';
  const predictionKey = '5e3052452faf40fbaf2cc0452c2ddd75';

  try {
    const response = await axios.post(
      apiUrl,
      { Url: imageUrl },
      {
        headers: {
          'Prediction-Key': predictionKey,
          'Content-Type': 'application/json',
        },
      }
    );

    // Respond with the classification result
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});
//cars upload image
app.post('/classifyuploadimage', upload.single('image'), async (req, res) => {
  const imageBuffer = req.file.buffer;

  // Your Custom Vision API endpoint and prediction key
  const apiUrl =
    'https://australiaeast.api.cognitive.microsoft.com/customvision/v3.0/Prediction/b91065f7-7f9f-4d01-a7da-b6be39c3ca93/classify/iterations/Iteration1/image';
  const predictionKey = '5e3052452faf40fbaf2cc0452c2ddd75';

  try {
    const response = await axios.post(apiUrl, imageBuffer, {
      headers: {
        'Prediction-Key': predictionKey,
        'Content-Type': 'application/octet-stream',
      },
    });

    // Respond with the classification result
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});
app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});
