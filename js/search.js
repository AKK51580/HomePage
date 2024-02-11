const searchInput = document.getElementById("searchInput");
const clearInputBtn = document.getElementById("clearInput");

// Lisätään kuuntelija Enter-näppäimen painallukselle koko dokumentissa
document.addEventListener("keypress", function (event) {
  // Tarkista onko Enter-näppäintä painettu ja onko hakukone valittu
  if (event.key === "Enter" && selectedEngine !== "") {
    runSearch();
  }
});

runSearchBtn.addEventListener("click", function () {
  runSearch();
});

function runSearch() {
  const searchQuery = searchInput.value;
  const searchURL =
    searchEngines.find((engine) => engine.name === selectedEngine).url +
    encodeURIComponent(searchQuery);
  window.location.href = searchURL; // Siirry hakutuloksiin nykyisessä välilehdessä
}

// Lisää Clear-nappulan toiminnallisuus
clearInputBtn.addEventListener("click", function () {
  let searchInput = document.getElementById("searchInput");
  searchInput.value = ""; // Tyhjennä input-kenttä
  toggleClearButtonVisibility();
  searchInput.focus(); // Aseta input-kenttä takaisin aktiiviseksi
});

// Lisää tapahtumankäsittelijä joka kerta kun input-arvo muuttuu
searchInput.addEventListener("input", toggleClearButtonVisibility);

// Asetetaan clearInputBtn:n näkyvyys oletuksena "none"
clearInputBtn.style.display = "none";

// Funktio tarkistaa inputin tilan ja näyttää/piilottaa clearInput-painikkeen sen mukaan
function toggleClearButtonVisibility() {
  if (searchInput.value.trim() !== "") {
    clearInputBtn.style.display = "block";
  } else {
    clearInputBtn.style.display = "none";
  }
}

// Asetetaan syötekenttä aktiiviseksi sivun avautuessa
window.onload = function () {
  searchInput.focus();
};
