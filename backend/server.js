const express = require('express');
const https = require('https');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4000; // Change to your desired port
app.use(express.json());
app.use(cors());

app.get('/TurnersCars', (req, res) => {
  let subscriptionKey = '7825de3e46804f8b8ea48ec323aa494a';
  let host = 'api.bing.microsoft.com';
  let path = '/v7.0/search';
  let mkt = 'en-NZ';
  let q = 'cars picture';
  let query = '?mkt=' + mkt + '&q=' + encodeURI(q);

  let response_handler = function (response) {
    let body = '';

    response.on('data', function (d) {
      body += d;
    });

    response.on('end', function () {
      let json = JSON.parse(body);
      res.send(json); // Send the JSON data to the client
    });
  };

  let Search = function () {
    let request_params = {
      method: 'GET',
      hostname: host,
      path: path + query,
      headers: {
        'Ocp-Apim-Subscription-Key': subscriptionKey,
      },
    };

    let req = https.request(request_params, response_handler);
    req.end();
  };

  Search(); // Initiate the API request

  // Serve the HTML file
});

app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});
