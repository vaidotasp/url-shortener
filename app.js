/*
TODO:
 - Figure out the .env issue so I can hide the path
 - Use shortid pkg to genera unique short url ids
 - Use mongoose-unique-validator to ipmrove the schema so that short urls are unique
*/
const express = require('express')
const app = express()
const Short = require(__dirname + '/models/urlinstance')
const mongoose = require('mongoose')
mongoose.Promise = global.Promise
app.use(express.static('public'))
//REGEX for URL validation
const re = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html', function(err) {
    if (err) throw err
  })
})

//this should handle the redirect of the short URL id only
app.get('/:id', function(req, res) {
  mongoose.connect('mongodb://shorturl:whyme@ds157712.mlab.com:57712/url', {
    useMongoClient: true
  })
  let newId = Number(req.params.id)
  Short.findOne({ id: newId }, function(err, result) {
    if (err) return err
    res.redirect(result.output)
  })
})

//This should handle the new URL-Short requests only
app.get('/new/:url*', function(req, res) {
  mongoose.connect('mongodb://shorturl:whyme@ds157712.mlab.com:57712/url', {
    useMongoClient: true
  })
  let inputUrl = req.params['url'] + req.params['0']
  function normalizeUrl(input) {
    if (input[0] === 'w') {
      return 'http://' + input
    }
    return input
  }

  if (inputUrl.match(re) === null) {
    throw new Error(inputUrl)
  } else {
    let newUrl = normalizeUrl(inputUrl)
    Short.findOne({ url: inputUrl }, function(err, result) {
      if (err) console.log(err)
      if (result === null) {
        console.log('url is not found...')
        //creating a new instance -- should probably check if id exists or not
        let newEntry = new Short({
          id: Math.floor(1000 + Math.random() * 9000),
          url: newUrl,
          output: 'https://vp-url-short.herokuapp.com/' + String(this.id)
        })
        //saving newly created instance
        newEntry
          .save(function(err) {
            if (err) console.log('Error: ', err)
          })
          .then(function() {
            let output = {
              original_url: newEntry.url,
              short_url: newEntry.output
            }
            res.send(output)
          })
      } else {
        //Handle if URL already exists in DB
        console.log('url is found', result.url)
        let output = {
          original_url: result.url,
          short_url: result.output
        }
        res.send(output)
      }
    })
  }
})

app.listen(process.env.PORT || 8080)
