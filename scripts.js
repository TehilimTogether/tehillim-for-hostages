// Fetch the list of hostages
const getHostages = async () => {
  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbz5_tBaArtfum1bdkqudVKuKTtibUhHrHnVOIIcIcI3bBRrlI0gpremIj8Cjli1gtQ/exec");
    if (!response.ok) throw new Error("Failed to fetch hostages");
    
    const hostages = await response.json();

    // Render list of hostages
    const hostageList = document.getElementById("hostageList");
    hostageList.innerHTML = hostages.map(hostage => {
      return `<div class="hostage">
                <a href="hostage.html?hostage=${encodeURIComponent(hostage)}">${hostage}</a>
              </div>`;
    }).join('');
  } catch (error) {
    console.error("Error fetching hostages:", error);
  }
};

// Call the function to load the hostages on the index page
if (document.getElementById("hostageList")) {
  getHostages();
}

// Function to get query parameters from URL
const getQueryParameter = (name) => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
};

// Generate chapter buttons for the selected hostage
const generateChapters = () => {
  const hostageName = getQueryParameter("hostage");
  document.getElementById("hostageName").innerText = hostageName;

  let chapters = '';
  for (let i = 1; i <= 150; i++) {
    chapters += `<button class="chapter" id="chapter-${i}" onclick="selectChapter(${i})">${i}</button>`;
  }

  document.getElementById("chapterList").innerHTML = chapters;
};

// Store selected chapters
let selectedChapters = [];

const selectChapter = (chapter) => {
  const chapterButton = document.getElementById(`chapter-${chapter}`);
  
  // If the chapter is already selected, do nothing
  if (chapterButton.classList.contains('selected')) return;

  chapterButton.classList.add('selected');
  selectedChapters.push(chapter);
};

// Handle form submission
const submitForm = async (event) => {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;

  if (!selectedChapters.length) {
    alert("Please select at least one chapter.");
    return;
  }

  const hostageName = getQueryParameter("hostage");

  try {
    // Prepare data to be sent to Google Apps Script
    const data = {
      name,
      email,
      hostageName,
      selectedChapters,
    };

    const response = await fetch("https://script.google.com/macros/s/AKfycbz5_tBaArtfum1bdkqudVKuKTtibUhHrHnVOIIcIcI3bBRrlI0gpremIj8Cjli1gtQ/exec", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (result.status === 'success') {
      alert('Thank you for signing up!');
      // Disable further chapter selection
      updateChapterStatus(selectedChapters);
    } else {
      alert('Error signing up. Please try again.');
    }
  } catch (error) {
    console.error("Error submitting form:", error);
  }
};

// Function to update chapter status after form submission
const updateChapterStatus = (selectedChapters) => {
  selectedChapters.forEach(chapter => {
    const chapterButton = document.getElementById(`chapter-${chapter}`);
    chapterButton.classList.add('selected');
    chapterButton.disabled = true;
  });
};

// Call the function to generate chapters on hostage page load
if (document.getElementById("chapterList")) {
  generateChapters();
}
