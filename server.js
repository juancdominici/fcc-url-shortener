require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");

// Basic Configuration
const port = process.env.PORT || 3000;
const arrayOfUrls = [];
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/public", express.static(`${process.cwd()}/public`));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// Your first API endpoint
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

//Redirects to the shortened url
app.get("/api/shorturl/:index", (req, res) => {
  const index = req.params.index;
  res.redirect(arrayOfUrls[index]);
});

//Pushes the url to the array
app.post("/api/shorturl", (req, res) => {
  try {
    console.log("Request", req.body);
    const url = req.body.url;

    //Checks if the url is valid
    if (url.includes("http://") || url.includes("https://")) {
      arrayOfUrls.push(url);
      res.json({ original_url: url, short_url: arrayOfUrls.length - 1 });
    } else {
      res.json({ error: "Invalid URL" });
    }
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
