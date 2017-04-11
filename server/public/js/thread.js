$('.edit-button').on('click', e => {
  $(e.target).parent().parent().find('.h').toggleClass('hidden')
})

$('.patch-post').on('click', e => {
  const id = $(e.target).parent().data('id')
  const content = $(e.target).parent().next().children()[1].value.trim()
  $.ajax({
    url: '/post',
    type: 'patch',
    data: {
      id: id,
      content: content
    },
    success: result => {
      window.location.reload()
    },
    error: err => {
      console.log(err)
    }
  })
})

$('.delete-post').on('click', e => {
  const id = $(e.target).parent().data('id')
  $.ajax({
    url: '/post',
    type: 'delete',
    data: {id: id},
    success: result => {
      window.location.reload()
    },
    error: err => {
      console.log(err)
    }
  })
})

$('.post-post').on('click', e => {
  const threadId = $(e.target).parent().parent().data('id')
  const content = $(e.target).parent().next().children()[0].value.trim()
  $.ajax({
    url: '/post',
    type: 'post',
    data: {
      threadId: threadId,
      content: content
    },
    success: result => {
      window.location.reload()
    },
    error: err => {
      console.log(err)
    }
  })
})