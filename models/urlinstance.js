const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ShortSchema = new Schema({
  id: String,
  url: String
})

const Short = mongoose.model('short', ShortSchema)

module.exports = Short
