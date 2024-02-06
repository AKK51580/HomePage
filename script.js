let selectedEngine = ''; // Muuttuja valitun hakukoneen nimen tallentamiseen

const searchEngines = [
  { name: 'StartPage', logo: 'images/Search-Engine-Logos/StartPage.png', url: 'https://www.startpage.com/sp/search?query=' },
  { name: 'DuckDuckGo', logo: 'images/Search-Engine-Logos/DuckDuckGo.png', url: 'https://duckduckgo.com/?q=' },
  { name: 'Brave', logo: 'images/Search-Engine-Logos/Brave.png', url: 'https://search.brave.com/search?q=' },
  { name: 'GitHub', logo: 'images/Search-Engine-Logos/GitHub.png', url: 'https://github.com/search?q=' },
  { name: 'SearXNG TechSaviours', logo: 'images/Search-Engine-Logos/SearXNG.png', url: 'https://searx.techsaviours.org/search?q=' },
  // Lisää muita hakukoneita tarvittaessa
];

// Haetaan hakukoneiden container-div
const Search_Engines = document.getElementById('Search_Engines');

// Käydään läpi hakukonelista ja lisätään div jokaiselle
searchEngines.forEach(engine => {
  // Luodaan uusi button-elementti
  const engineButton = document.createElement('button');
  engineButton.classList.add('engine');

  // Aseta nappiin klikkaustapahtumankäsittelijä ja välitä parametrina hakukoneen nimi
  engineButton.addEventListener('click', () => {
    selectedEngine = engine.name; // Tallenna valittu hakukone
    // Aseta valittu hakukone aktiiviseksi visuaalisesti
    searchEngines.forEach(engine => {
      document.getElementById(engine.name).classList.remove('active');
    });
    document.getElementById(selectedEngine).classList.add('active');
  });

  // Lisätään nimi ja logo div-elementtiin
  engineButton.innerHTML = `
      <img src="${engine.logo}" alt="${engine.name} logo">
      <p id="${engine.name}">${engine.name}</p>
  `;

  // Lisätään luotu nappi hakukoneiden container-diviin
  Search_Engines.appendChild(engineButton);

  // Jos kyseessä on ensimmäinen hakukone, asetetaan se oletukseksi
  if (selectedEngine === '' && searchEngines.indexOf(engine) === 0) {
    engineButton.click(); // Klikataan ensimmäistä hakukoneen nappia
  }
});

// Haetaan hakusana syötekentästä
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('keypress', function(event) {
  // Tarkista onko Enter-näppäintä painettu ja onko hakukone valittu
  if (event.key === 'Enter' && selectedEngine !== '') {
    const searchQuery = searchInput.value;
    const searchURL = searchEngines.find(engine => engine.name === selectedEngine).url + encodeURIComponent(searchQuery);
    window.open(searchURL, '_blank');
  }
});
