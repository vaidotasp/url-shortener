const express = require('express')
const app = express()
const Short = require(__dirname + '/models/urlinstance')
const mongoose = require('mongoose')
mongoose.Promise = global.Promise
//REGEX for URL validation
const re = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/

app.get('/', function(req, res) {
  //creates a mock data collection
  // mongoose.connect('mongodb://shorturl:whyme@ds157712.mlab.com:57712/url', {
  //   useMongoClient: true
  // })
  // let srt = new Short({
  //   id: Math.floor(1000 + Math.random() * 9000),
  //   url: 'www.wooopy.com',
  //   output: 'https://vp-url-short.herokuapp.com/' + '333ID'
  // })
  // srt.save(function(err) {
  //   if (err) return err
  //   console.log('Saved probably?')
  //   //saved
  // })

  res.send('works')
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
          output: 'https://vp-url-short.herokuapp.com/' + this.id
        })
        //saving newly created instance
        newEntry.save(function(err) {
          if (err) console.log('Error: ', err)
        })
      } else {
        //Handle if URL already exists in DB
        console.log('url is found', result.url)
      }
    })
  }
})

app.listen(process.env.PORT || 3000)
