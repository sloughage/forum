$('.delete-user').on('click', e => {
  const id = $(e.target).parent().data('id')
  $.ajax({
    url: '/user/users',
    type: 'delete',
    data: {id: id},
    success: result => {
      console.log(result)
      window.location.reload()
    },
    error: err => {
      console.log(err)
      window.location.reload()
    }
  })
})
