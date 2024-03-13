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
  {
    url: "https://www.is.fi/rss/tuoreimmat.xml",
    source: "Ilta-Sanomat",
  },
  {
    url: "https://www.theverge.com/rss/index.xml",
    source: "The Verge",
  },
  {
    url: "https://www.mikrobitti.fi/api/feed/v2/rss/mb",
    source: "Mikrobitti",
  },
  {
    url: "http://feeds.bbci.co.uk/news/rss.xml",
    source: "BBC News",
  },
  {
    url: "",
    source: "Washington Post",
  },
  {
    url: "https://news.google.com/news/rss/headlines/section/geo/fi",
    source: "Google News",
  },
  {
    url: "https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml",
    source: "The New York Times",
  },
  {
    url: "http://feeds.venturebeat.com/editorspick",
    source: "Venture Beat",
  },
  {
    url: "https://muropaketti.com/feed",
    source: "Muropaketti",
  },
  {
    url: "https://api.mtvuutiset.fi/mtvuutiset/api/feed/rss/uutiset_uusimmat",
    source: "MTV Uutiset",
  },
  {
    url: "https://techcrunch.com/feed/",
    source: "TechCrunch",
  },
  {
    url: "https://www.cnet.com/rss/news/",
    source: "CNET",
  },
  {
    url: "https://www.tomshardware.com/feeds/all",
    source: "Tom's Hardware",
  },
  {
    url: "https://www.tivi.fi/api/feed/v2/rss/tv",
    source: "Tivi",
  },
  {
    url: "https://www.androidpolice.com/feed/",
    source: "Android Police",
  },
  {
    url: "https://www.windowscentral.com/feed.xml",
    source: "Windows Central",
  },
  {
    url: "https://feeds.yle.fi/uutiset/v1/recent.rss?publisherIds=YLE_UUTISET&concepts=18-139752",
    source: "YLE Uutiset Lappi",
  },
  {
    url: "https://www.theregister.com/headlines.atom",
    source: "The Register",
  },
  {
    url: "https://www.gamereactor.com/rss/rss.php?texttype=[4,1,2,3,5,9,10,7,8,11]",
    source: "GAMEREACTOR",
  },
  {
    url: "https://www.gamereactor.fi/rss/rss.php?texttype=[4,1,2,3,5,9,10,7,8,11]",
    source: "GAMEREACTOR FI",
  },
  {
    url: "https://feeds.theguardian.com/theguardian/uk/rss",
    source: "The Guardian",
  },
  {
    url: "https://feeds.bloomberg.com/technology/news.rss",
    source: "Bloomberg",
  },
  {
    url: "https://feeds.bloomberg.com/politics/news.rss",
    source: "Bloomberg",
  },
  {
    url: "https://feeds.npr.org/",
    source: "NPR",
  },
  {
    url: "http://rss.politico.com/morningtech.xml",
    source: "Politico",
  },
  {
    url: "https://rss.politico.com/politics-news.xml",
    source: "Politico",
  },
  {
    url: "http://rss.cnn.com/rss/edition.rss",
    source: "CNN",
  },
  {
    url: "https://meduza.io/rss/en/all",
    source: "Meduza",
  },
  {
    url: "https://www.zdnet.com/news/rss.xml",
    source: "ZDNET",
  },
  {
    url: "http://feed.androidauthority.com/",
    source: "Android Authority",
  },
  {
    url: "https://www.techradar.com/feeds.xml",
    source: "Techradar",
  },
  {
    url: "https://www.neowin.net/news/rss/",
    source: "Neowin",
  },
  {
    url: "https://www.episodi.fi/feed",
    source: "Episodi",
  },
  {
    url: "https://www.forbes.com/technology/feed",
    source: "Forbes",
  },
  {
    url: "https://www.tekniikkatalous.fi/api/feed/v2/rss/tt",
    source: "Tekniikkatalous",
  },
  {
    url: "https://markets.businessinsider.com/rss/news",
    source: "Business Insider",
  },
  {
    url: "https://markets.businessinsider.com/",
    source: "Business Insider",
  },
  {
    url: "https://feeds.kauppalehti.fi/rss/popular",
    source: "Kauppalehti",
  },
  {
    url: "https://feeds.kauppalehti.fi/rss/main",
    source: "Kauppalehti",
  },
  {
    url: "http://www.hs.fi/rss/teasers/etusivu.xml",
    source: "Helsingin Sanomat",
  },
  {
    url: "http://www.hs.fi/rss/tuoreimmat.xml",
    source: "Helsingin Sanomat",
  },
  // Lisää muita RSS-syötteitä tarvittaessa
];

// Rajoita jokaisen lähteen tuomien uutisten määrä
const maxNewsPerSource = 10;

// Funktion määrittely, joka hakee ja näyttää uutiset annetusta URL:stä
function fetchAndDisplayNews(feed) {
  fetch(feed.url)
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

        let maxLength = 450; // Maksimipituus
        let descriptionElement =
          items[i].getElementsByTagName("description")[0];
        let description = descriptionElement
          ? descriptionElement.textContent
          : "Kuvaus ei saatavilla";

        if (description.length > maxLength) {
          let lastSpaceIndex = description.lastIndexOf(" ", maxLength); // Etsi viimeinen välilyönti ennen maksimipituutta
          description = description.slice(0, lastSpaceIndex) + "..."; // Leikkaa teksti viimeiseen välilyöntiin ja lisää perään kolme pistettä
        }

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
                        <h3>${feed.source}</h3> <!-- Lisää lähteen nimi uutisen yläpuolelle -->
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
  rssFeeds.forEach(function (feed) {
    fetchAndDisplayNews(feed);
  });
});
