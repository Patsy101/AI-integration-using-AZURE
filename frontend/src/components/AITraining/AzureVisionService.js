// Importing the Azure SDK client libraries
import { ComputerVisionClient } from '@azure/cognitiveservices-computervision';
import { ApiKeyCredentials } from '@azure/ms-rest-js';
import findCar from './findCar';
// Load environment variables from .env file

// Authentication requirements
const key = process.env.REACT_APP_apiKey;
const endpoint = process.env.REACT_APP_endPoint;

console.log(`key = ${key}`);
console.log(`endpoint = ${endpoint}`);
// Cognitive service features
const options = {
  maxCandidates: 5,
  language: 'en',
};

// Describe Image from URL
export const computerVision = async (url) => {
  // authenticate to Azure service
  console.log('Endpoint:', endpoint); // Add this line
  const computerVisionClient = new ComputerVisionClient(
    new ApiKeyCredentials({ inHeader: { 'Ocp-Apim-Subscription-Key': key } }),
    endpoint
  );

  // describe image using the describeImage method
  const analysis = await computerVisionClient
    .describeImage(url, options)
    .then((result) => {
      findCar(result.tags);
      console.log('The result is:');
      console.log(result);
      return findCar(result.tags);
    })
    .catch((err) => {
      console.log('An error occurred:');
      console.error(err);
      alert(err + 'Upload an image with a smaller size');
    });

  // all information about image
  console.log('This is:' + analysis);
  if (analysis === undefined) {
    return 'There is something wrong with the image';
  }
  return { URL: url, ...analysis };
};
