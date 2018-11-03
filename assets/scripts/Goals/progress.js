// pull in goals response
const ProgressBar = require('progressbar.js')
const store = require('../store.js')
const moment = require('moment')
const MomentRange = require('moment-range')
const Moment = MomentRange.extendMoment(moment)

// Declare variables to contain various ranges
const weekStart = Moment().startOf('week')
const monthStart = Moment().startOf('month')
const today = Moment()
const monthRange = Moment.range(monthStart, today)
const weekRange = Moment.range(weekStart, today)

// Get total practice from the start of the month
const monthDuration = () => {
  let result = 0
  store.practices.forEach((day) => {
    if (Moment(day.date).within(monthRange)) {
      result += day.duration
    }
  })
  return result
}

// Get total practice from the start of the week (sunday)
const weekDuration = () => {
  let result = 0
  store.practices.forEach((day) => {
    if (Moment(day.date).within(weekRange)) {
      result += day.duration
    }
  })
  return result
}

// Get today's practice
const todayDuration = () => {
  let result = 0
  store.practices.forEach((day) => {
    if (Moment(day.date) === today) {
      result += day.duration
    }
  })
  return result
}

// Get practice duration given the user's range input
const rangeDurationTypeQuery = (start, end, type) => {
  const range = Moment.range(Moment(start), Moment(end))
  let result = 0
  store.practices.forEach((day) => {
    if (Moment(day.date).within(range) && day.practice_type === type) {
      result += day.duration
    }
  })
  return result
}

// Get total all-time practice
const totalPractice = () => {
  let total = 0
  store.practices.forEach(function (practice) {
    total += practice.duration
  })
  return total
}

const showProgress = function (progress, location) {
  // this function takes in practice duration, compares it to the goal and
  // animates a progress bar in the browser
  const bar = new ProgressBar.SemiCircle(location, {
    strokeWidth: 6,
    color: '#FFEA82',
    trailColor: '#eee',
    trailWidth: 1,
    easing: 'easeInOut',
    duration: 1400,
    svgStyle: null,
    text: {
      value: '',
      alignToBottom: false
    },
    from: {color: '#FFEA82'},
    to: {color: '#01a32a'},
    // Set default step function for all animate calls
    step: (state, bar) => {
      bar.path.setAttribute('stroke', state.color)
      const value = Math.round(bar.value() * 100) + '%'
      if (value === 0) {
        bar.setText('')
      } else {
        bar.setText(value)
      }
      bar.text.style.color = state.color
    }
  })
  bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif'
  bar.text.style.fontSize = '.8rem'
  bar.animate(progress)
}

const getProgresses = () => {
  // console.log(store.practices)
  // console.log(totalPractice())
  const totalProgress = Math.round(100 * (totalPractice() / (100 * 60))) / 100
  // console.log(totalProgress)
  $('#total-progress').css('width', 0 + '%').attr('aria-valuenow', 0)
  $('#total-progress').html(0 + '%')
  $('#total-progress').css('width', totalProgress + '%').attr('aria-valuenow', totalProgress)
  $('#total-progress').html(totalProgress + '%')
  // showTotal(totalProgress, '#total-progress')
  const message = function (progress, id) {
    if (progress >= 0 && progress < 0.5) {
      $(id).html('Get to work!')
    } else if (progress >= 0.5 && progress < 1) {
      $(id).html('Getting close!')
    } else if (progress >= 1 && progress < 1.2) {
      $(id).html('Nailed it!')
    } else {
      $(id).html('Slow down!')
    }
  }
  if (store.goals[0] === undefined) {
    $('.dash_message').css('color', 'red')
    $('.dash_message').text('Set goals above to view your progress!')
  } else if (store.practices[0] === undefined) {
    $('.dash_message').css('color', 'red')
    $('.dash_message').text("You haven't practiced yet!")
  } else {
    $('.dash_message').text('')
    $('.goal_daily, .goal_weekly, .goal_monthly').html('')
    const dailyProgress = (todayDuration() / store.goals[0].daily)
    const weeklyProgress = (weekDuration() / store.goals[0].weekly)
    const monthlyProgress = (monthDuration() / store.goals[0].monthly)
    if (store.goals[0].daily) {
      $('#daily-goal').html(`${store.goals[0].daily} mins`)
    }
    if (store.goals[0].weekly) {
      $('#weekly-goal').html(`${store.goals[0].weekly} mins`)
    }
    if (store.goals[0].monthly) {
      $('#monthly-goal').html(`${store.goals[0].monthly} mins`)
    }
    showProgress(dailyProgress, '.goal_daily')
    message(dailyProgress, '#daily_message')
    showProgress(weeklyProgress, '.goal_weekly')
    message(weeklyProgress, '#weekly_message')
    showProgress(monthlyProgress, '.goal_monthly')
    message(monthlyProgress, '#monthly_message')
    $('.progress_dash, .refresh_progress_btn').removeClass('hidden')
  }
}

module.exports = {
  getProgresses,
  rangeDurationTypeQuery
}
