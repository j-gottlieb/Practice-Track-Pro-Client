const config = require('../config.js')
const store = require('../store.js')

const showGoals = function () {
  return $.ajax({
    url: config.apiUrl + '/goals',
    method: 'GET',
    headers: {
      Authorization: `Token token=${store.user.token}`
    }
  })
}

const removeGoal = function (goalId) {
  return $.ajax({
    url: config.apiUrl + '/goals/' + goalId,
    method: 'DELETE',
    headers: {
      Authorization: `Token token=${store.user.token}`
    }
  })
}

const editGoal = function (goalData) {
  return $.ajax({
    url: config.apiUrl + '/goals/' + goalData.id,
    method: 'PATCH',
    headers: {
      Authorization: `Token token=${store.user.token}`
    },
    data: {
      'goal': {
        'daily': goalData.daily,
        'weekly': goalData.weekly,
        'monthly': goalData.monthly
      }
    }
  })
}

const addGoal = function (goalData) {
  return $.ajax({
    url: config.apiUrl + '/goals',
    method: 'POST',
    headers: {
      Authorization: `Token token=${store.user.token}`
    },
    data: {
      'goal': goalData
    }
  })
}

module.exports = {
  showGoals,
  removeGoal,
  addGoal,
  editGoal
}
