const store = require('../store.js')
const showPracticesTemplate = require('../templates/practices-listing.handlebars')
const progress = require('../Goals/progress.js')

const showPracticesSuccess = function (response) {
  store.practices = response.practices
  // console.log(response)
  const showPracticesHtml = showPracticesTemplate({ practices: response.practices })
  if (response.practices.length > 0) {
    $('.practice_display').html(showPracticesHtml)
  } else {
    $('.practice_display').html("You haven't practiced yet! What would your mother say...")
  }
}

const removePracticeSuccess = () => {
  $(event.target.getAttribute('data-id')).empty()
}

const editPracticeSuccess = () => {
}

const addPracticeSuccess = () => {
  $('#add-practice-form').trigger('reset')
  progress.getProgresses()
}
module.exports = {
  showPracticesSuccess,
  removePracticeSuccess,
  editPracticeSuccess,
  addPracticeSuccess
}
