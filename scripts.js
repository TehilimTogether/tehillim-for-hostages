// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function() {
  const hostagesGrid = document.getElementById("hostagesGrid");

  // Fetch hostage names and display them in a grid
  fetch("https://script.google.com/macros/s/AKfycbwbj1MLCTVPHDHrSwhHC5iuEtjMYc_SmACWn0ynrcX6L-nb9xJ3xcjiHo1OCrexZ8pK/exec")
    .then(response => response.json())
    .then(data => {
      if (!data || data.length === 0) {
        console.error("No data received for hostages.");
        hostagesGrid.innerHTML = "No hostages available.";
        return;
      }

      hostagesGrid.innerHTML = ''; // Clear any existing content

      // Loop through each hostage and create a link
      data.forEach(hostage => {
        const hostageLink = document.createElement("a");
        hostageLink.href = `hostage.html?id=${hostage.id}`;
        hostageLink.classList.add("hostageLink");
        hostageLink.textContent = hostage.name;

        // Append each hostage link to the grid
        hostagesGrid.appendChild(hostageLink);
      });
    })
    .catch(error => {
      console.error("Error fetching hostages:", error);
      hostagesGrid.innerHTML = "Failed to load hostages. Please try again later.";
    });
});
