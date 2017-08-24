const Short = require(__dirname + '/models/urlinstance')
const mongoose = require('mongoose')
mongoose.Promise = global.Promise

//Random 4 digit number generator
// function generateRandomId() {
//   return Math.floor(1000 + Math.random() * 9000)
// }

//Check if id exists and if it does, generate a new ID
// function finder() {
//   mongoose.connect('mongodb://shorturl:whyme@ds157712.mlab.com:57712/url', {
//     useMongoClient: true
//   })
//   let promise = Short.findOne({ id: '1234' })
//   promise
//     .exec()
//     .then(function(data) {
//       if (data !== null) return false
//       console.log(data)
//     })
//     .catch(function(err) {
//       console.log('error:', err)
//     })
// }
//finder()

function finderTwo(id, callback) {
  mongoose.connect('mongodb://shorturl:whyme@ds157712.mlab.com:57712/url', {
    useMongoClient: true
  })
  Short.find({ id: id }, function(err, data) {
    if (err) return err
    return callback(data)
  })
}

finderTwo(1222234, function(result) {
  console.log(result)
  console.log(result.length === 0)
  return result.length === 0
})
