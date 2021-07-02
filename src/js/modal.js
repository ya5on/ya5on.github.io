$(document).ready(function() {
    // //open popup
    // $('.callback').on('click', function(e) {
    //     e.preventDefault();
    //     $('.callback-form').removeClass('hidden');
    //     $('body').addClass('lock');
    // });
    // //close popup
    // $('.callback-form').on('click', function(e) {
    //     if ($(e.target).is('.btn-close') || $(e.target).is('.callback-form')) {
    //         e.preventDefault();
    //         $(this).addClass('hidden');
    //         $('body').removeClass('lock').removeClass('locked');
    //     }
    // });
    // $(document).keyup(function(e) {
    //     if (e.which === '27') {
    //         $('.modal').addClass('hidden');
    //     }
    // });
    // process the form
    $('form').submit(function(e) {
        // process the form
        let thisForm = this;
        $.ajax({
            type: 'POST', // define the type of HTTP verb we want to use (POST for our form)
            url: '/mail.php', // the url where we want to POST
            data: $(thisForm).serialize(), // our data object or formData
            dataType: 'json', // what type of data do we expect back from the server
            encode: true,
            // beforeSend: function(xhr){
            //     $('#submit-btn').html('Sending...');
            // },
        })
            // using the done promise callback
            .done(function(data) {
                // log data to the console so we can see
                console.log(data);
                if (!data.success) {
                    // handle errors fields
                    if (data.errors.name) {
                        $(thisForm).find('.msg').html('<div class="alert-danger">' + data.errors.name + '</div>');
                    } else if (data.errors.phone) {
                        $(thisForm).find('.msg').html('<div class="alert-danger">' + data.errors.phone + '</div>');
                    } else if (data.errors.select) {
                        $(thisForm).find('.msg').html('<div class="alert-danger">' + data.errors.select + '</div>');
                    }
                } else {
                    // ALL GOOD! just show the success message!
                    Swal.fire({
                        icon: 'success',
                        title: data.message,
                        showConfirmButton: false,
                        timer: 2000
                    })
                    $('input, textarea, select').val(function() {
                        return this.defaultValue;
                    });
                    setTimeout(function() {
                        $(thisForm).find('.msg').html('<div class="alert-success"></div>');
                        $('.modal').addClass('hidden');
                        $('body').removeClass('lock').removeClass('locked');
                    }, 500);
                }
            })
            .fail(function(data) {
                //Server failed to respond - Show an error message
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Could not reach server, please try again later.',
                })
            })
        // stop the form from submitting the normal way and refreshing the page
        e.preventDefault();
    });
});