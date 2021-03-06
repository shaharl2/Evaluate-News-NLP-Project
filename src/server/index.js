const dotenv = require("dotenv");
dotenv.config();
var path = require("path");
const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const mockAPIResponse = require("./mockAPI.js");
const apikey = process.env.API_KEY;

const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.use(express.static("dist"));

console.log(`Your API key is ${process.env.API_KEY}`);

console.log(__dirname);

app.get("/", function (req, res) {
  res.sendFile("dist/index.html");
});

// designates what port the app will listen to for incoming requests
app.listen(8088, function () {
  console.log("Example app listening on port 8088!");
});

app.get("/test", function (req, res) {
  res.send(mockAPIResponse);
});

app.post("/test", async function (req, res) {
  const data = await fetch(
    `https://api.meaningcloud.com/sentiment-2.1?key=${apikey}&url=${req.body.url}&lang=en`
  );

  try {
    const newData = await data.json();
    res.send(newData);
    console.log(newData);
  } catch (error) {
    console.log("error", error);
  }
});
