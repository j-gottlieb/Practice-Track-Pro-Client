const store = require('../store.js')
const showPracticesTemplate = require('../templates/practices-listing.handlebars')
const progress = require('../Goals/progress.js')

const showPracticesSuccess = function (response) {
  store.practices = response.practices
  const showPracticesHtml = showPracticesTemplate({ practices: response.practices })
  if (response.practices.length > 0) {
    $('.practice_display').html(showPracticesHtml)
  } else {
    $('.practice_display').html("You haven't practiced yet! What would your mother say...")
  }
}

const removePracticeSuccess = () => {
  console.log('deleting')
  $('#remove-practice-alert').removeClass('hidden')
  $('#remove-practice-alert').fadeTo(2000, 500).slideUp(500, function () {
    $('#remove-practice-alert').slideUp(500)
  })
  // $(event.target.getAttribute('data-id')).empty()
}

const editPracticeSuccess = () => {
  console.log('yo')
  $('#edit-practice-alert').removeClass('hidden')
  $('#edit-practice-alert').fadeTo(2000, 500).slideUp(500, function () {
    $('#edit-practice-alert').slideUp(500)
  })
}

const newPracticeSuccess = () => {
  $('#new-practice-alert').removeClass('hidden')
  $('#new-practice-alert').fadeTo(2000, 500).slideUp(500, function () {
    $('#new-practice-alert').slideUp(500)
  })
  $('#add-practice-form').trigger('reset')
  // progress.getProgresses()
}
module.exports = {
  showPracticesSuccess,
  removePracticeSuccess,
  editPracticeSuccess,
  newPracticeSuccess
}
