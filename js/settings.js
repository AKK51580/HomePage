// Funktio, joka tallentaa näkymäasetuksen localStorageen
function saveViewPreference(view) {
    localStorage.setItem("preferredView", view);
}

// Funktio, joka tallentaa näkymäasetuksen localStorageen ja vaihtaa näkymän
function switchView() {
    const gridView = document.getElementById("gridView");
    const listView = document.getElementById("listView");
    const newsFeed = document.getElementById("news-feed");

    if (gridView.checked) {
        saveViewPreference("grid");
        newsFeed.classList.remove("list");
        newsFeed.classList.add("grid");
    } else if (listView.checked) {
        saveViewPreference("list");
        newsFeed.classList.remove("grid");
        newsFeed.classList.add("list");
    }
}


document.addEventListener("DOMContentLoaded", function() {
    // Haetaan tallennettu näkymäasetus localStoragesta
    const preferredView = localStorage.getItem("preferredView");

    // Jos asetus on tallennettu ja se on 'grid', valitaan 'grid' näkymä
    if (preferredView === "grid") {
        document.getElementById("gridView").checked = true;
    } 
    // Jos asetus on tallennettu ja se on 'list', valitaan 'list' näkymä
    else if (preferredView === "list") {
        document.getElementById("listView").checked = true;
    }
});
