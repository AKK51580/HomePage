// var apikey = "9f469d1b993ddbebec14f363db79797b";
// var url = "https://gnews.io/api/v4/top-headlines?token=" + apikey + "&lang=fi";

// fetch(url)
//   .then((response) => response.json())
//   .then((data) => {
//     var newsContainer = document.getElementById("news");
//     data.articles.forEach(function (article) {
//       let newsElement = document.createElement("div");
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

// Määrittele kaikki RSS-syötteet yhteen taulukkoon
let rssFeeds = [
  "https://www.is.fi/rss/tuoreimmat.xml",
  //   "http://feed.androidauthority.com/",
  //   "https://wp.tekniikanmaailma.fi/feed",
  //   "https://www.techradar.com/feeds.xml",
  "https://www.theverge.com/rss/index.xml",
  "https://www.mikrobitti.fi/api/feed/v2/rss/mb",
  "http://feeds.bbci.co.uk/news/rss.xml",
  "/rss/washingtonpost.xml",
  "https://news.google.com/news/rss/headlines/section/geo/fi",
  "https://news.google.com/news/rss",
  // Lisää muita RSS-syötteitä tarvittaessa
];

// Rajoita jokaisen lähteen tuomien uutisten määrä
const maxNewsPerSource = 10;

// Funktion määrittely, joka hakee ja näyttää uutiset annetusta URL:stä
function fetchAndDisplayNews(rssFeedUrl) {
  fetch(rssFeedUrl)
    .then((response) => response.text())
    .then((data) => {
      let parser = new DOMParser();
      let xmlDoc = parser.parseFromString(data, "text/xml");

      let newsContainer = document.getElementById("news-feed");
      let items = xmlDoc.getElementsByTagName("item");

      let newsCount = 0; // Laskuri uutisten määrälle

      for (let i = 0; i < items.length; i++) {
        if (newsCount >= maxNewsPerSource) break; // Jos uutisten määrä on saavuttanut maksimin, lopeta silmukka

        let titleElement = items[i].getElementsByTagName("title")[0];
        let title = titleElement
          ? titleElement.textContent
          : "Otsikko ei saatavilla";

        let linkElement = items[i].getElementsByTagName("link")[0];
        let link = linkElement ? linkElement.textContent : "#";

        let pubDateElement = items[i].getElementsByTagName("pubDate")[0];
        let pubDate = pubDateElement
          ? new Date(pubDateElement.textContent)
          : new Date();

        let categoryElement = items[i].getElementsByTagName("category")[0];
        let category = categoryElement
          ? categoryElement.textContent
          : "Kategoria ei saatavilla";

        let descriptionElement =
          items[i].getElementsByTagName("description")[0];
        let description = descriptionElement
          ? descriptionElement.textContent
          : "Kuvaus ei saatavilla";

        let options = {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
        };
        let formattedDate = pubDate.toLocaleDateString("fi-FI", options);

        let newsElement = document.createElement("div");
        newsElement.classList.add("news-item"); // Lisää class-nimi "news-item"
        newsElement.innerHTML = `
                    <a href="${link}" target="_blank">
                        <h2>${title}</h2>
                        <p>${description}</p>
                        <p>${category}</p>
                        <p>${formattedDate}</p>
                    </a>
                `;
        newsContainer.appendChild(newsElement);

        newsCount++; // Lisää uutisen laskuria yhdellä
      }
    })
    .catch((error) => {
      console.error("Virhe:", error);
    });
}

// Funktion kutsu, joka hakee ja näyttää uutiset kaikista RSS-syötteistä
document.addEventListener("DOMContentLoaded", function () {
  rssFeeds.forEach(function (rssFeedUrl) {
    fetchAndDisplayNews(rssFeedUrl);
  });
});
