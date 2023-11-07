


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

