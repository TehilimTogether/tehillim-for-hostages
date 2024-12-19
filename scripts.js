// scripts.js

// Function to fetch hostage names from the Google Apps Script Web App
const getHostages = async () => {
  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbz5_tBaArtfum1bdkqudVKuKTtibUhHrHnVOIIcIcI3bBRrlI0gpremIj8Cjli1gtQ/exec");
    if (!response.ok) throw new Error(`Network response was not OK. Status: ${response.status}`);
    const hostages = await response.json();

    // Populate the dropdown with hostage names
    const hostageDropdown = document.getElementById("hostageDropdown");
    hostageDropdown.innerHTML = hostages.map((name) => `<option value="${name}">${name}</option>`).join("");
  } catch (error) {
    console.error("Error fetching hostages:", error);
  }
};

// Function to handle form submission
const handleFormSubmit = async (event) => {
  event.preventDefault(); // Prevent default form submission

  // Get form data
  const hostage = document.getElementById("hostageDropdown").value;
  const chapter = document.getElementById("tehillimChapter").value;

  if (!hostage || !chapter) {
    alert("Please select a hostage and a chapter.");
    return;
  }

  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbz5_tBaArtfum1bdkqudVKuKTtibUhHrHnVOIIcIcI3bBRrlI0gpremIj8Cjli1gtQ/exec", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ hostage, chapter }),
    });

    if (!response.ok) throw new Error(`Failed to submit: ${response.statusText}`);

    alert("Your chapter has been recorded. Thank you!");
  } catch (error) {
    console.error("Error submitting form:", error);
    alert("Failed to submit your choice. Please try again later.");
  }
};

// Attach event listener to the form
document.getElementById("tehillimForm").addEventListener("submit", handleFormSubmit);

// Call the function to fetch hostages on page load
getHostages();
