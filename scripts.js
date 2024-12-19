// Function to fetch hostage names from the Google Apps Script Web App
const getHostages = async () => {
  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbwmCOlxNjYXbEwnY_0ggXqXlyPCSPG7k14HkxOoNX8ImopT-tQQ2pwZhZ2la6VKfxEL/exec");
    if (!response.ok) throw new Error(`Network response was not OK. Status: ${response.status}`);
    const hostages = await response.json();

    // Populate the hostage grid with links to individual hostage pages
    const hostageGrid = document.getElementById("hostageGrid");
    if (hostageGrid) {
      hostageGrid.innerHTML = hostages.map(hostage => `
        <div class="grid-item">
          <a href="hostage.html?id=${hostage.id}">${hostage.name}</a>
        </div>
      `).join("");
    }
  } catch (error) {
    console.error("Error fetching hostages:", error);
  }
};

// Wait until the DOM is fully loaded to call getHostages
document.addEventListener("DOMContentLoaded", getHostages);
