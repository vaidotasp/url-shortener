const mongoose = require('mongoose')
mongoose.Promise = global.Promise

beforeEach(function(done) {
  mongoose.connection.collections.shorts.drop(function() {
    done()
  })
})

before(function(done) {
  mongoose.connect('mongodb://shorturl:whyme@ds157712.mlab.com:57712/url', {
    useMongoClient: true
  })
  mongoose.connection
    .once('open', function() {
      console.log('Connection is made')
      done()
    })
    .on('error', function(err) {
      console.log('Connection error', err)
    })
})
