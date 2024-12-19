// Function to fetch hostage names from the Google Apps Script Web App
const getHostages = async () => {
  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbwbj1MLCTVPHDHrSwhHC5iuEtjMYc_SmACWn0ynrcX6L-nb9xJ3xcjiHo1OCrexZ8pK/exec");
    if (!response.ok) throw new Error(`Network response was not OK. Status: ${response.status}`);
    const hostages = await response.json();

    // Populate the hostage grid with links to individual hostage pages
    const hostageGrid = document.getElementById("hostageGrid");
    hostageGrid.innerHTML = hostages.map(hostage => `
      <div class="grid-item">
        <a href="hostage.html?id=${hostage.id}">${hostage.name}</a>
      </div>
    `).join("");
  } catch (error) {
    console.error("Error fetching hostages:", error);
  }
};

// Call the function to fetch hostages on page load
document.addEventListener("DOMContentLoaded", getHostages);
