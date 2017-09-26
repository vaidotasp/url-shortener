# URL Shortener Microservice - FreeCodeCamp Challenge

https://vp-url-short.herokuapp.com/

## Specification
* API accepts any valid URL and provides a shortener version in JSON that can be used to redirect
* Providing already shortener URL will redirect to the original URL

## Project built using:
* Vanilla JS
* Node
* Express
* MongoDB/Mongoose

## Tests done with Mocha:
`npm test`

### Example Input   
`https://vp-url-short.herokuapp.com/new/https://www.google.com`
`https://vp-url-short.herokuapp.com//new/www.bing.com`
### Example output:
`{ "original_url":"http://facebook.com", "short_url":"https://vp-url-short.herokuapp.com/ryHQRG0_Z" }`
### Usage
`https://vp-url-short.herokuapp.com/ryHQRG0_Z`
### Redirects to:
`http://www.facebook.com`
    
