$(document).ready(function() {
    $('.formSubmission').submit(function(e) {
        e.preventDefault();
        var spamGuard = window.formSpamGuard;

        if (spamGuard && spamGuard.formHasLink(this)) {
            $('#message').html(spamGuard.quietSuccessHtml());
            $('#responseModal').modal('show');
            if (this.reset) {
                this.reset();
            }
            return;
        }

        var actionUrl = $(this).attr('action');
        var formData = $(this).serialize();

        $.ajax({
            type: "POST",
            url: actionUrl,
            data: formData,
            success: function(response) {
                $('#message').html(response);
                $('#responseModal').modal('show'); // Use Bootstrap's method to show the modal
            },
            error: function() {
                $('#message').html('<div class="alert alert-error">Error processing request.</div>');
                $('#responseModal').modal('show');
            }
        });
    });

    // Manually handle the modal close functionality
    $('.close, .btn-secondary').click(function() {
        $('#responseModal').modal('hide'); // Use Bootstrap's method to hide the modal
    });
});
