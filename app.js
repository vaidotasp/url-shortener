/*
TODO:
 - Figure out the .env issue so I can hide the path
 - Use mongoose-unique-validator to ipmrove the schema so that short urls are unique
*/
const express = require('express')
const app = express()
const Short = require(__dirname + '/models/urlinstance')
const mongoose = require('mongoose')
const helper = require(__dirname + '/modules/helper.js')
const shortid = require('shortid')
mongoose.Promise = global.Promise
app.use(express.static('public'))

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
  let newId = req.params.id
  Short.findOne({ id: newId }, function(err, result) {
    if (err) return err
    res.redirect(result.url)
  })
})

//This should handle the new URL-Short requests only
app.get('/new/:url*', function(req, res) {
  mongoose.connect('mongodb://shorturl:whyme@ds157712.mlab.com:57712/url', {
    useMongoClient: true
  })
  let newUrl = helper.Normalize(req.params)
  if (!newUrl) {
    throw new Error(newUrl)
  }
  Short.findOne({ url: newUrl }, function(err, result) {
    if (err) console.log(err)
    if (result === null) {
      //creating a new instance -- should probably check if id exists or not
      let newEntry = new Short({
        id: shortid.generate(),
        url: newUrl
      })
      //saving newly created instance
      newEntry
        .save(function(err) {
          if (err) console.log('Error: ', err)
        })
        .then(function() {
          let output = {
            original_url: newEntry.url,
            short_url: 'https://vp-url-short.herokuapp.com/' + newEntry.id
          }
          res.send(output)
        })
    } else {
      //Handle if URL already exists in DB
      console.log('url is found', result.url)
      let output = {
        original_url: result.url,
        short_url: 'https://vp-url-short.herokuapp.com/' + result.id
      }
      res.send(output)
    }
  })
})

app.listen(process.env.PORT || 3000)
