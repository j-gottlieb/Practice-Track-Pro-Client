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

module.exports = {
  showPractices
}
