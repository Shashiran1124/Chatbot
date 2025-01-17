const express = require("express");
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();



const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", methods: ["POST"] }));

const RASA_SERVER_URL = "http://localhost:5005/webhooks/rest/webhook"; // Rasa API





//Endpoint to handle chat requests
app.post('/chat', async (req, res) => {
  
  try{
    const userMessage = req.body.message;

    const response = await axios.post(RASA_SERVER_URL, {
      sender: "user",
      message: userMessage
    
    });

    res.json(response.data);
  } catch (error) {
    console.error("Error communicating with RASA: " ,error);
    res.status(500).send("Error connecting to chatbot.");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

