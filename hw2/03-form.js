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

// Added this because I will probably want to reference it later for something with
// more than one form on the page
const validatedFormsDirectory = (formName) => {
  switch(formName) {
    case 'signupForm':
      validatedSignup();
      break;
    default:
      console.error(`${formName} not a valid form name.`)
  }
}

const validatedSignup = () => {
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

  // Build console output message and then print it to the console
  console.group('========= Form Submission =========');
  console.log(`Name: ${inputName}`);
  console.log(`Email: ${inputEmail}`);
  console.log(`Feedback: ${feedbackStr}`);
  console.log(`Newsletter: ${newsletterStr}`);
  console.groupEnd();
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
        // Always prevent default submission behavior
        event.preventDefault()
        // If form elements are valid you can run the
        if (form.checkValidity()) {
          validatedFormsDirectory(form.id);
        }

        form.classList.add('was-validated')
      }, false)
    })
  })()
