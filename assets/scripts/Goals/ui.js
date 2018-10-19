const store = require('../store.js')
// const showGoalsTemplate = require('../templates/goals-listing.handlebars')

const showGoalsSuccess = function (response) {
  store.goals = response.goals
  // console.log(store.goals)
  // progress.showProgress()
  // const showGoalsHtml = showGoalsTemplate({ goals: response.goals })
  // if (response.goals.length > 0) {
  //   $('.goal_display').html(showGoalsHtml)
  // } else {
  //   $('.goal_display').html("You haven't your goals yet, ya bastard!")
  // }
}

const removeGoalSuccess = () => {
  $(event.target.getAttribute('data-id')).empty()
}

const editGoalSuccess = (response) => {
  store.goals.pop()
  store.goals.push(response.goal)
  $('.edit-goal-form').trigger('reset')
}

const addGoalSuccess = (response) => {
  store.goals = response.goals
  $('#add-goal-form').trigger('reset')
}

module.exports = {
  showGoalsSuccess,
  removeGoalSuccess,
  editGoalSuccess,
  addGoalSuccess
}
