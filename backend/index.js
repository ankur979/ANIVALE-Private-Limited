const express = require('express');
const axios = require('axios');
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config()
const app = express();
app.use(cors())
const port = 5000; 

// Pixabay API configuration
const API_KEY = process.env.PIXABAY_KEY;

// Search
app.get('/search', (req, res) => {
    const { text,category } = req.query;

    // Make a request to the Pixabay API
    axios.get(`https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(text)}&category=${category}`)
        .then(response => {
         //   const images = response.data.hits.map(hit => hit.largeImageURL);
            res.json(response.data);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'An error occurred' });
        });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
