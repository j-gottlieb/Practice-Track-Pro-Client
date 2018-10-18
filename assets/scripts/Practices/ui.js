const store = require('../store.js')
const showPracticesTemplate = require('../templates/practices-listing.handlebars')

const showPracticesSuccess = function (response) {
  // console.log(response)
  const showPracticesHtml = showPracticesTemplate({ practices: response.practices })
  if (response.practices.length > 0) {
    $('.practice_display').html(showPracticesHtml)
  } else {
    $('.practice_display').html("You haven't practiced yet, ya bastard!")
  }
}

const removePracticeSuccess = (callback) => {
  $(event.target.getAttribute('data-id')).empty()
  callback()
}

const editPracticeSuccess = () => {
  $('.edit_form').trigger('reset')
}

const addPracticeSuccess = () => {
  $('#add-practice-form').trigger('reset')
}
module.exports = {
  showPracticesSuccess,
  removePracticeSuccess,
  editPracticeSuccess,
  addPracticeSuccess
}
