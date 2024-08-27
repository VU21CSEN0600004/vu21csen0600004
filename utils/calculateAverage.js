function calculateAverage(numbers) {
    const sum = numbers.reduce((acc, curr) => acc + curr, 0);
    return numbers.length > 0 ? (sum / numbers.length).toFixed(2) : 0;
}

module.exports = calculateAverage;
