const mongoose = require('mongoose')
const Short = require(__dirname + '/models/urlinstance')
const shortid = require('shortid')

exports.Normalize = function urlNormalizer(params) {
  let inputUrl = params['url'] + params['0']
  if (inputUrl[0] === 'w') {
    inputUrl = 'http://' + inputUrl
  }
  //do the regex thing here
  const re = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/
  if (inputUrl.match(re) === null) {
    return false
  } else {
    return inputUrl
  }
}

exports.SaveEntry = function(newUrl) {
  mongoose.connect('mongodb://shorturl:whyme@ds157712.mlab.com:57712/url', {
    useMongoClient: true
  })
  let newEntry = new Short({
    id: shortid.generate(),
    url: newUrl
  })
  newEntry
    .save(function(err) {
      if (err) console.log('Save Error', err)
    })
    .then(function() {
      let output = {
        original_url: newEntry.url,
        short_url: 'https://vp-url-short.herokuapp.com/' + newEntry.id
      }
      return output
    })
}
