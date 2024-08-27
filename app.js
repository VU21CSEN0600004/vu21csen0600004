const express = require('express');
const fetchNumbers = require('./helpers/fetchNumbers');
const calculateAverage = require('./utils/calculateAverage');

const app = express();
const PORT = 9876;

const WINDOW_SIZE = 10;
let numberWindow = [];

// Default route for root URL
app.get('/', (req, res) => {
    res.send('Welcome to the Average Calculator Microservice!');
});

app.get('/number/:type', async (req, res) => {
    const { type } = req.params;

    if (!['p', 'f', 'e', 'r'].includes(type)) {
        return res.status(400).json({ error: 'Invalid number type. Use p, f, e, or r.' });
    }

    const newNumbers = await fetchNumbers(type);
    const uniqueNewNumbers = newNumbers.filter(num => !numberWindow.includes(num));
    const prevWindowState = [...numberWindow];

    numberWindow.push(...uniqueNewNumbers);

    if (numberWindow.length > WINDOW_SIZE) {
        numberWindow = numberWindow.slice(-WINDOW_SIZE);
    }

    const average = calculateAverage(numberWindow);

    res.json({
        windowPrevState: prevWindowState,
        windowCurrState: numberWindow,
        numbers: newNumbers,
        avg: average
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
