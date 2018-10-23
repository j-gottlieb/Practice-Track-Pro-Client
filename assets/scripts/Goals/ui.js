const store = require('../store.js')

const showGoalsSuccess = function (response) {
  store.goals = response.goals
}

const removeGoalSuccess = () => {
  $(event.target.getAttribute('data-id')).empty()
}

const editGoalSuccess = (response) => {
  store.goals.pop()
  store.goals.push(response.goal)
  $('#new-goal-alert').removeClass('hidden')
  $('#new-goal-alert').fadeTo(2000, 500).slideUp(500, function () {
    $('#new-goal-alert').slideUp(500)
  })
  $('.edit-goal-form').trigger('reset')
  $('#add-goal-btn').dropdown('toggle')
}

const addGoalSuccess = (response) => {
  store.goals.push(response.goal)
  $('#new-goal-alert').removeClass('hidden')
  $('#new-goal-alert').fadeTo(2000, 500).slideUp(500, function () {
    $('#new-goal-alert').slideUp(500)
  })
  $('#add-goal-form').trigger('reset')
  $('#add-goal-btn').dropdown('toggle')
}

module.exports = {
  showGoalsSuccess,
  removeGoalSuccess,
  editGoalSuccess,
  addGoalSuccess
}
