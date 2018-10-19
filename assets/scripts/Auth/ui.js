const store = require('../store.js')
const goalEvents = require('../Goals/events.js')
const practiceEvents = require('../Practices/events.js')

const signUpSuccess = function (response) {
  $('#display-message').html('').hide()
  $('#sign-up-form').trigger('reset')
  $('#display-message').text(`Success!`).fadeToggle().delay(1000).fadeToggle()
  $('#display-message').css('color', 'green')
  $('#sign-up-btn, #sign-up-form').addClass('hidden')
}

const signUpFailure = function () {
  $('#display-message').html('').hide()
  $('#display-message').html('That username is taken. Please try another').fadeToggle().delay(1000).fadeToggle()
  $('#display-message').css('color', 'red')
  $('#sign-up-form').trigger('reset')
}

const signInSuccess = function (response) {
  store.user = response.user
  practiceEvents.onShowPractices()
  $('#display-message').html('').hide()
  $('#sign-in-form').trigger('reset')
  $('#display-message').css('color', 'green')
  $('#show-practices-btn, #sign-out-form, #change-password-btn, .practices, .practice_header, .goals, .display_progress_btn, #view-goals-btn, .practice_index').removeClass('hidden')
  $('#sign-in-btn,#sign-up-btn,#sign-in-form,.cork_div').addClass('hidden')
  $('#display-message').text(`Welcome, ${store.user.email}`).fadeToggle().delay(1000).fadeToggle()
  goalEvents.onShowGoals()
}

const signInFailure = function () {
  // console.log('we signed in!')
  $('#display-message').html('').hide()
  $('#display-message').text('Something went wrong, please try again').fadeToggle().delay(1000).fadeToggle()
  $('#display-message').css('color', 'red')
  $('#sign-up-form').trigger('reset')
}

const changePasswordSuccess = function (response) {
  $('#display-message').html('').hide()
  $('#change-password-form').trigger('reset')
  $('#display-message').text(`Successfully changed password!`).fadeToggle().delay(1000).fadeToggle()
  $('#display-message').css('color', 'green')
  $('#change-password-form').addClass('hidden')
}

const changePasswordFailure = function () {
  $('#display-message').html('').hide()
  $('#display-message').text('Something went wrong, please try again').fadeToggle().delay(1000).fadeToggle()
  $('#display-message').css('color', 'red')
  $('#sign-up-form').trigger('reset')
}

const signOutSuccess = function () {
  store.user = null
  store.goals = null
  store.practices = null
  $('#display-message').html('').hide()
  $('.practice_display, .goal_daily, .goal_weekly, .goal_monthly').html('')
  $('.edit_form, #add-practices-form').trigger('reset')
  $('#sign-up-form, #sign-in-form, #change-password-form').trigger('reset')
  $('#display-message').text(`You have successfully signed out`).fadeToggle().delay(1000).fadeToggle()
  $('#display-message').css('color', 'green')
  $('#sign-out-form, #change-password-btn, #change-password-form, #show-practices-btn, .practices, .practice_header, .goals, .progress_dash, #edit-goal-form, #add-goal-form').addClass('hidden')
  $('#sign-in-btn, #sign-up-btn, #display-message, .cork_div').removeClass('hidden')
}

const signOutFailure = function () {
  // $('#display-message').removeClass('hidden')
  // $('#display-message').html('Something went wrong')
  // $('#display-message').css('color', 'red')
}

module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  changePasswordSuccess,
  changePasswordFailure,
  signOutSuccess,
  signOutFailure
}
