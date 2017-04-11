function showTests (arr) {
  let lines = $('.h')
  for (let i = 0; i < lines.length; i++) {
    if (arr[i]){
      $(lines[i]).removeClass('hidden')
    }
    else {
      $(lines[i]).addClass('hidden')
    }
  }
}

$('.textbox_s').on('keyup', () => {
  $('#register').prop('disabled', true)
  const username = $('#untb').val()
  const password = $('#pwtb').val()
  $.ajax({
    url: '/user/test',
    type: 'post',
    data: {
      username: username,
      password: password
    },
    success: result => {
      showTests(result.tests)
      if (result.tests.every(m => !m)) {
        $('#register').prop('disabled', false)
      }
    },
    error: err => {
      console.log(err)
    }
  })
})
