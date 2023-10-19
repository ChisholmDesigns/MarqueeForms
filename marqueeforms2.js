 $(document).ready(function () {
        $('[data-toggle="datepicker"]').datepicker({
            format: 'mm-dd-yyyy'
        });
        // Available date placeholders:
        // Year: yyyy
        // Month: mm
        // Day: dd
        if (window.innerWidth < 768) {
            $('[data-toggle="datepicker"]').attr('readonly', 'readonly')
        }
    });
document.addEventListener("DOMContentLoaded", function () {
  var splide = new Splide(".splide", {
    type: "fade",
    drag: false,
    arrows: false,
    pagination: false
  }).mount();

  var nextButtons = document.querySelectorAll(".next-button");
  var prevButtons = document.querySelectorAll(".prev-button");
  var submitButton = document.querySelector(".button-primary"); // The submit button
  var emailInput = document.querySelector("#Email");
  var emailErrorMessage = document.querySelector("#email-error-message");

  function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  emailInput.addEventListener("blur", function () {
    var emailValue = emailInput.value;
    var isValidEmail = validateEmail(emailValue);

    if (!isValidEmail) {
      // If the email is invalid, show the error message and add the error class to the input
      emailErrorMessage.classList.remove("hide");
      emailInput.classList.add("error");
    } else {
      // If the email is valid, hide the error message and remove the error class from the input
      emailErrorMessage.classList.add("hide");
      emailInput.classList.remove("error");
    }
  });

  // Function to validate mandatory input fields for a specific slide
  function validateMandatoryInputs(step) {
    console.log("Checking mandatory fields for step: ", step);
    let slide = document.querySelectorAll(".splide__slide")[step];
    let mandatoryInputs = Array.from(
      slide.querySelectorAll(
        "textarea[required], input[required], select[required], checkbox[required], radio[required]"
      )
    );
    
    let dateInput = slide.querySelector("#Opening-Date");  // Assuming the id of your date input is "Opening-Date"

    // Get the next button within the specific splide slide
    let nextButton = nextButtons[step];

    function checkInputs() {
      let allFilled = mandatoryInputs.every((input) => {
        if (input.type === "checkbox" || input.type === "radio") {
          return input.checked;
        } else if (input.type === "email") {
          return validateEmail(input.value);
        } else if (input === dateInput) {
          return dateInput.value.trim() !== "";  // Adjust this line based on how datepicker.js represents selected dates
        } else {
          return input.value.trim() !== "";
        }
      });

      if (nextButton) {
        // Check if nextButton exists before accessing it
        if (allFilled) {
          nextButton.classList.remove("is-disabled");
        } else {
          nextButton.classList.add("is-disabled");
        }
      }

      // If this is the last slide, enable or disable the submit button
      if (step === document.querySelectorAll(".splide__slide").length - 1) {
        if (allFilled) {
          submitButton.classList.remove("is-disabled");
        } else {
          submitButton.classList.add("is-disabled");
        }
      }
    }

    mandatoryInputs.forEach((input) => {
      if (input.type === "checkbox" || input.type === "radio") {
        input.addEventListener("change", checkInputs);
      } else {
        input.addEventListener("input", checkInputs);
      }
    });
    
    if (dateInput) {
      dateInput.addEventListener("change", checkInputs);  // Assuming datepicker.js triggers a "change" event
    }

    // Initial check when the page is loaded
    checkInputs();
  }

  // Validate mandatory inputs for all slides when the page is loaded
  Array.from(document.querySelectorAll(".splide__slide")).forEach(
    (_, index) => {
      validateMandatoryInputs(index);
    }
  );

  // Click handler for next button
  nextButtons.forEach((button, index) => {
    button.addEventListener("click", (event) => {
      console.log("Moving to next step...");
      let currentStep = button.closest(".splide__slide");
      let nextStep = currentStep.nextElementSibling;

      // Check if the button has the 'is-disabled' class before proceeding
      if (button.classList.contains("is-disabled")) {
        event.preventDefault(); // Prevent the click action
      } else {
        splide.go("+1");
      }
    });
  });

  // Click handler for previous button
  prevButtons.forEach((button) => {
    button.addEventListener("click", function () {
      console.log("Moving to previous step...");
      splide.go("-1");
    });
  });

  // Add click event to submit button to prevent submission if it's disabled
  submitButton.addEventListener("click", function (event) {
    if (submitButton.classList.contains("is-disabled")) {
      event.preventDefault(); // Prevent the submission
    }
  });
});
