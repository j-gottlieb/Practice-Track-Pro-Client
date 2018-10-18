// pull in goals response
const ProgressBar = require('progressbar.js')
const store = require('../store.js')

const showProgress = function () {
  const today = new Date()
  console.log(today)
  console.log(store.practices)
  console.log(store.goals)
  const todaysPractices = store.practices.filter(function (practice) {
    return practice.date === today
  })

  const totalPractice = todaysPractices.reduce(function (sum, obj) {
    sum += obj.duration
  })

  const progress = totalPractice / store.goals.daily
  const bar = new ProgressBar.SemiCircle('.goal_display', {
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
    to: {color: '#ED6A5A'},
    // Set default step function for all animate calls
    step: (state, bar) => {
      bar.path.setAttribute('stroke', state.color)
      const value = Math.round(bar.value() * 100)
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
module.exports = {
  showProgress
}
