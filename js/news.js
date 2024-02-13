// var apikey = "9f469d1b993ddbebec14f363db79797b";
// var url = "https://gnews.io/api/v4/top-headlines?token=" + apikey + "&lang=fi";

// fetch(url)
//   .then((response) => response.json())
//   .then((data) => {
//     var newsContainer = document.getElementById("news");
//     data.articles.forEach(function (article) {
//       var newsElement = document.createElement("div");
//       newsElement.innerHTML = `
//                 <h2>${article.title}</h2>
//                 <p>${article.description}</p>
//                 <a href="${article.url}" target="_blank">Read more</a>
//                 <hr>
//             `;
//       newsContainer.appendChild(newsElement);
//     });
//   })
//   .catch((error) => {
//     console.error("Error:", error);
//   });

var rssFeedUrl = "https://www.is.fi/rss/tuoreimmat.xml";

// Funktion määrittely, joka hakee ja näyttää uutiset annetusta URL:stä
function fetchAndDisplayNews(rssFeedUrl) {
  fetch(rssFeedUrl)
    .then((response) => response.text())
    .then((data) => {
      var parser = new DOMParser();
      var xmlDoc = parser.parseFromString(data, "text/xml");

      var newsContainer = document.getElementById("news");
      var items = xmlDoc.getElementsByTagName("item");

      for (var i = 0; i < items.length; i++) {
        var titleElement = items[i].getElementsByTagName("title")[0];
        var title = titleElement
          ? titleElement.textContent
          : "Otsikko ei saatavilla";

        var linkElement = items[i].getElementsByTagName("link")[0];
        var link = linkElement ? linkElement.textContent : "#";

        var pubDateElement = items[i].getElementsByTagName("pubDate")[0];
        var pubDate = pubDateElement
          ? new Date(pubDateElement.textContent)
          : new Date();

        var categoryElement = items[i].getElementsByTagName("category")[0];
        var category = categoryElement
          ? categoryElement.textContent
          : "Kategoria ei saatavilla";

        var descriptionElement =
          items[i].getElementsByTagName("description")[0];
        var description = descriptionElement
          ? descriptionElement.textContent
          : "Kuvaus ei saatavilla";

        var options = {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
        };
        var formattedDate = pubDate.toLocaleDateString("fi-FI", options);

        var newsElement = document.createElement("div");
        newsElement.innerHTML = `
          <a href="${link}" target="_blank">
            <h2>${title}</h2>
            <p>${description}</p>
            <p>Kategoria: ${category}</p>
            <p>Julkaistu: ${formattedDate}</p>
          </a>
          <hr>
        `;
        newsContainer.appendChild(newsElement);
      }
    })
    .catch((error) => {
      console.error("Virhe:", error);
    });
}

// Funktion kutsu, joka hakee ja näyttää uutiset sivun latautuessa
document.addEventListener("DOMContentLoaded", function () {
  fetchAndDisplayNews(rssFeedUrl);
});

// Funktion kutsu, joka hakee ja näyttää lisää uutisia, kun käyttäjä skrollaa sivun alareunaan
window.addEventListener("scroll", function () {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    fetchAndDisplayNews(rssFeedUrl);
  }
});
