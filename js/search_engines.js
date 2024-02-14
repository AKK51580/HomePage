let selectedEngine = ""; // Muuttuja valitun hakukoneen nimen tallentamiseen

const searchEngines = [
  {
    name: "DuckDuckGo",
    logo: "images/Search-Engine-Logos/DuckDuckGo.png",
    url: "https://duckduckgo.com/?q=",
  },
  {
    name: "StartPage",
    logo: "images/Search-Engine-Logos/StartPage.png",
    url: "https://www.startpage.com/sp/search?query=",
  },
  {
    name: "Brave",
    logo: "images/Search-Engine-Logos/Brave.png",
    url: "https://search.brave.com/search?q=",
  },
  {
    name: "SearXNG",
    logo: "images/Search-Engine-Logos/SearXNG.png",
    url: "https://searx.techsaviours.org/search?q=",
  },
  {
    name: "GitHub",
    logo: "images/Search-Engine-Logos/GitHub.png",
    url: "https://github.com/search?q=",
  },
  {
    name: "Piped",
    logo: "images/Search-Engine-Logos/Piped.png",
    url: "https://piped.video/results?search_query=",
  },
  // Lisää muita hakukoneita tarvittaessa
];

// Haetaan hakukoneiden container-div
const Search_Engines = document.getElementById("Search-Engines");

// Käydään läpi hakukonelista ja lisätään div jokaiselle
searchEngines.forEach((engine) => {
  // Luodaan uusi button-elementti
  const engineButton = document.createElement("button");
  engineButton.classList.add("engine");

  // Aseta nappiin klikkaustapahtumankäsittelijä ja välitä parametrina hakukoneen nimi
  engineButton.addEventListener("click", () => {
    selectedEngine = engine.name; // Tallenna valittu hakukone
    // Poista 'active' -luokka kaikista napeista
    document.querySelectorAll(".engine").forEach((btn) => {
      btn.classList.remove("active");
    });
    // Lisää 'active' -luokka klikatulle napille
    engineButton.classList.add("active");
    searchInput.focus(); // Aseta input-kenttä takaisin aktiiviseksi
  });

  // Lisätään nimi ja logo div-elementtiin
  engineButton.innerHTML = `
      <img src="${engine.logo}" alt="${engine.name} logo">
      <p id="${engine.name}">${engine.name}</p>
  `;

  // Lisätään luotu nappi hakukoneiden container-diviin
  Search_Engines.appendChild(engineButton);

  // Jos kyseessä on ensimmäinen hakukone, asetetaan se oletukseksi
  if (selectedEngine === "" && searchEngines.indexOf(engine) === 0) {
    engineButton.click(); // Klikataan ensimmäistä hakukoneen nappia
  }
});
