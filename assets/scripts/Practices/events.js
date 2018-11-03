const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api.js')
const ui = require('./ui.js')
const store = require('../store.js')
const progress = require('../Goals/progress.js')
const showPracticesTemplate = require('../templates/practices-listing.handlebars')

const onRemovePractice = function (event) {
  event.preventDefault()
  const practiceId = $(event.target).closest('section').data('id')
  api.removePractice(practiceId)
    .then(() => onShowPractices(event))
    .then(ui.removePracticeSuccess)
    .then(progress.getProgresses)
    .catch(ui.removePracticeFailure)
}

const onEditPractice = function (event) {
  let practice
  for (let i = 0; i < store.practices.length; i++) {
    if (store.practices[i].id === $(event.target).closest('section').data('id')) {
      practice = store.practices[i]
    }
  }
  event.preventDefault()
  if (getFormFields(event.target).date) {
    practice.date = getFormFields(event.target).date
  }
  if (getFormFields(event.target).duration) {
    practice.duration = parseInt(getFormFields(event.target).duration, 10)
  }
  if (getFormFields(event.target).practice_type) {
    practice.practice_type = getFormFields(event.target).practice_type
  }
  if (getFormFields(event.target).date === '' && getFormFields(event.target).duration === '' && getFormFields(event.target).practice_type === '') {
    $('#fail-practice-alert').removeClass('hidden')
    $('#fail-practice-alert').fadeTo(2000, 500).slideUp(500, function () {
      $('#fail-practice-alert').slideUp(500)
    })
    return
  }
  const id = practice.id
  const practiceData = practice
  api.editPractice(practiceData, id)
    .then(() => onShowPractices(event))
    .then(ui.editPracticeSuccess)
    .then(progress.getProgresses)
    .catch()
  $('.edit_form').trigger('reset')
}

const addHandlers = () => {
  // this allows each book to be clickable after all the books have loaded.
  // You can't add an event for dom elements that don't exist until after the
  //  page loads.
  $('.practice_display').on('click', '.remove_button', onRemovePractice)
  $('.practice_display').on('submit', '.edit_form', onEditPractice)
}

const onShowPractices = function (event) {
  api.showPractices()
    .then(ui.showPracticesSuccess)
    .catch()
}

const onAddPractice = function (event) {
  event.preventDefault()
  const practiceData = getFormFields(event.target)
  api.addPractice(practiceData)
    .then(() => onShowPractices(event))
    .then(ui.newPracticeSuccess)
    .then(progress.getProgresses)
    .catch()
  $('#add-practice-form').trigger('reset')
  $('#add-practice-btn').dropdown('toggle')
}

const onSearchPractices = function (event) {
  event.preventDefault()
  const practices = store.practices
  const queriedPractices = []
  for (let i = 0; i < practices.length; i++) {
    if (practices[i].practice_type === getFormFields(event.target).practice_type) {
      queriedPractices.push(practices[i])
    }
  }
  const showPracticesHtml = showPracticesTemplate({ practices: queriedPractices })
  if (queriedPractices.length > 0) {
    $('.practice_display').html(showPracticesHtml)
  } else {
    $('.practice_display').html("You haven't practiced yet! What would your mother say...")
  }
}

const onViewDuration = function (event) {
  event.preventDefault()
  const startDate = getFormFields(event.target).start_date
  const endDate = getFormFields(event.target).end_date
  const type = getFormFields(event.target).practice_type
  const duration = progress.rangeDurationTypeQuery(startDate, endDate, type)
  $('#range-duration-display').html(duration)
}

module.exports = {
  onShowPractices,
  addHandlers,
  onRemovePractice,
  onAddPractice,
  onEditPractice,
  onSearchPractices,
  onViewDuration
}
