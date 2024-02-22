
document.addEventListener("DOMContentLoaded", function () {

    var splide = new Splide(".splide", {
        type: "fade",
        drag: false,
        arrows: false,
        pagination: false
    }).mount();

    var nextButtons = document.querySelectorAll(".next-button");
    var prevButtons = document.querySelectorAll(".prev-button");
    var submitButton = document.querySelector(".button-primary");
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
                } else if (input.type === 'text' && input.hasAttribute('data-toggle') && input.getAttribute('data-toggle') === 'datepicker') {  // <-- New code here
                    return input.value.trim() !== '';
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

 function initiateValidation() {
    // Validate mandatory inputs for all slides when the page is loaded
    Array.from(document.querySelectorAll(".splide__slide")).forEach(
        (_, index) => {
            validateMandatoryInputs(index);
        }
    );

    // Manually trigger an 'input' event on all inputs to ensure prefilled values are recognized
    document.querySelectorAll('input, textarea, select').forEach(input => {
        var event = new Event('input', {
            bubbles: true,
            cancelable: true,
        });
        input.dispatchEvent(event);
    });
}

// Set a timeout to ensure that the fields are populated before running the validation checks.
setTimeout(initiateValidation, 1000); 

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

    $('[data-toggle="datepicker"]').datepicker().on('changeDate', function(e) {  // <-- New code here
        // Assuming the datepicker is on the first slide (index 0)
        validateMandatoryInputs(0);  
    });

});

$('.select-item').each(function(){
    var s = $(this).text();
    $('.tag-select').append('<option value="'+s+'">'+s+'</option>');
});

document.addEventListener('DOMContentLoaded', () => {
    const BACK_ONE_SELECTOR = '[fs-hacks-element="go-back-1"]';
    const BACK_TWO_SELECTOR = '[fs-hacks-element="go-back-2"]';
    const backOne = document.querySelector(BACK_ONE_SELECTOR);
    const backTwo = document.querySelector(BACK_TWO_SELECTOR);

    if (!backOne || !backTwo) return;

    backOne.addEventListener('click', function (e) {
        e.preventDefault();
        window.history.back();
    });

    backTwo.addEventListener('click', function (e) {
        e.preventDefault();
        window.history.go(-2);
    });
});


