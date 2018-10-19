const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api.js')
const ui = require('./ui.js')
const progress = require('./progress.js')
const store = require('../store.js')

const onRemoveGoal = function (event) {
  event.preventDefault()
  const goalId = $(event.target).closest('section').data('id')
  // console.log(goalId)
  if (confirm('Are you sure you want to delete this goal?')) {
    api.removeGoal(goalId)
      .then(() => onShowGoals(event))
      .catch(ui.removeGoalFailure)
  }
}

const onEditGoal = function (event) {
  // console.log(store.goals[0].id)
  event.preventDefault()
  // console.log(getFormFields(event.target).daily)
  if (getFormFields(event.target).daily) {
    store.goals[0].daily = getFormFields(event.target).daily
  }
  if (getFormFields(event.target).weekly) {
    store.goals[0].weekly = getFormFields(event.target).weekly
  }
  if (getFormFields(event.target).monthly) {
    store.goals[0].monthly = getFormFields(event.target).monthly
  }
  // console.log(getFormFields(event.target))
  const goalData = store.goals[0]
  // console.log(goalData.id)
  // console.log(getFormFields(event.target))
  api.editGoal(goalData)
    .then(ui.editGoalSuccess)
    .catch()
  $('#edit-goal-form').trigger('reset')
}

const onViewGoals = function () {
  // console.log(store.goals)
  if (store.goals[0] === undefined) {
    $('#add-goal-form').removeClass('hidden')
  } else if (store.goals[0].daily !== null) {
    $('#edit-goal-form').removeClass('hidden')
  }
}

const onShowGoals = function () {
  // event.preventDefault()
  // const credentials = getFormFields(event.target)
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
  $('#edit-goal-form').on('submit', onEditGoal)
  $('#add-goal-form').on('submit', onAddGoal)
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
