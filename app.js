const express = require('express');
const mongodb = require('mongodb');

const app = express();
//REGEX for URL validation
const re = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

let data = [];

function NewUrl(id, original, output) {
  this.id = id;
  this.original = original;
  this.output = 'static' + this.id;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

app.get('/', function (req, res) {
  res.send('works');
})

app.get('/new/:url*', function (req, res) {
  let inputUrl = req.params['url'] + req.params['0'];
  //perform validation of URL
  if (inputUrl.match(re) === null) {
    throw new Error(inputUrl);
  } else {
    console.log(getRandomInt(0, 4))
    res.send(inputUrl);
  }
})

app.listen(3000);