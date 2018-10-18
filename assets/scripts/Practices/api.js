const config = require('../config.js')
const store = require('../store.js')

const showPractices = function () {
  return $.ajax({
    url: config.apiUrl + '/practices',
    method: 'GET',
    headers: {
      Authorization: `Token token=${store.user.token}`
    }
  })
}

const removePractice = function (practiceId) {
  return $.ajax({
    url: config.apiUrl + '/practices/' + practiceId,
    method: 'DELETE',
    headers: {
      Authorization: `Token token=${store.user.token}`
    }
  })
}

const editPractice = function (practiceId, practiceData) {
  return $.ajax({
    url: config.apiUrl + '/practices/' + practiceId,
    method: 'PATCH',
    headers: {
      Authorization: `Token token=${store.user.token}`
    },
    data: {
      'practice': practiceData
    }
  })
}

const addPractice = function (practiceData) {
  return $.ajax({
    url: config.apiUrl + '/practices',
    method: 'POST',
    headers: {
      Authorization: `Token token=${store.user.token}`
    },
    data: {
      'practice': practiceData
    }
  })
}

module.exports = {
  showPractices,
  removePractice,
  addPractice,
  editPractice
}
