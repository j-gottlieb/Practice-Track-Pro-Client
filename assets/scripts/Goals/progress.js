// pull in goals response
const ProgressBar = require('progressbar.js')
const store = require('../store.js')
const moment = require('moment')
moment().format()

// create new function that takes daily/weekly/monthly goals
// parse data from db to create a number to pass to showProgress

// this adds a subtract days property to the Date prototype
Date.prototype.subtractDays = function(days) {
  const date = new Date(this.valueOf())
  date.setDate(date.getDate() - days)
  return date
}
// this adds an add days property to the Date prototype
Date.prototype.addDays = function(days) {
  const date = new Date(this.valueOf())
  date.setDate(date.getDate() + days)
  return date
}
// parse new Date() object into local date
function toISOLocal (d) {
  let z = n => (n < 10 ? '0' : '') + n
  z = n => (n < 10 ? '0' : '') + n
  let off = d.getTimezoneOffset()
  off = d.getTimezoneOffset()
  let sign = off < 0 ? '+' : '-'
  sign = off < 0 ? '+' : '-'
  off = Math.abs(off)
  off = Math.abs(off)

  return d.getFullYear() + '-' + z(d.getMonth() + 1) + '-' +
     z(d.getDate()) + 'T' + z(d.getHours()) + ':' + z(d.getMinutes()) +
     ':' + z(d.getSeconds()) + sign + z(off / 60|0) + z(off%60)
     ':' + z(d.getSeconds()) + sign + z(off/60|0) + z(off%60)
}
// collect all relevant days
const today = moment().format('YYYY/MM/DD')
const startOfMonth = moment().startOf('month').format('YYYY/MM/DD')
// const aWeekAgo = today.subtractDays(7)
// const thirtyDaysAgo = today.subtractDays(30)

// console.log(moment(today).isBefore(moment(startOfMonth)))
// console.log(today)

const monthRange = moment().range(moment(startOfMonth), moment(today))
// const array = Array.from(monthRange.by('days'))

console.log(monthRange)

// const enumerateDaysBetweenDates = function (startDate, endDate) {
//   const dates = []
//
//   const currDate = moment(startDate)
//   const lastDate = moment(endDate)
//
//   while (moment(currDate).isSameOrBefore(moment(lastDate))) {
//     console.log(currDate)
//     dates.push(currDate)
//     moment(currDate).add(1, 'days')
//   }
//
//   return dates
// }

// console.log(enumerateDaysBetweenDates(startOfMonth, today))

// this returns an array of the date range we are seeking
function getDates (startDate, stopDate) {
  const dateArray = []
  let currentDate = startDate
  while (currentDate <= stopDate) {
    dateArray.push(new Date(currentDate))
    currentDate = currentDate.addDays(1)
  }
  const parsedArray = []
  for (let j = 0; j < dateArray.length; j++) {
    for (let j = 0; j < dateArray.length; j++) {
      parsedArray.push(toISOLocal(dateArray[j]).split('T')[0])
    }
    return parsedArray
  }
}

const todayDuration = () => {
  const todaysPractices = store.practices.filter(function (practice) {
    return practice.date === toISOLocal(stopDate).split('T')[0]
  })
  let result = 0
  if (todaysPractices.length === 1) {
    result += todaysPractices[0].duration
  } else if (todaysPractices.length === 0) {
    return result
  } else {
    for (let i = 0; i < todaysPractices.length; i++) {
      result += todaysPractices[i].duration
    }
  }
  return result
}
const weekDuration = () => {
  let result = 0
  const dateArray = getDates(aWeekAgo, stopDate)
  store.practices.forEach(function (practice) {
    for (let i = 0; i < dateArray.length; i++) {
      if (practice.date === dateArray[i]) {
        result += practice.duration
      }
    }
  })
  return result
}
const monthDuration = () => {
  let result = 0
  const dateArray = getDates(thirtyDaysAgo, stopDate)
  store.practices.forEach(function (practice) {
    for (let i = 0; i < dateArray.length; i++) {
      if (practice.date === dateArray[i]) {
        result += practice.duration
      }
    }
  })
  return result
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

const showTotal = function (progress, location) {
  const circle = new ProgressBar.Circle(location, {
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
    step: (state, circle) => {
      circle.path.setAttribute('stroke', state.color)
      const value = Math.round(circle.value() * 100) + '%'
      if (value === 0) {
        circle.setText('')
      } else {
        circle.setText(`You are ${value} toward your 10,000 hours!`)
      }
      circle.text.style.color = state.color
    }
  })
  circle.text.style.fontFamily = '"Raleway", Helvetica, sans-serif'
  circle.text.style.fontSize = '.8rem'
  circle.animate(progress)
}

const totalPractice = () => {
  let total = 0
  store.practices.forEach(function (practice) {
    total += practice.duration
  })
  return total
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
  getProgresses
}
