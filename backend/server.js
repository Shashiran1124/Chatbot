const express = require("express");
const axios = require('axios');
const bodyParser = require("body-parser");
require('dotenv').config();

const cors = require('cors');



const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Load OpenAI API Key
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Debugging Environment Variables
console.log('OpenAI API Key:', OPENAI_API_KEY ? 'Loaded' : 'Not Loaded');
console.log('Environment Variables:', process.env);



//Endpoint to handle chat requests
app.post('/chat', async (req, res) => {
  const userQuery = req.body.query;

  try{
    const response = await axios.post('https://api.openai.com/v1/completions', {
      model: 'gpt-3.5-turbo', //Use a different model if you want
      prompt: `User asks: ${userQuery}\nProvide accurate and informative response about computer hardware`,
      max_tokens: 150, // Adjust this if you want to limit the length of the response
      temperature: 0.7,//Controls how creative the response is.
      n: 1,
      stop: undefined
    }, {
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      }
    });

    const message = response.data.choices[0].text.trim();
    res.json({response: message});
  } catch (error) {
    console.error(error);
    res.json({response: 'An error occured when processing the request.'});
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

