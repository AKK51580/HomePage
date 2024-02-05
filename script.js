const searchEngines = [
  { name: 'StartPage', logo: 'images/Search-Engine-Logos/StartPage.png' },
  { name: 'DuckDuckGo', logo: 'images/Search-Engine-Logos/DuckDuckGo.png' },
  // Lisää muita hakukoneita tarvittaessa
];

// Haetaan hakukoneiden container-div
const Search_Engines = document.getElementById('Search_Engines');

// Käydään läpi hakukonelista ja lisätään div jokaiselle
searchEngines.forEach(engine => {
    // Luodaan uusi div-elementti
    const engineDiv = document.createElement('div');
    engineDiv.classList.add('engine');

    // Lisätään nimi ja logo div-elementtiin
    engineDiv.innerHTML = `
        <img src="${engine.logo}" alt="${engine.name} logo">
        <p>${engine.name}</p>
    `;

    // Lisätään luotu div hakukoneiden container-diviin
    Search_Engines.appendChild(engineDiv);
});