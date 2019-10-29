"use strict";

var express = require("express");
var cors = require("cors");

// require and use "multer"...
var multer = require("multer");
var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

var app = express();

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function(req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.get("/hello", function(req, res) {
  res.json({ greetings: "Hello, API" });
});

app.post("/api/fileanalyse", upload.single("upfile"), (req, res, next) => {
  const file = req.file;
  // console.log('file', file);
  const result = {
    name: file.originalname,
    type: file.mimetype,
    size: file.size
  };

  res.send(result);
});

const port = process.env.PORT || 3333;
app.listen(port, function() {
  console.log(`Node.js listening on port ${port}...`);
});
