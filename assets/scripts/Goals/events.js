const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api.js')
const ui = require('./ui.js')
// const store = require('../store.js')

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
  event.preventDefault()
  const goalId = $(event.target).closest('section').data('id')
  const goalData = getFormFields(event.target)
  // console.log(goalId)
  api.editGoal(goalId, goalData)
    .then(ui.editGoalSuccess(onShowGoals(event)))
    .catch()
}

const addHandlers = () => {
  // this allows each book to be clickable after all the books have loaded.
  // You can't add an event for dom elements that don't exist until after the
  //  page loads.
  $('.goal_display').on('click', '.remove_button', onRemoveGoal)
  $('.goal_display').on('submit', '.edit_form', onEditGoal)
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
    .then(ui.addGoalSuccess(onShowGoals(event)))
    .catch()
}

module.exports = {
  onShowGoals,
  addHandlers,
  onRemoveGoal,
  onAddGoal,
  onEditGoal
}
