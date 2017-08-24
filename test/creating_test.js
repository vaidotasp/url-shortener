const assert = require('assert')
const Short = require('../models/urlinstance')

describe('Creating URL instance based on params', function() {
  let srt

  beforeEach(function(done) {
    srt = new Short({
      id: 1234,
      url: 'www.example.com',
      output: 'www.shorturl.com/1234'
    })
    srt.save().then(function() {
      done()
    })
  })

  it('Finds a record of URL instance in the DB', function(done) {
    Short.findOne({ id: srt.id }).then(function(result) {
      assert(Number(result.id) === 1234)
      done()
    })
  })
})
