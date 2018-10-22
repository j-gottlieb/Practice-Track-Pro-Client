// pull in goals response
const ProgressBar = require('progressbar.js')
const store = require('../store.js')

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
function toISOLocal(d) {
  var z = n => (n<10? '0':'')+n
  var z = n => (n<10? '0':'')+n
  var off = d.getTimezoneOffset()
  var off = d.getTimezoneOffset()
  var sign = off < 0? '+' : '-'
  var sign = off < 0? '+' : '-'
  off = Math.abs(off)
  off = Math.abs(off)

  return d.getFullYear() + '-' + z(d.getMonth()+1) + '-' +
         z(d.getDate()) + 'T' + z(d.getHours()) + ':'  + z(d.getMinutes()) +
         ':' + z(d.getSeconds()) + sign + z(off/60|0) + z(off%60)
         ':' + z(d.getSeconds()) + sign + z(off/60|0) + z(off%60)
}
// collect all relevant days
const today = new Date()
const stopDate = today
const aWeekAgo = today.subtractDays(7)
const thirtyDaysAgo = today.subtractDays(30)

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
  bar.text.style.fontSize = '2rem'
  bar.animate(progress)
}

const getProgresses = () => {
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
    $('#progress_message').html('Set goals above to view your progress!')
  } else {
    $('.goal_daily, .goal_weekly, .goal_monthly').html('')
    const dailyProgress = (todayDuration() / store.goals[0].daily)
    const weeklyProgress = (weekDuration() / store.goals[0].weekly)
    const monthlyProgress = (monthDuration() / store.goals[0].monthly)
    showProgress(dailyProgress, '.goal_daily')
    message(dailyProgress, '#daily_message')
    showProgress(weeklyProgress, '.goal_weekly')
    message(weeklyProgress, '#weekly_message')
    showProgress(monthlyProgress, '.goal_monthly')
    message(monthlyProgress, '#monthly_message')
    $('.display_progress_btn').addClass('hidden')
    $('.progress_dash, .refresh_progress_btn').removeClass('hidden')
  }
}

module.exports = {
  getProgresses
}
