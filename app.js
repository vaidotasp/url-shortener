const express = require('express')
const app = express()
//REGEX for URL validation
const re = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/



let data = [
  {
    id: 1234,
    url: 'www.example.com',
    output: 'http://www.google.com' //important to use http:// for the redirect to work
  },
  {
    id: 1999,
    url: 'www.google.com',
    output: 'www.url-short.com/1999'
  }
]

function NewUrl(url) {
  this.id = Math.floor(1000 + Math.random() * 9000)
  this.url = url
  this.output = 'static/' + this.id
}

app.get('/', function(req, res) {
  res.send('works')
})

//this should handle the redirect of the short URL id only
app.get('/:id', function(req, res) {
  for (let i = 0; i < data.length; i++) {
    if (data[i].id === Number(req.params.id)) {
      res.redirect(data[i].output) //important to use http:// for the redirect to work
    }
  }
})

//This should handle the new URL-Short requests only
app.get('/new/:url*', function(req, res) {
  let inputUrl = req.params['url'] + req.params['0']

  //perform validation of URL
  if (inputUrl.match(re) === null) {
    throw new Error(inputUrl)
  } else {
    //check if url is already existing in DB
    for (let i = 0; i < data.length; i++) {
      if (data[i].url === inputUrl) {
        console.log('url already exists, here is the original output')
        res.send(data[i].output)
        break
      } else if (inputUrl !== data[i].url && i === data.length - 1) {
        console.log('url does not exist, we will have to create one')
        let o = new NewUrl(inputUrl)
        console.log('object created')
        data.push(o)
        res.send(data[i].output)
        break
      }
    }
    console.log(JSON.stringify(data))
  }
})

app.listen(process.env.PORT)
