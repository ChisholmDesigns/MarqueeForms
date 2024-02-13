
if(!$('.splide__list.a').length){	
  // hide .hack30-static-title
  $('.no-marquee-div').show();
}


document.addEventListener("DOMContentLoaded", function() {
  // Function to update the border radius on the last visible tab within a specific parent component
  function updateLastTabBorderRadius(parentSelector) {
    const parentElement = document.querySelector(parentSelector); // Find the specific parent tab component
    if (!parentElement) return; // Exit if the parent element isn't found

    const tabs = parentElement.querySelectorAll('.linktab'); // Find tabs within this parent
    let lastVisibleTab = null;

    // Reset styles for all tabs initially
    tabs.forEach(tab => {
      if (tab.offsetParent !== null) {
        lastVisibleTab = tab; // Update last visible tab if the current tab is visible
        tab.style.borderTopRightRadius = '0'; // Reset border radius for non-last tabs
        tab.style.borderBottomRightRadius = '0'; // Reset border radius for non-last tabs
      }
    });

    // Apply border radius to the last visible tab
    if (lastVisibleTab) {
      lastVisibleTab.style.borderTopRightRadius = '60px'; // Adjust as per your design
      lastVisibleTab.style.borderBottomRightRadius = '60px'; // Adjust as per your design
    }
  }

    // Initial call to apply styles to the last tab
  updateLastTabBorderRadius();

  // Optional: Reapply whenever the tabs are updated or a tab is clicked
  // This might be necessary if your tabs dynamically change or are dependent on user interaction
  document.querySelector('.tab-menu-5').addEventListener('click', function() {
    setTimeout(updateLastTabBorderRadius, 50); // Delay to ensure the visibility state is updated
  });
});

  document.getElementById('refreshButton').addEventListener('click', function() {
    var uniqueToken = new Date().getTime();
    var newUrl = window.location.href.split('?')[0] + '?cacheBust=' + uniqueToken;
    window.location.href = newUrl;
  });
$(document).ready(function() {
  // Count for each category
  const standardCount = $('[data-category="Marquee Pro"]').length;
  const liteCount = $('[data-category="Marquee"]').length;
  const eventCount = $('[data-category="Event"]').length;

  // Display the counts
  $('.standard-count').text(standardCount);
  $('.lite-count').text(liteCount);
  $('.event-count').text(eventCount);
});

window.onload = function(){
    document.querySelector("#fs_cmssort_button").click();
    document.querySelector("#fs_cmssort_button2").click();
};

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

    document.addEventListener("DOMContentLoaded", function() {
        const copyButtons = document.querySelectorAll(".copyButton");

        copyButtons.forEach(copyButton => {
            copyButton.addEventListener("click", function() {
                const parentContainer = copyButton.closest(".stepblock");
                const artistFormButton = parentContainer.querySelector(".dashboard-button");

                const textArea = document.createElement("textarea");
                textArea.value = artistFormButton.href;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand("Copy");
                document.body.removeChild(textArea);
                alert("URL copied to clipboard!");
            });
        });
    });



document.addEventListener("DOMContentLoaded", function () {
  var splideElements = document.querySelectorAll(".splide .splide__slide");
  var itemCount = splideElements.length;
  var splideOptions = {
    type: itemCount > 4 ? "loop" : "slide", // Conditional type based on item count
    perPage: 4,
    perMove: 1,
    focus: "left",
    gap: "1rem",
    speed: 500,
    pagination: false,
    arrows: itemCount > 4, // Conditionally show arrows based on item count
    easing: "cubic-bezier(0.16, 1, 0.3, 1)",
    autoplay: false, // Keeps autoplay disabled
    pauseOnHover: true,
    keyboard: true,
    reducedMotion: {
      speed: 0,
      rewindSpeed: 0,
      autoplay: "pause"
    },
    breakpoints: {
      991: {
        perPage: 2
      },
      767: {
        perPage: 1
      }
    }
  };

  var splide = new Splide(".splide", splideOptions).mount();

  // Hide arrows if there are less than 4 items
  if (itemCount <= 4) {
    var arrowButtons = document.querySelectorAll(".splide__arrows");
    arrowButtons.forEach(function(button) {
      button.style.display = 'none';
    });
  }
});

window.addEventListener('load', function() {
    setTimeout(function() {
      var sortButton = document.getElementById('fs_cmssort_button-1');
      if (sortButton) sortButton.click();
    }, 1000); // Adjust the delay as needed, here it's 1000 milliseconds (1 second)
  });

document.getElementById('refreshButton').addEventListener('click', function() {
    var uniqueToken = new Date().getTime();
    var newUrl = window.location.href.split('?')[0] + '?cacheBust=' + uniqueToken;
    window.location.href = newUrl;
  });

/**
 * Open the last tab the user had open when they revisit the page.
 * @returns {void}
 */
function initializeTabs() {
  const STORAGE_KEY = 'previousTabId';
  const tabLinks = document.querySelectorAll('[fs-anchor-element="tab"]');

  if (tabLinks.length === 0) return;
  const chosenTabId = localStorage.getItem(STORAGE_KEY);

  tabLinks.forEach((tabLink) => {
    const currentTabId = tabLink.getAttribute('data-w-tab');

    // Trigger click event on the chosen tab
    if (chosenTabId === currentTabId) {
      const tabEvent = new CustomEvent('click');

      tabLink.dispatchEvent(tabEvent);
    }

    // Save the clicked tab to localStorage
    tabLink.addEventListener('click', () => {
      if (currentTabId) {
        localStorage.setItem(STORAGE_KEY, currentTabId);
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  // Check if Webflow is loaded and use Webflow.push to run the function
  if (window.Webflow && window.Webflow.push) {
    window.Webflow.push(initializeTabs);
  } else {
    // Fallback to the readystatechange event
    document.addEventListener('readystatechange', () => {
      if (document.readyState === 'complete') {
        initializeTabs();
      }
    });
  }
});

    // Function to update the form button links
    function updateFormButtonLinks() {
        // Capture the current dashboard URL
        var dashboardUrl = window.location.href;
        
        // Get all form button elements
        var formButtons = document.querySelectorAll('.dashboard-button');
        
        // Loop through each form button element and update its href attribute
        formButtons.forEach(function(formButton) {
            // Get the existing href attribute value
            var existingHref = formButton.getAttribute('href');
            
            // Append the dashboard URL parameter to the existing href value
            var updatedHref = existingHref + '&dashboardUrl=' + encodeURIComponent(dashboardUrl);
            
            // Update the href attribute of the form button
            formButton.setAttribute('href', updatedHref);
        });
    }
    
    // Call the function to update the form button links
    updateFormButtonLinks();

