const mongoose = require('mongoose')

let db = mongoose.connect('mongodb://shorturl:whyme@ds157712.mlab.com:57712/url', {
    useMongoClient: true
  })

module.exports = db