const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api.js')
const ui = require('./ui.js')
// const store = require('../store.js')

const onShowPractices = function (event) {
  event.preventDefault()
  // const credentials = getFormFields(event.target)
  api.showPractices()
    .then(ui.showPracticesSuccess)
    .catch(console.log)
}

module.exports = {
  onShowPractices
}
