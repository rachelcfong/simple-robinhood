const express = require("express");
const bodyParser = require("body-parser");
const PORT = 4000;
const cors = require("cors");
const app = express();
const axios = require("axios");

app.use(bodyParser.json());
app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/", function (req, res) {
  res.send("Simple web server from " + __dirname);
});

// Fetch array of tickers from simdaq API
app.get("/tickers", function (req, res) {
  axios
    .get("http://localhost:8000/tickers")
    .then((response) => {
      console.log("suceces", response.data);
      res.status(200).send(response.data);
    })
    .catch(function (error) {
      console.log("Error: ", error.statusText);
      res.status(400).send(JSON.stringify(error));
    });
});

app.listen(PORT, function () {
  console.log("Server is running on Port: " + PORT);
});
