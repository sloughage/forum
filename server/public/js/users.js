console.log("users.js connected");

$('.delete-user').on('click', function (e) {
    var id = $(e.target).parent().data('id');
    $.ajax({
        url: '/user',
        type: 'delete',
        data: {id: id},
        success: function (result) {
            console.log(result);
            window.location.reload();
        },
        error: function (err) {
            console.log(err);
            window.location.reload();
        }
    });
});