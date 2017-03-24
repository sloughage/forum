console.log("register.js connected");

function writeM(uM, pM) {
    var mbox = $('#mbox');
    mbox.empty();
    for (m of uM) {
        mbox.append('<p class="red">' + m + '</p>');
    }
    if (uM.length > 0 && pM.length > 0) {
        mbox.append('<br>');
    }
    for (m of pM) {
        mbox.append('<p class="red">' + m + '</p>');
    }
}

function writeOk() {
    var mbox = $('#mbox');
    mbox.empty();
    mbox.append('<p class="green">ok</p>');
}

function writeLoading() {
    var mbox = $('#mbox');
    mbox.empty();
    mbox.append('<p class="red">loading</p>');
}

function clearM() {
    var mbox = $('#mbox');
    mbox.empty();
}

$('.textbox_s').on('keyup', function () {
    $('#register').prop('disabled', true);
    writeLoading();
    $.ajax({
        url: '/user/test',
        type: 'post',
        data: {
            username: $('#untb').val(),
            password: $('#pwtb').val()
        },
        success: function (result) {
            if (result.pass) {
                $('#register').prop('disabled', false);
                writeOk();
            } else {
                writeM(result.uM, result.pM);
            };
        },
        error: function (err) {
            console.log(err);
        }
    });
});
