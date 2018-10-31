'use strict'
const authEvents = require('./Auth/events.js')
const practiceEvents = require('./Practices/events.js')
const goalEvents = require('./Goals/events.js')
// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
  // Auth events
  $('#sign-up-form').on('submit', authEvents.onSignUp)
  $('#sign-in-form').on('submit', authEvents.onSignIn)
  $('#change-password-form').on('submit', authEvents.onChangePassword)
  $('#sign-out-form').on('click', authEvents.onSignOut)
  $('#sign-up-btn').on('click', authEvents.onShowSignUp)
  $('#sign-in-btn').on('click', authEvents.onShowSignIn)
  $('#change-password-btn').on('click', authEvents.onShowChangePassword)
  // Goal Events
  goalEvents.addHandlers()
  // Practice events
  practiceEvents.addHandlers()
  // $('#show-practices-btn').on('click', practiceEvents.onShowPractices)
  $('#add-practice-form').on('submit', practiceEvents.onAddPractice)
  $('#search-practices').on('submit', practiceEvents.onSearchPractices)
  $('#view-range-duration').on('submit', practiceEvents.onViewDuration)
})
