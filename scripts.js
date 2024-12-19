// scripts.js

// Function to fetch hostage names from the Google Apps Script Web App
const getHostages = async () => {
  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbwbj1MLCTVPHDHrSwhHC5iuEtjMYc_SmACWn0ynrcX6L-nb9xJ3xcjiHo1OCrexZ8pK/exec");
    if (!response.ok) throw new Error(`Network response was not OK. Status: ${response.status}`);
    const hostages = await response.json();

    // Create a list of hostages with links
    const hostageListContainer = document.getElementById("hostageList");
    hostageListContainer.innerHTML = hostages.map((hostage) => 
      `<a href="hostage.html?id=${hostage}">${hostage}</a>`
    ).join("");
  } catch (error) {
    console.error("Error fetching hostages:", error);
  }
};

// Initialize the hostage list on page load
document.addEventListener("DOMContentLoaded", getHostages);
