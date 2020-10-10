const express = require("express");
const bodyParser = require("body-parser");
const PORT = 8000;
const cors = require("cors");
const app = express();

app.use(bodyParser.json());
app.use(cors());

const PERCENT_CHANGE = 0.05;

var tickers = [
  { name: "GATS", companyName: "Gatsby", price: 25, grade: "A+" },
  { name: "ASAN", companyName: "Asana", price: 23, grade: "A" },
  { name: "LYFT", companyName: "Lyft", price: 10, grade: "B" },
  { name: "VEEV", companyName: "Veeva", price: 20, grade: "A" },
  { name: "KODK", companyName: "Kodak", price: 14, grade: "B+" },
];

function getRandomNum(min, max) {
  return Math.random() * (max - min) + min;
}

function updateStockPrice(price) {
  price = price * (1 + getRandomNum(-PERCENT_CHANGE, PERCENT_CHANGE));
  return (Math.ceil(price * 100) / 100).toFixed(2);
}

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/", function (req, res) {
  res.send("Simple web server from " + __dirname);
});

// Return all tickers as array of ticker objects
app.get("/tickers", function (req, res) {
  updatedTickers = tickers.map(({ price, ...rest }) => ({
    ...rest,
    price: updateStockPrice(price),
  }));
  res.status(200).send(updatedTickers);
});

app.listen(PORT, function () {
  console.log("Server is running on Port: " + PORT);
});
