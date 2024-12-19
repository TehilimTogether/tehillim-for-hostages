// Fetch the list of hostages and display them on the homepage
fetch('https://script.google.com/macros/s/AKfycbz5_tBaArtfum1bdkqudVKuKTtibUhHrHnVOIIcIcI3bBRrlI0gpremIj8Cjli1gtQ/exec')
  .then(response => response.json())
  .then(data => {
    const hostages = data.hostages;
    const hostageList = document.getElementById('hostageList');
    hostages.forEach((hostage) => {
      const link = document.createElement('a');
      link.href = `hostage.html?name=${encodeURIComponent(hostage)}`;
      link.textContent = hostage;
      hostageList.appendChild(link);
    });
  })
  .catch(error => console.error('Error fetching hostages:', error));

// Handle the form submission for Tehillim chapter selection
function submitForm(event) {
  event.preventDefault();

  const hostageName = new URLSearchParams(window.location.search).get('name');
  const selectedChapters = Array.from(document.querySelectorAll('.chapter.selected'))
    .map(el => el.textContent);
  
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;

  fetch('https://script.google.com/macros/s/AKfycbz5_tBaArtfum1bdkqudVKuKTtibUhHrHnVOIIcIcI3bBRrlI0gpremIj8Cjli1gtQ/exec', {
    method: 'POST',
    body: JSON.stringify({ hostageName, selectedChapters, name, email })
  })
    .then(response => response.json())
    .then(data => alert(data.message))
    .catch(error => console.error('Error submitting form:', error));
}
