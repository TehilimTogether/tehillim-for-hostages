// Function to fetch hostage names and chapters from Google Apps Script Web App
const getHostages = async () => {
  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbz5_tBaArtfum1bdkqudVKuKTtibUhHrHnVOIIcIcI3bBRrlI0gpremIj8Cjli1gtQ/exec");
    if (!response.ok) throw new Error("Failed to fetch hostages");
    
    const hostages = await response.json();

    // Render hostages with chapters
    const hostageList = document.getElementById("hostageList");
    hostageList.innerHTML = hostages.map(hostage => {
      return `
        <div class="hostage">
          <h3>${hostage}</h3>
          <div id="chapters-${hostage}">
            ${generateChapters(hostage)}
          </div>
        </div>
      `;
    }).join('');
  } catch (error) {
    console.error("Error fetching hostages:", error);
  }
};

// Generate chapter buttons for each hostage
const generateChapters = (hostage) => {
  let chapters = '';
  for (let i = 1; i <= 150; i++) {
    chapters += `<button class="chapter" id="chapter-${hostage}-${i}" onclick="selectChapter('${hostage}', ${i})">${i}</button>`;
  }
  return chapters;
};

// Store selected chapters
let selectedChapters = {};

const selectChapter = (hostage, chapter) => {
  const chapterId = `chapter-${hostage}-${chapter}`;
  const chapterButton = document.getElementById(chapterId);
  
  // If the chapter is already selected, do nothing
  if (chapterButton.classList.contains('selected')) return;

  chapterButton.classList.add('selected');
  if (!selectedChapters[hostage]) selectedChapters[hostage] = [];
  selectedChapters[hostage].push(chapter);
};

// Handle form submission
const submitForm = async (event) => {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;

  if (!Object.keys(selectedChapters).length) {
    alert("Please select at least one chapter.");
    return;
  }

  try {
    // Prepare data to be sent to Google Apps Script
    const data = {
      name,
      email,
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
  for (const hostage in selectedChapters) {
    selectedChapters[hostage].forEach(chapter => {
      const chapterId = `chapter-${hostage}-${chapter}`;
      const chapterButton = document.getElementById(chapterId);
      chapterButton.classList.add('selected');
      chapterButton.disabled = true;
    });
  }
};

// Call the function to load hostages on page load
window.onload = getHostages;
