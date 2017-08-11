const express = require('express');
const mongodb = require('mongodb');

const app = express();
//REGEX for URL validation
const re = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

app.get('/', function (req, res) {
  res.send('works');
})

app.get('/new/:url*', function (req, res) {
  let inputUrl = req.params['url'] + req.params['0'];
  //perform validation of URL
  if (inputUrl.match(re) === null) {
    throw new Error(inputUrl);
  } else {
    res.send(inputUrl);
  }
})

app.listen(3000);