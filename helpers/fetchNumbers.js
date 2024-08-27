const axios = require('axios');

// API URLs for different types of numbers
const apiUrls = {
    'p': 'http://20.244.56.144/test/primes',
    'f': 'http://20.244.56.144/test/fibo',
    'e': 'http://20.244.56.144/test/even',
    'r': 'http://28.244.56.144/test/rand'
};

// API to obtain the authorization token
const authUrl = 'http://20.244.56.144/test/auth';
const authPayload = {
    companyName: 'goMart',  // Replace with your company name
    clientID: '37bb493c-73d3-47ea-8675-21f66ef9b735',  // Replace with your actual client ID
    clientSecret: 'XOyo1ORPasKWODAN',  // Replace with your actual client secret
    ownerName: 'Rahul',  // Replace with your actual owner name
    ownerEmail: 'rahul@abc.edu',  // Replace with your actual owner email
    rollNo: '1'  // Replace with your actual roll number
};

let token = '';  // Token will be stored here

// Function to fetch the authorization token
async function getAuthToken() {
    try {
        const response = await axios.post(authUrl, authPayload);
        token = response.data.access_token;
        console.log('Authorization token obtained:', token);
    } catch (error) {
        console.error('Error obtaining authorization token:', error.message);
    }
}

// Function to fetch numbers with the authorization token
async function fetchNumbers(type) {
    try {
        if (!token) {
            await getAuthToken();  // Fetch token if not already fetched
        }

        const url = apiUrls[type];
        console.log(`Fetching numbers from: ${url}`);  // Debugging

        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const numbers = response.data.numbers || [];
        console.log(`Numbers received: ${numbers}`);  // Debugging

        return numbers;
    } catch (error) {
        console.error(`Error fetching numbers for type ${type}:`, error.message);
        return [];
    }
}

module.exports = fetchNumbers;
