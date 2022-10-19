/** 
 * Exercise 03 - Form 
 * Brooke Czerwinski
 * Full-Stack Web Development
 * HW 2
 * 
 * References:
 * https://getbootstrap.com/docs/5.0/forms/overview/
 * https://getbootstrap.com/docs/5.0/forms/form-control/
 * https://getbootstrap.com/docs/5.0/forms/checks-radios/
 * https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/reset
 * https://developer.mozilla.org/en-US/docs/Web/API/FormData/values
 * https://getbootstrap.com/docs/5.0/forms/validation/
 * https://stackoverflow.com/questions/20573488/why-does-html5-form-validation-allow-emails-without-a-dot
 * **/

// Form id is passed in so it can be accessed
const resetForm = (formID) => {
    // Reset the form
    document.getElementById(formID).reset();
}

const validateSignup = () => {
    // Get info from form
    const inputName = document.getElementById("inputName").value;
    const inputEmail = document.getElementById("inputEmail").value;
    const inputFeedback = document.getElementById("inputFeedback").value;
    const inputNewsletter = document.getElementById("inputNewsletter").checked;

    // Check if feedback was submitted to build feedback output string
    let feedbackStr = ``
    if (inputFeedback !== ``) {
        feedbackStr = inputFeedback;
    }
    else {
        feedbackStr = 'No feedback was submitted.';
    }

    // Check newsletter value to build newsletter output string
    let newsletterStr = ``
    if (inputNewsletter) {
        newsletterStr = `Yes, I would like to join the newsletter.`;
    }
    else {
        newsletterStr = `No, thank you.`;
    }

    // Print message to the console
    console.log(`========= Form Submission =========
    Name: ${inputName}
    Email: ${inputEmail}
    Feedback: ${feedbackStr}
    Newsletter: ${newsletterStr}`);
}


// Example starter JavaScript for disabling form submissions if there are invalid fields
// Direct use from example code at https://getbootstrap.com/docs/5.0/forms/validation/
(function () {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
  
          form.classList.add('was-validated')
        }, false)
      })
  })()
