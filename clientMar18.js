
document.addEventListener('DOMContentLoaded', async function() {
    const memberstack = window.$memberstackDom;

    // Set this variable to 'YES' or 'NO' depending on whether you want the UI to be displayed for new users
    const displayForNewUsers = 'YES';

    // Only proceed if a member is found
    const member = await memberstack.getCurrentMember();
    if (!member) {
      console.log('No member found, exiting script');
      return;
    }

    async function getUpdatesIDFromJson() {
      try {
        const memberData = await memberstack.getMemberJSON();
        console.log(`Member data: ${JSON.stringify(memberData)}`);
        return memberData?.data?.updatesID || '';
      } catch (error) {
        console.error(`Error in getUpdatesIDFromJson function: ${error}`);
      }
    }

    async function updateUpdatesIDInJson(newUpdatesID) {
      try {
        const memberData = await memberstack.getMemberJSON();
        memberData.data = memberData.data || {};
        memberData.data.updatesID = newUpdatesID;
        console.log(`Updates ID in JSON after update: ${newUpdatesID}`);
        await memberstack.updateMemberJSON({ json: memberData.data });
      } catch (error) {
        console.error(`Error in updateUpdatesIDInJson function: ${error}`);
      }
    }

    async function checkAndUpdateUI() {
      try {
        const element = document.querySelector('[ms-code-update-item]');
        const cmsItem = element.textContent;
        console.log(`CMS item: ${cmsItem}`);

        // Get the current updates ID from JSON
        const updatesIDFromJson = await getUpdatesIDFromJson();
        console.log(`Updates ID from JSON: ${updatesIDFromJson}`);

        // Check displayForNewUsers variable to decide behavior
        if (displayForNewUsers === 'NO' && !updatesIDFromJson) {
          console.log('Updates ID from JSON is undefined, null, or empty, not changing UI');
          return;
        }

        if (cmsItem !== updatesIDFromJson) {
          const uiElements = document.querySelectorAll('[ms-code-update-ui]');
          uiElements.forEach(uiElement => {
            uiElement.style.display = 'block';
            uiElement.style.opacity = '1';
          });
        }

        // Update the updates ID in JSON after the UI has been updated
        await updateUpdatesIDInJson(cmsItem);

      } catch (error) {
        console.error(`Error in checkAndUpdateUI function: ${error}`);
      }
    }

    // Check and update UI when the page loads
    checkAndUpdateUI().catch(error => {
      console.error(`Error in initial functions: ${error}`);
    });
  });


const elements = document.querySelectorAll('[ms-code-truncate]');

elements.forEach((element) => {
  const charLimit = parseInt(element.getAttribute('ms-code-truncate'));

  // Create a helper function that will recursively traverse the DOM tree
  const traverseNodes = (node, count) => {
    for (let child of node.childNodes) {
      // If the node is a text node, truncate if necessary
      if (child.nodeType === Node.TEXT_NODE) {
        if (count + child.textContent.length > charLimit) {
          child.textContent = child.textContent.slice(0, charLimit - count) + '...';
          return count + child.textContent.length;
        }
        count += child.textContent.length;
      }
      // If the node is an element, recurse through its children
      else if (child.nodeType === Node.ELEMENT_NODE) {
        count = traverseNodes(child, count);
      }
    }
    return count;
  }

  // Create a deep clone of the element to work on. This is so that we don't modify the original element
  // until we have completely finished processing.
  const clone = element.cloneNode(true);

  // Traverse and truncate the cloned node
  traverseNodes(clone, 0);

  // Replace the original element with our modified clone
  element.parentNode.replaceChild(clone, element);
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

