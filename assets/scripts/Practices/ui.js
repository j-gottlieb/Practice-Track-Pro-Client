const store = require('../store.js')
const showPracticesTemplate = require('../templates/practices-listing.handlebars')

const showPracticesSuccess = function (response) {
  console.log(response)
  const showPracticesHtml = showPracticesTemplate({ practices: response.practices })
  $('.practices').html(showPracticesHtml)
}

module.exports = {
  showPracticesSuccess
}
