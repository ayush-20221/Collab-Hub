const mongoose = require("mongoose");

const Doc = new mongoose.Schema({
  _id: String,
  html: String,
  css: String,
  js: String,
  python: String,
  cpp: String,
  java: String,
  js: String,
  pascal: String,
  perl: String,
  php: String,
  ruby: String,
  input: String,
  output: String,
});

module.exports = mongoose.model("Doc", Doc);
