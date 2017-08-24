
exports.Normalize = function urlNormalizer(params){
    let inputUrl = params['url'] + params['0']
    if(inputUrl[0] === 'w') {
      inputUrl = 'http://' + inputUrl
    }
    //do the regex thing here
   const re = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/
   if (inputUrl.match(re) === null){
     return false
   } else {
     return inputUrl
   }
}
  

  // let inputUrl = req.params['url'] + req.params['0']
  // function normalizeUrl(input) {
  //   if (input[0] === 'w') {
  //     return 'http://' + input
  //   }
  //   return input
  // }