const express = require('express');
const app = express();
const port = 3000; // Change this port number if needed

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Route to handle the form submission and calculate wages
app.post('/calculate', (req, res) => {
  const hourlyRate = parseFloat(req.body.hourlyRate);
  const hoursWorked = parseFloat(req.body.hoursWorked);

  // Perform wage calculations
  let regularPay, overtimePay, totalPay;

  if (hoursWorked <= 40) {
    regularPay = hourlyRate * hoursWorked;
    overtimePay = 0;
    totalPay = regularPay;
  } else if (hoursWorked <= 50) {
    regularPay = hourlyRate * 40;
    overtimePay = hourlyRate * 1.5 * (hoursWorked - 40);
    totalPay = regularPay + overtimePay;
  } else if (hoursWorked <= 60) {
    regularPay = hourlyRate * 40;
    overtimePay = hourlyRate * 1.5 * 10 + hourlyRate * 2 * (hoursWorked - 50);
    totalPay = regularPay + overtimePay;
  } else {
    regularPay = hourlyRate * 40;
    overtimePay =
      hourlyRate * 1.5 * 10 + hourlyRate * 2 * 10 + hourlyRate * 2.5 * (hoursWorked - 60);
    totalPay = regularPay + overtimePay;
  }

  // Send the results back to the front-end
  res.send({
    regularPay,
    overtimePay,
    totalPay,
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
