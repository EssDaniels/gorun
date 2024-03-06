export default function contact() {
    $('form').on('submit', function (event) {
        event.preventDefault();
        var form = this;
        var formData = new FormData(this);

        $.ajax({
            url: '/contact/submit',
            type: 'POST',
            data: formData,
            contentType: false,
            processData: false,
            success: function (data) {
                $('#successMessage').text(data.success).show();
                $('#errorMessage').hide();
                form.reset();
                setTimeout(function () { $('#successMessage').hide(); }, 3000)
            },
            error: function (response) {
                if (response.status === 422) {
                    var errors = response.responseJSON.errors;
                    var errorsHtml = '<ul>';
                    $.each(errors, function (key, value) {
                        errorsHtml += '<li>' + value + '</li>';
                    });
                    errorsHtml += '</ul>';
                    $('#errorMessage').html(errorsHtml).show();
                    $('#successMessage').hide();
                } else {
                    $('#errorMessage').text('Wystąpił błąd. Spróbuj ponownie.').show();
                    $('#successMessage').hide();
                }
            }
        });
    });
}
