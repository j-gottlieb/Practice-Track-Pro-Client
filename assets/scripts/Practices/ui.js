const store = require('../store.js')
const showPracticesTemplate = require('../templates/practices-listing.handlebars')
const progress = require('../Goals/progress.js')

const moment = require('moment')
const MomentRange = require('moment-range')
const Moment = MomentRange.extendMoment(moment)

const progressByType = function () {
  $('#type-progress').html('')
  const practicesByType = {}
  const today = Moment()
  const weekStart = Moment().startOf('week')
  const weekRange = Moment.range(weekStart, today)
  for (let i = 0; i < store.practices.length; i++) {
    if (Moment(store.practices[i].date).within(weekRange)) {
      practicesByType[store.practices[i].practice_type] = 0
    }
  }
  for (let i = 0; i < store.practices.length; i++) {
    if (Moment(store.practices[i].date).within(weekRange)) {
      practicesByType[store.practices[i].practice_type] += store.practices[i].duration
    }
  }
  for (const key in practicesByType) {
    if (key) {
      $('#type-progress').append(`${key}: <span style='color:#013a4f'>${practicesByType[key]}</span>    `)
    }
  }
}

const showPracticesSuccess = function (response) {
  store.practices = response.practices
  const showPracticesHtml = showPracticesTemplate({ practices: response.practices })
  if (response.practices.length > 0) {
    $('.practice_display').html(showPracticesHtml)
  } else {
    $('.practice_display').html("You haven't practiced yet! What would your mother say...")
  }
  progress.getProgresses()
  progressByType()
}

const removePracticeSuccess = () => {
  $('#remove-practice-alert').removeClass('hidden')
  $('#remove-practice-alert').fadeTo(2000, 500).slideUp(500, function () {
    $('#remove-practice-alert').slideUp(500)
  })
}

const editPracticeSuccess = (response) => {
  store.practices.pop()
  store.practices.push(response.practice)
  $('#edit-practice-alert').removeClass('hidden')
  $('#edit-practice-alert').fadeTo(2000, 500).slideUp(500, function () {
    $('#edit-practice-alert').slideUp(500)
  })
}

const newPracticeSuccess = () => {
  $('#new-practice-alert').removeClass('hidden')
  $('#new-practice-alert').fadeTo(2000, 500).slideUp(500, function () {
    $('#new-practice-alert').slideUp(500)
  })
  $('#add-practice-form').trigger('reset')
  // progress.getProgresses()
}
module.exports = {
  showPracticesSuccess,
  removePracticeSuccess,
  editPracticeSuccess,
  newPracticeSuccess
}
