$('#login_button').on('click', e => {
  $('.login_dropdown').toggleClass('hidden')
})

$('.post_login').on('click', e => {
  $.ajax({
    url: '/user/login',
    type: 'post',
    data: {
      username: $('#login_username').val(),
      password: $('#login_password').val()
    },
    success: result => {
      window.location.reload()
    },
    error: err => {
      console.log(err)
    }
  })
})

$('#logout_button').on('click', e => {
  $.ajax({
    url: '/user/logout',
    type: 'post',
    success: result => {
      window.location.reload()
    },
    error: err => {
      console.log(err)
    }
  })
})

$(document).ready(() => {
  $.ajax({
    url: '/user/loginstatus',
    type: 'get',
    success: result => {
      if (result.isLoggedIn) {
        $('#login_button').append('<p>' + result.username + '</p>')
        $('#logout_button').removeClass('hidden')
      } else {
        $('#login_button').append('<p>login</p>')
        $('#login_dropdown').removeClass('hidden')
      }
    },
    error: err => {
      console.log(err)
    }
  })
})