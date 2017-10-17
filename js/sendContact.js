
$(function() {
  // Add US Phone Validation
  jQuery.validator.addMethod('phoneUS', function(phone_number, element) {
    phone_number = phone_number.replace(/\s+/g, ''); 
    return this.optional(element) || phone_number.length > 9 &&
        phone_number.match(/^(1-?)?(\([2-9]\d{2}\)|[2-9]\d{2})-?[2-9]\d{2}-?\d{4}$/);
  }, 'Please enter a valid phone number.');
  // Initialize form validation on the registration form.
  // It has the name attribute "registration"
  $("form[name='contact']").validate({
    // Specify validation rules
    rules: {
      name: "required",
      company: "required",
      email: {
        required: true,
        email: true
      },
      phone: {
        required: true,
        phoneUS: true
      },
      message: {
        required: true,
        minlength: 5
      }
    },
    // Specify validation error messages
    messages: {
      name: "Please enter your name",
      company: "Please enter your company name",
      email: {
        required: "Please provide your email",
        email: "Your email is invalid"
      },
      phone: {
        required: "Please provide your phone number",
        phoneUS: "Your phone number is invalid"
      },
      message: {
        required: "Please provide a message",
        minlength: "Please give us more details in your message"
      }
    },
    // Make sure the form is submitted to the destination defined
    // in the "action" attribute of the form when valid
    submitHandler: function(form) {
      // variable declarations
      var $form = $('#form-contact'),
          $contactSuccess = $('#contact-success');
          $contactFail = $('#contact-fail');
      // form submit
      $form.submit( function(event) {
        event.preventDefault;
          // ajax call to formspree post
          $.ajax({
              method: 'POST',
              url: '//formspree.io/thequantumwand@gmail.com',
              data: $('#form-contact').serialize(),
              datatype: 'json',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              success: function( response ) {
                  console.log('success: message sent to quantum wand');
                  $form.hide();
                  $contactSuccess.fadeIn();
                  $form[0].reset();
              },
              error: function (request, status, error) {
                console.log('error: message not sent to quantum wand -- ' + request.responseText);
                $contactFail.fadeIn();
                $form[0].reset();
              }
          });
          return false;
      });
    }
  });
});

