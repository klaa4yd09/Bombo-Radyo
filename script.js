// --- Configuration ---
const RSS_URLS = [
  "https://news.abs-cbn.com/feed",
  "https://www.rappler.com/rss",
  "https://www.inquirer.net/fullfeed",
];

const newsContainer = document.getElementById("news-container");

function fetchNews() {
  newsContainer.innerHTML =
    '<li class="loading">Fetching latest headlines...</li>';
  newsContainer.innerHTML = "";

  RSS_URLS.forEach((rssUrl) => {
    const API_URL = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(
      rssUrl
    )}`;

    fetch(API_URL)
      .then((response) => {
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        if (data.status !== "ok" || !data.items) return;

        const feedTitle = data.feed.title || "Source";

        data.items.slice(0, 5).forEach((item) => {
          const listItem = document.createElement("li");
          listItem.className = "news-item";
          listItem.innerHTML = `
            <a href="${item.link}" target="_blank" rel="noopener noreferrer">${item.title}</a>
            <span class="news-source">Source: ${feedTitle}</span>
          `;
          newsContainer.appendChild(listItem);
        });
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        const errorItem = document.createElement("li");
        errorItem.className = "news-item";
        errorItem.innerHTML = `Error fetching from <strong>${rssUrl}</strong>`;
        newsContainer.appendChild(errorItem);
      });
  });
}

// Run on page load
fetchNews();

// Auto-refresh every 30 minutes
setInterval(fetchNews, 30 * 60 * 1000);
