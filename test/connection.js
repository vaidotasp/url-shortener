const mongoose = require('mongoose')
mongoose.Promise = global.Promise


before(function(done){
  mongoose.connect(process.env.MLAB, {useMongoClient: true})
  mongoose.connection
  .once('open', function() {
    console.log('Connection is made')
    done()
  })
  .on('error', function(err){
    console.log('Connection error', err)
  })
})

beforeEach(function(done){
  mongoose.connect.collections.shorts.drop(function(){
    done()
  })
})