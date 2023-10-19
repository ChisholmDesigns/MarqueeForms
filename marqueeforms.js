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
      emailErrorMessage.classList.remove("hide");
      emailInput.classList.add("error");
    } else {
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

    let nextButton = nextButtons[step];

    function checkInputs() {
      let allFilled = mandatoryInputs.every((input) => {
        if (input.type === "checkbox" || input.type === "radio") {
          return input.checked;
        } else if (input.type === "email") {
          return validateEmail(input.value);
        } else {
          return input.value.trim() !== "";
        }
      });

      if (nextButton) {
        if (allFilled) {
          nextButton.classList.remove("is-disabled");
        } else {
          nextButton.classList.add("is-disabled");
        }
      }

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

    checkInputs();
  }

  // New function to initiate validation checks
  function initiateValidation() {
    // Validate mandatory inputs for all slides when the page is loaded
    Array.from(document.querySelectorAll(".splide__slide")).forEach(
      (_, index) => {
        validateMandatoryInputs(index);
      }
    );
  }

  // Set a timeout to ensure that the fields are populated before running the validation checks.
  setTimeout(initiateValidation, 100);  // Adjust the timeout duration as needed

  nextButtons.forEach((button, index) => {
    button.addEventListener("click", (event) => {
      console.log("Moving to next step...");
      let currentStep = button.closest(".splide__slide");
      let nextStep = currentStep.nextElementSibling;

      if (button.classList.contains("is-disabled")) {
        event.preventDefault();
      } else {
        splide.go("+1");
      }
    });
  });

  prevButtons.forEach((button) => {
    button.addEventListener("click", function () {
      console.log("Moving to previous step...");
      splide.go("-1");
    });
  });

  submitButton.addEventListener("click", function (event) {
    if (submitButton.classList.contains("is-disabled")) {
      event.preventDefault();
    }
  });

});


$('.select-item').each(function(){
	var s = $(this).text();
  $('.tag-select').append('<option value="'+s+'">'+s+'</option>');
  })

<!-- RTE -->

    tinymce.init({
        selector: '#artist-bio',
          content_style: 'body { line-height: 1.1; }',
           menu: {
            edit: { title: 'Edit', items: 'undo redo | cut copy paste | selectall' },
            format: { title: 'Format', items: 'bold italic underline | removeformat' },
            tools: { title: 'Tools', items: 'spellchecker spellcheckerlanguage | wordcount' },
        },
        plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
       toolbar: 'undo redo | blocks | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
        toolbar_mode: 'floating',
       
    });
  

    tinymce.init({
        selector: '#event-frontpage',
        content_style: 'body { line-height: 1.1; }',
        menu: {
            edit: { title: 'Edit', items: 'undo redo | cut copy paste | selectall' },
            format: { title: 'Format', items: 'bold italic underline | removeformat' },
            tools: { title: 'Tools', items: 'spellchecker spellcheckerlanguage | wordcount' },
        },
        plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
       toolbar: 'undo redo | blocks | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
        toolbar_mode: 'floating',
        setup: function (editor) {
        editor.on('init', function () {
            var content = 'Written by <strong>William Shakespeare</strong>';
            editor.setContent(content);
        });
    }
    });
    tinymce.init({
        selector: '#event-setting',
            menu: {
            edit: { title: 'Edit', items: 'undo redo | cut copy paste | selectall' },
            format: { title: 'Format', items: 'bold italic underline | removeformat' },
            tools: { title: 'Tools', items: 'spellchecker spellcheckerlanguage | wordcount' },
        },
        plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
       toolbar: 'undo redo | blocks | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
        toolbar_mode: 'floating',
    });
    tinymce.init({
        selector: '#event-additional-messaging',
            menu: {
            edit: { title: 'Edit', items: 'undo redo | cut copy paste | selectall' },
            format: { title: 'Format', items: 'bold italic underline | removeformat' },
            tools: { title: 'Tools', items: 'spellchecker spellcheckerlanguage | wordcount' },
        },
        plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
       toolbar: 'undo redo | blocks | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
        toolbar_mode: 'floating',
    });
    tinymce.init({
        selector: '#event-special',
            menu: {
            edit: { title: 'Edit', items: 'undo redo | cut copy paste | selectall' },
            format: { title: 'Format', items: 'bold italic underline | removeformat' },
            tools: { title: 'Tools', items: 'spellchecker spellcheckerlanguage | wordcount' },
        },
        plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
       toolbar: 'undo redo | blocks | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
        toolbar_mode: 'floating',
    });

