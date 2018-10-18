const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api.js')
const ui = require('./ui.js')
// const store = require('../store.js')

const onRemovePractice = function (event) {
  event.preventDefault()
  const practiceId = $(event.target).closest('section').data('id')
  console.log(practiceId)
  if (confirm('Are you sure you want to delete this practice?')) {
    api.removePractice(practiceId)
      .then(() => onShowPractices(event))
      .catch(ui.removePracticeFailure)
  }
}

const addHandlers = () => {
  // this allows each book to be clickable after all the books have loaded.
  // You can't add an event for dom elements that don't exist until after the
  //  page loads.
  $('.practice_display').on('click', 'button', onRemovePractice)
}

const onShowPractices = function (event) {
  event.preventDefault()
  // const credentials = getFormFields(event.target)
  api.showPractices()
    .then(ui.showPracticesSuccess)
    .catch(console.log)
}

module.exports = {
  onShowPractices,
  addHandlers,
  onRemovePractice
}
