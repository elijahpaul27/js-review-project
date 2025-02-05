const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to log incoming requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next(); // Pass control to the next middleware
});

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the "public" directory
app.use(express.static('public'));

// Define a route for the home page
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Define a route for the about page
app.get('/about', (req, res) => {
    res.send('About Us');
});

// Define a route to display a list of items:

const items = ['Apple','Banana','Orange']

app.get('/items', (req, res) => {
    res.json(items);
});

// POST route to handle item submissions
app.post('/items', (req, res) => {
    const newItem = req.body.item;
    if (newItem) {
        items.push(newItem); // Add the new item to the array
        res.status(201).json({ message: 'Item added successfully', items }); // Send a success response
    } else {
        res.status(400).json({ message: 'Item is required' }); // Handle invalid input
    }
});

// POST route to handle JSON submissions
app.post('/submit', (req, res) => {
    const data = req.body;
    res.send(`Received: ${JSON.stringify(data)}`);
});

// Error-handling middleware 
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
