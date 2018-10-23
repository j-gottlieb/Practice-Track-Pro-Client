const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api.js')
const ui = require('./ui.js')
const progress = require('./progress.js')
const store = require('../store.js')

const onRemoveGoal = function (event) {
  event.preventDefault()
  const goalId = $(event.target).closest('section').data('id')
  if (confirm('Are you sure you want to delete this goal?')) {
    api.removeGoal(goalId)
      .then(() => onShowGoals(event))
      .catch(ui.removeGoalFailure)
  }
}

const onUpdateGoal = function (event) {
  event.preventDefault()
  if (store.goals[0] !== undefined) {
    onEditGoal(event)
  } else {
    onAddGoal(event)
  }
}

const onEditGoal = function (event) {
  event.preventDefault()
  if (getFormFields(event.target).daily) {
    store.goals[0].daily = getFormFields(event.target).daily
  }
  if (getFormFields(event.target).weekly) {
    store.goals[0].weekly = getFormFields(event.target).weekly
  }
  if (getFormFields(event.target).monthly) {
    store.goals[0].monthly = getFormFields(event.target).monthly
  }
  const goalData = store.goals[0]
  api.editGoal(goalData)
    .then(ui.editGoalSuccess)
    .catch()
  $('#add-goal-form').trigger('reset')
}

const onViewGoals = function () {
  if (store.goals[0] === undefined) {
    $('#add-goal-form').removeClass('hidden')
  } else if (store.goals[0].daily !== null) {
    $('#edit-goal-form').removeClass('hidden')
  }
}

const onShowGoals = function () {
  api.showGoals()
    .then(ui.showGoalsSuccess)
    .catch()
}

const onAddGoal = function (event) {
  event.preventDefault()
  const goalData = getFormFields(event.target)
  api.addGoal(goalData)
    .then(ui.addGoalSuccess)
    .catch()
}

const addHandlers = () => {
  // this allows each book to be clickable after all the books have loaded.
  // You can't add an event for dom elements that don't exist until after the
  //  page loads.
  $('#add-goal-form').on('submit', onUpdateGoal)
  $('#view-goals-btn').on('click', onViewGoals)
  $('.display_progress_btn, .refresh_progress_btn').on('click', progress.getProgresses)
}

module.exports = {
  onShowGoals,
  addHandlers,
  onRemoveGoal,
  onAddGoal,
  onEditGoal
}
