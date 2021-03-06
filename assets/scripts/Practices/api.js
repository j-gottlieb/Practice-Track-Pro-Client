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

const editPractice = function (practiceData, id) {
  return $.ajax({
    url: config.apiUrl + '/practices/' + id,
    method: 'PATCH',
    headers: {
      Authorization: `Token token=${store.user.token}`
    },
    data: {
      'practice': {
        'date': practiceData.date,
        'duration': practiceData.duration,
        'practice_type': practiceData.practice_type
      }
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
