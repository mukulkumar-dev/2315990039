const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// POST endpoint to calculate average
app.post('/average', (req, res) => {
  const numbers = req.body.numbers;

  if (!Array.isArray(numbers) || numbers.length === 0) {
    return res.status(400).json({ error: 'Please provide a valid array of numbers' });
  }

  let sum = 0;
  for (let num of numbers) {
    if (typeof num !== 'number') {
      return res.status(400).json({ error: 'Array must contain only numbers' });
    }
    sum += num;
  }

  const average = sum / numbers.length;
  res.json({ average });
});

// ✅ Fixed console.log with backticks
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
