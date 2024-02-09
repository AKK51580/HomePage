// Lisätään kuuntelija Enter-näppäimen painallukselle koko dokumentissa
document.addEventListener("keypress", function (event) {
    // Tarkista onko Enter-näppäintä painettu ja onko hakukone valittu
    if (event.key === "Enter" && selectedEngine !== "") {
      const searchQuery = searchInput.value;
      const searchURL =
        searchEngines.find((engine) => engine.name === selectedEngine).url +
        encodeURIComponent(searchQuery);
      window.location.href = searchURL; // Siirry hakutuloksiin nykyisessä välilehdessä
    }
  });
  
    // Käsitellään swipe-oikealle tapahtumaa
    let startX;
    let endX;
    document.getElementById("Search_Bar").addEventListener("touchstart", function(event) {
      startX = event.touches[0].clientX;
    });

    document.getElementById("Search_Bar").addEventListener("touchend", function(event) {
      endX = event.changedTouches[0].clientX;
      if (startX - endX > 50) {
        search();
      }
    });

  // Lisää Clear-nappulan toiminnallisuus
  let clearButton = document.getElementById("clearInput");
    clearButton.addEventListener("click", function() {
      let searchInput = document.getElementById("searchInput");
      searchInput.value = ""; // Tyhjennä input-kenttä
      searchInput.focus(); // Aseta input-kenttä takaisin aktiiviseksi
  });
  
  // Asetetaan syötekenttä aktiiviseksi sivun avautuessa
  window.onload = function () {
    document.getElementById("searchInput").focus();
  };