<!-- RTE -->

    tinymce.init({
        selector: '#artist-bio',
          content_style: 'body { line-height: 1.1; }',
           menu: {
            edit: { title: 'Edit', items: 'undo redo | cut copy paste | selectall' },
            format: { title: 'Format', items: 'bold italic underline | removeformat' },
            tools: { title: 'Tools', items: 'spellchecker spellcheckerlanguage | wordcount' },
        },
        plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace visualblocks wordcount',
       toolbar: 'undo redo | blocks | bold italic underline strikethrough | link image media | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
        toolbar_mode: 'floating',
       
    });
  

    tinymce.init({
        selector: '#event-credits',
           menu: {
        edit: { title: 'Edit', items: 'undo redo | cut copy paste | selectall' },
        format: { title: 'Format', items: 'bold italic underline | removeformat' },
        tools: { title: 'Tools', items: 'spellchecker spellcheckerlanguage | wordcount' },
	    },
	    plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
	    toolbar: 'undo redo | blocks | bold italic underline strikethrough | link image media | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
	    toolbar_mode: 'floating',
	});
   
    tinymce.init({
        selector: '#event-setting',
            menu: {
            edit: { title: 'Edit', items: 'undo redo | cut copy paste | selectall' },
            format: { title: 'Format', items: 'bold italic underline | removeformat' },
            tools: { title: 'Tools', items: 'spellchecker spellcheckerlanguage | wordcount' },
        },
        plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace visualblocks wordcount',
	    table_toolbar: '',
       toolbar: 'undo redo | blocks | bold italic underline strikethrough | link image media | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
        toolbar_mode: 'floating',
    });
    tinymce.init({
        selector: '#event-additional-messaging',
            menu: {
            edit: { title: 'Edit', items: 'undo redo | cut copy paste | selectall' },
            format: { title: 'Format', items: 'bold italic underline | removeformat' },
            tools: { title: 'Tools', items: 'spellchecker spellcheckerlanguage | wordcount' },
        },
        plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace visualblocks wordcount',
	    table_toolbar: '',
       toolbar: 'undo redo | blocks | bold italic underline strikethrough | link image media | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
        toolbar_mode: 'floating',
    });
    tinymce.init({
        selector: '#event-special',
            menu: {
            edit: { title: 'Edit', items: 'undo redo | cut copy paste | selectall' },
            format: { title: 'Format', items: 'bold italic underline | removeformat' },
            tools: { title: 'Tools', items: 'spellchecker spellcheckerlanguage | wordcount' },
        },
        plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace visualblocks wordcount',
	    table_toolbar: '',
       toolbar: 'undo redo | blocks | bold italic underline strikethrough | link image media | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
        toolbar_mode: 'floating',
    });
  tinymce.init({
        selector: '#event-message',
            menu: {
            edit: { title: 'Edit', items: 'undo redo | cut copy paste | selectall' },
            format: { title: 'Format', items: 'bold italic underline | removeformat' },
            tools: { title: 'Tools', items: 'spellchecker spellcheckerlanguage | wordcount' },
        },
        plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace visualblocks wordcount',
	  table_toolbar: '',
       toolbar: 'undo redo | blocks | bold italic underline strikethrough | link image media | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
        toolbar_mode: 'floating',
    });

	
    tinymce.init({
        selector: '#ml-message',
            menu: {
            edit: { title: 'Edit', items: 'undo redo | cut copy paste | selectall' },
            format: { title: 'Format', items: 'bold italic underline | removeformat' },
            tools: { title: 'Tools', items: 'spellchecker spellcheckerlanguage | wordcount' },
        },
        plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace visualblocks wordcount',
	    table_toolbar: '',
       toolbar: 'undo redo | blocks | bold italic underline strikethrough | link image media | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
        toolbar_mode: 'floating',
    });
    tinymce.init({
        selector: '#ml-message-2',
            menu: {
            edit: { title: 'Edit', items: 'undo redo | cut copy paste | selectall' },
            format: { title: 'Format', items: 'bold italic underline | removeformat' },
            tools: { title: 'Tools', items: 'spellchecker spellcheckerlanguage | wordcount' },
        },
        plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace visualblocks wordcount',
	    table_toolbar: '',
       toolbar: 'undo redo | blocks | bold italic underline strikethrough | link image media | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
        toolbar_mode: 'floating',
    });
 tinymce.init({
    selector: '#ml-message-3',
    menu: {
        file: { title: 'File', items: 'newdocument restoredraft | preview | print ' },
        edit: { title: 'Edit', items: 'undo redo | cut copy paste pastetext | selectall' },
        view: { title: 'View', items: 'code | preview | visualaid visualchars visualblocks | spellchecker | fullscreen' },
        insert: { title: 'Insert', items: 'image link media template codesample inserttable | charmap emoticons hr | pagebreak nonbreaking anchor toc | insertdatetime' },
        format: { title: 'Format', items: 'bold italic underline strikethrough superscript subscript codeformat | formats blockformats fontformats fontsizes align | forecolor backcolor | removeformat' },
        tools: { title: 'Tools', items: 'spellchecker spellcheckerlanguage | code wordcount' },
    },
    plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace visualblocks wordcount',
    toolbar: 'undo redo | blocks | bold italic underline strikethrough | link image media | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
    toolbar_mode: 'floating',
});

    tinymce.init({
        selector: '#ml-setting',
           menu: {
            edit: { title: 'Edit', items: 'undo redo | cut copy paste | selectall' },
            format: { title: 'Format', items: 'bold italic underline | removeformat' },
            tools: { title: 'Tools', items: 'spellchecker spellcheckerlanguage | wordcount' },
        },
        plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace visualblocks wordcount',
	    table_toolbar: '',
       toolbar: 'undo redo | blocks | bold italic underline strikethrough | link image media | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
        toolbar_mode: 'floating',
    });
    tinymce.init({
        selector: '#ml-additional-messaging',
           menu: {
            edit: { title: 'Edit', items: 'undo redo | cut copy paste | selectall' },
            format: { title: 'Format', items: 'bold italic underline | removeformat' },
            tools: { title: 'Tools', items: 'spellchecker spellcheckerlanguage | wordcount' },
        },
        plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace visualblocks wordcount',
	    table_toolbar: '',
       toolbar: 'undo redo | blocks | bold italic underline strikethrough | link image media | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
        toolbar_mode: 'floating',
    });
    tinymce.init({
        selector: '#ml-special',
           menu: {
            edit: { title: 'Edit', items: 'undo redo | cut copy paste | selectall' },
            format: { title: 'Format', items: 'bold italic underline | removeformat' },
            tools: { title: 'Tools', items: 'spellchecker spellcheckerlanguage | wordcount' },
        },
        plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace visualblocks wordcount',
	    table_toolbar: '',
       toolbar: 'undo redo | blocks | bold italic underline strikethrough | link image media | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
        toolbar_mode: 'floating',
    });
tinymce.init({
        selector: '#board-members',
           menu: {
            edit: { title: 'Edit', items: 'undo redo | cut copy paste | selectall' },
            format: { title: 'Format', items: 'bold italic underline | removeformat' },
            tools: { title: 'Tools', items: 'spellchecker spellcheckerlanguage | wordcount' },
        },
        plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace visualblocks wordcount',
	table_toolbar: '',
       toolbar: 'undo redo | blocks | bold italic underline strikethrough | link image media | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
        toolbar_mode: 'floating',
});
    tinymce.init({
    selector: '#ml-sponsors',
    menu: {
        edit: { title: 'Edit', items: 'undo redo | cut copy paste | selectall' },
        format: { title: 'Format', items: 'bold italic underline | removeformat' },
        tools: { title: 'Tools', items: 'spellchecker spellcheckerlanguage | wordcount' },
    },
    plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
    toolbar: 'undo redo | blocks | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
    toolbar_mode: 'floating',
    
});
