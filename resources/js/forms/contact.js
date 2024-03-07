export default function contact() {
    submit();
    validation();
    messageCounter();
}

const REQUIRED_MSG = 'To pole jest wymagane.';
const NAME_VALIDATION_MAX_CHAR_MSG = 'Imię i nazwisko nie może przekraczać 100 znaków.';
const EMAIL_VALIDATION_MSG = 'Proszę wprowadzić poprawny adres e-mail.';
const PHONE_VALIDATION_ONLY_NUMBER_MSG = 'Numer telefonu może zawierać tylko cyfry.';
const PHONE_VALIDATION_MAX_NUMBER_MSG = 'Numer telefonu nie może przekraczać 15 cyfr.';
const PHONE_VALIDATION_MIN_NUMBER_MSG = 'Numer telefonu nie może być krótszy niż 7 cyfr.';
const ERROR_AJAX_MSG = 'Wystąpił błąd. Spróbuj ponownie.';

function validation() {

    $('#name').on('input', function () {
        var name = $(this).val();
        if (name.length > 100) {
            showAlertAndAddInvalidClass(NAME_VALIDATION_MAX_CHAR_MSG, $(this));
        } else {
            hideAlert($(this));
        }
    });

    $('#phone').on('input', function () {
        var phone = $(this).val();
        if (!/^\d*$/.test(phone)) {
            showAlertAndAddInvalidClass(PHONE_VALIDATION_ONLY_NUMBER_MSG, $(this));
        } else if (phone.length > 15) {
            showAlertAndAddInvalidClass(PHONE_VALIDATION_MAX_NUMBER_MSG, $(this));
        } else {
            hideAlert($(this));
        }
    });

    $('#phone').on('blur', function () {
        var phone = $(this).val();
        if (phone.length < 7) {
            showAlertAndAddInvalidClass(PHONE_VALIDATION_MIN_NUMBER_MSG, $(this));
        } else {
            hideAlert($(this));
        }
    });

    $('input[required], textarea[required]').on('blur', function () {
        var isValid = true;
        var value = $(this).val();
        var isEmailField = $(this).is('#email');

        if (!value) {
            isValid = false;
            showAlertAndAddInvalidClass(REQUIRED_MSG, $(this));
        } else if (isEmailField) {
            var regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
            if (!regex.test(value)) {
                isValid = false;
                showAlertAndAddInvalidClass(EMAIL_VALIDATION_MSG, $(this));
            }
        }
        if (isValid) {
            hideAlert($(this));
        }
    });
}

function showAlertAndAddInvalidClass(message, element) {

    element.addClass('is-invalid');
    var feedbackElement = element.siblings('.invalid-feedback');
    if (feedbackElement.length) {
        feedbackElement.text(message).show();
    } else {
        element.after('<div class="invalid-feedback">' + message + '</div>');
    }
}


function hideAlert(element) {
    element.removeClass('is-invalid');
    var feedbackElement = element.siblings('.invalid-feedback');
    if (feedbackElement.length) feedbackElement.hide();
}

function messageCounter() {
    $('#message').on('input', function () {
        var currentLength = $(this).val().length;
        var maxLength = $(this).attr('maxlength');
        $('#message-counter').text(currentLength + ' / ' + maxLength + ' znaków');
    });

    $('#message').trigger('input');
}


function submit() {
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
                $('#message').trigger('input');
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
                    $('#errorMessage').text(ERROR_AJAX_MSG).show();
                    $('#successMessage').hide();
                }
            }
        });
    });
}
