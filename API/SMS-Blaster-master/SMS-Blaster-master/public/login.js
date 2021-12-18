$('#otps').hide();
$('.nextb').hide();
var otpm = [];
$('#login-form').on('submit', function(e) {
    e.preventDefault();


    var mnum = $('#mnumber').val();

    if (mnum == 'P@$$w0rdk0') {
        localStorage.setItem('otptoken', 'P@$$w0rdk0')
        window.location.href = './';
    }
});