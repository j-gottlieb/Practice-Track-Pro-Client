const store = require('../store.js')
const showPracticesTemplate = require('../templates/practices-listing.handlebars')

const showPracticesSuccess = function (response) {
  console.log(response)
  const showPracticesHtml = showPracticesTemplate({ practices: response.practices })
  $('.practice_display').html(showPracticesHtml)
}

const removePracticeSuccess = () => {
  $(event.target.getAttribute('data-id')).empty()
}

module.exports = {
  showPracticesSuccess,
  removePracticeSuccess
}
