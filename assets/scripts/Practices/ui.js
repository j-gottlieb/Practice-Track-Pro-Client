const store = require('../store.js')
const showPracticesTemplate = require('../templates/practices-listing.handlebars')

const showPracticesSuccess = function (response) {
  // console.log(response)
  const showPracticesHtml = showPracticesTemplate({ practices: response.practices })
  $('.practice_display').html(showPracticesHtml)
}

const removePracticeSuccess = (callback) => {
  $(event.target.getAttribute('data-id')).empty()
  callback()
}

const editPracticeSuccess = () => {
  $('.edit_form').trigger('reset')
}
module.exports = {
  showPracticesSuccess,
  removePracticeSuccess,
  editPracticeSuccess
}
