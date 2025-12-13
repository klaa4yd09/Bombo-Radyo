// --- Configuration ---
// Map the feed URL to a user-friendly Category and Source Name
const ALL_FEEDS = {
  // 1. National / General
  "National News": [
    // Core National Sources
    { url: "https://news.abs-cbn.com/feed", source: "ABS-CBN Main" },
    { url: "https://www.inquirer.net/fullfeed", source: "Inquirer Main" },
    {
      url: "https://www.bomboradyo.com/category/national-news/feed/",
      source: "Bombo Radyo Nation",
    },
    {
      url: "https://www.brigadanews.ph/category/national/feed/",
      source: "Brigada Nation",
    },
    // RMN National category feed remains
    { url: "https://rmn.ph/category/national/feed/", source: "RMN Nation" },
  ],

  // 2. Sports
  Sports: [
    {
      url: "https://www.abs-cbn.com/sports/rss/latest-news",
      source: "ABS-CBN Sports",
    },
    { url: "https://www.rappler.com/sports/feed/", source: "Rappler Sports" },
    {
      url: "https://www.bomboradyo.com/category/sports/feed/",
      source: "Bombo Radyo Sports",
    },
  ],

  // 3. Showbiz
  Showbiz: [
    {
      url: "https://www.abs-cbn.com/entertainment/rss/latest-news",
      source: "ABS-CBN Showbiz",
    },
    {
      url: "https://www.rappler.com/entertainment/feed/",
      source: "Rappler Showbiz",
    },
    {
      url: "https://www.brigadanews.ph/category/showbiz/feed/",
      source: "Brigada Showbiz",
    },
    { url: "https://rmn.ph/category/showbiz/feed/", source: "RMN Showbiz" },
    { url: "https://www.pep.ph/feed/", source: "PEP.ph" },
  ],

  // 4. Politics (NEW CATEGORY)
  Politics: [
    // NEW: CNN Politics RSS Feed
    {
      url: "http://rss.cnn.com/rss/cnn_allpolitics.rss",
      source: "CNN Politics",
    },
  ],

  // 5. General / Local
  "General / Local": [
    { url: "https://www.rappler.com/rss", source: "Rappler Main" },
    {
      url: "https://www.brigadanews.ph/category/local-news/feed/",
      source: "Brigada Local",
    },
    {
      url: "https://rmn.ph/category/police-report/feed/",
      source: "RMN Police Report",
    },
  ],

  // 6. International
  International: [
    {
      url: "http://rss.cnn.com/rss/cnn_topstories.rss",
      source: "CNN Top Stories",
    },
    { url: "http://rss.cnn.com/rss/cnn_world.rss", source: "CNN World News" },
    {
      url: "https://www.bomboradyo.com/category/international/feed/",
      source: "Bombo Radyo World",
    },
    { url: "https://www.rappler.com/world/feed/", source: "Rappler World" },
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
  document.querySelectorAll("#category-buttons button").forEach((btn) => {
    btn.classList.remove("active");
    if (btn.textContent === category) btn.classList.add("active");
  });

  // Run the fetch function for the new category
  fetchNews();
}

// --- Fetching Logic ---
function fetchNews() {
  // Show loading message while fetching
  newsContainer.innerHTML =
    '<li class="loading">Fetching latest headlines...</li>';

  const feedsToFetch = ALL_FEEDS[activeCategory] || [];
  // Temporarily clear list to prepare for new items
  newsContainer.innerHTML = "";

  feedsToFetch.forEach((feed) => {
    const API_URL = `${BASE_API_URL}${encodeURIComponent(feed.url)}`;

    fetch(API_URL)
      .then((response) => {
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        // Check for successful status and items
        if (data.status !== "ok" || !data.items) return;

        // Use feed title from data or source name as fallback
        const feedTitle = data.feed.title || feed.source;

        // Display up to 5 items from each source
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

// --- Initialize ---
createCategoryButtons();
fetchNews();

// Auto-refresh every 20 minutes (1,200,000 milliseconds)
setInterval(fetchNews, 20 * 60 * 1000);
