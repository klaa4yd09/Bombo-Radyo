// --- Configuration ---
// Map the feed URL to a user-friendly Category and Source Name
const ALL_FEEDS = {
  // National / General
  "National News": [
    { url: "https://rmn.ph/feed/", source: "RMN News" },
    {
      url: "https://www.bomboradyo.com/category/top-stories/feed/",
      source: "Bombo Radyo",
    },
    {
      url: "https://www.brigadanews.ph/category/national/feed/",
      source: "Brigada News",
    },
  ],
  // General Philippines
  General: [{ url: "https://www.rappler.com/rss", source: "Rappler Main" }],
  // Specialized Categories
  Sports: [
    { url: "https://www.rappler.com/sports/feed/", source: "Rappler Sports" },
  ],
  Showbiz: [
    {
      url: "https://www.rappler.com/entertainment/feed/",
      source: "Rappler Showbiz",
    },
  ],
  // International
  International: [
    {
      url: "http://rss.cnn.com/rss/cnn_topstories.rss",
      source: "CNN Top Stories",
    },
  ],
};

const newsContainer = document.getElementById("news-container");
const buttonContainer = document.getElementById("category-buttons");
let activeCategory = "National News"; // Default category

const BASE_API_URL = `https://api.rss2json.com/v1/api.json?rss_url=`;

// --- Category Button Logic ---
function createCategoryButtons() {
  buttonContainer.innerHTML = "";

  Object.keys(ALL_FEEDS).forEach((category) => {
    const button = document.createElement("button");
    button.textContent = category;
    button.onclick = () => filterNews(category);

    if (category === activeCategory) {
      button.classList.add("active");
    }
    buttonContainer.appendChild(button);
  });
}

// --- Filtering Logic ---
function filterNews(category) {
  activeCategory = category;
  // Update active button state
  document.querySelectorAll(".category-selector button").forEach((btn) => {
    btn.classList.remove("active");
    if (btn.textContent === category) {
      btn.classList.add("active");
    }
  });

  // Run the fetch function for the new category
  fetchNews();
}

// --- Fetching Logic (Refactored) ---
function fetchNews() {
  newsContainer.innerHTML =
    '<li class="loading">Fetching latest headlines...</li>';

  const feedsToFetch = ALL_FEEDS[activeCategory] || [];
  newsContainer.innerHTML = ""; // Clear list after setting loading message

  feedsToFetch.forEach((feed) => {
    const API_URL = `${BASE_API_URL}${encodeURIComponent(feed.url)}`;

    fetch(API_URL)
      .then((response) => {
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        if (data.status !== "ok" || !data.items) return;

        const feedTitle = data.feed.title || feed.source;

        // Combine the headlines from the category feeds
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
        errorItem.innerHTML = `Error fetching from <strong>${feed.source}</strong>`;
        newsContainer.appendChild(errorItem);
      });
  });
}

// Run on page load
createCategoryButtons();
fetchNews();

// Auto-refresh every 30 minutes
setInterval(fetchNews, 30 * 60 * 1000);
