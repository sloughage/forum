console.log("thread.js connected");

$('.edit-button').on('click', function (e) {
    $(e.target).parent().parent().find('.h').toggleClass('hidden');
});

$('.patch-post').on('click', function (e) {
    var id = $(e.target).parent().data('id');
    var content = $(e.target).parent().next().children()[1].value;
    $.ajax({
        url: '/post',
        type: 'patch',
        data: {
            id: id,
            content: content
        },
        success: function (result) {
            window.location.reload();
        },
        error: function (err) {
            window.location.reload();
        }
    });
});

$('.delete-post').on('click', function (e) {
    var id = $(e.target).parent().data('id');
    $.ajax({
        url: '/post',
        type: 'delete',
        data: {id: id},
        success: function (result) {
            window.location.reload();
        },
        error: function (err) {
            window.location.reload();
        }
    });
});