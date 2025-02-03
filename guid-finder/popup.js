// popup.js
document.getElementById("copyGuid").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const url = tabs[0].url;
    const guid = extractGuid(url);
	var guidTitleElement = document.getElementById('guidTitle');
	
    if (guid) {
      copyGuidToClipboard(guid).then((copiedGuid) => {
        guidTitleElement.textContent = "Copied!";
      });
    } else {
		guidTitleElement.textContent = "No GUID found in the URL!";
    }
  });
});

// Utility functions
function extractGuid(url) {
  // Regex for formatted GUID (with hyphens)
  const formattedGuidRegex = /([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})/i;
  // Regex for unformatted GUID (without hyphens)
  const unformattedGuidRegex = /([a-f0-9]{8})([a-f0-9]{4})([a-f0-9]{4})([a-f0-9]{4})([a-f0-9]{12})/i;

  // Check for formatted GUID first
  const formattedMatch = url.match(formattedGuidRegex);
  if (formattedMatch) {
    return formattedMatch[0]; // Return the formatted GUID as-is
  }

  // If no formatted GUID, check for unformatted GUID
  const unformattedMatch = url.match(unformattedGuidRegex);
  if (unformattedMatch) {
    // Format the unformatted GUID
    return `${unformattedMatch[1]}-${unformattedMatch[2]}-${unformattedMatch[3]}-${unformattedMatch[4]}-${unformattedMatch[5]}`;
  }

  // If no GUID is found, return null
  return null;
}

function copyGuidToClipboard(guid) {
  return navigator.clipboard.writeText(guid).then(() => guid);
}