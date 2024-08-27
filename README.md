# Average Calculator Microservice

This microservice fetches numbers of specific types (Prime, Fibonacci, Even, Random) and calculates their average using a sliding window. It exposes a REST API that responds with the current state of the number window, as well as the calculated average.

## Setup

1. Install dependencies:

\`\`\`
npm install
\`\`\`

2. Run the server:

\`\`\`
npm start
\`\`\`

3. Example API request:

\`\`\`
GET http://localhost:9876/number/e
\`\`\`

This will return the even numbers and the average of the sliding window.
