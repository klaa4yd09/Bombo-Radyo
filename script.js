// --- Configuration ---
// Map the feed URL to a user-friendly Category and Source Name
const ALL_FEEDS = {
  // 1. National / General
  "National News": [
    // Core National Sources
    { url: "https://news.abs-cbn.com/feed", source: "ABS-CBN Main" },
    { url: "https://www.inquirer.net/fullfeed", source: "Inquirer Main" },
    {
      url: "https://www.gmanetwork.com/news/rss/news/",
      source: "GMA News Online",
    },
    {
      url: "https://www.bomboradyo.com/category/national-news/feed/",
      source: "Bombo Radyo Nation",
    },
    {
      url: "https://www.brigadanews.ph/category/national/feed/",
      source: "Brigada Nation",
    },
    { url: "https://rmn.ph/feed/", source: "RMN Nation (Main)" },
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
  // 4. Politics
  Politics: [
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
const refreshButton = document.getElementById("refresh-button");
const statusMessage = document.getElementById("status-message");

let activeCategory = "National News"; // Default category
const BASE_API_URL = `https://api.rss2json.com/v1/api.json?rss_url=`;

/**
 * Updates the status message in the header.
 * @param {string} message The message to display.
 * @param {boolean} [isLoading=false] If true, disables the refresh button and adds a spinner.
 */
function updateStatus(message, isLoading = false) {
  statusMessage.innerHTML = message;
  refreshButton.disabled = isLoading;
  const iconSpan = refreshButton.querySelector(".icon");
  if (iconSpan) {
    iconSpan.innerHTML = isLoading ? "⏳" : "🔄";
    iconSpan.classList.toggle("spinner", isLoading);
  }
}

/**
 * Checks if a news item is considered "New" (published within the last 6 hours).
 * @param {string} pubDate The publication date string from the RSS feed.
 * @returns {boolean} True if the item is new.
 */
function isNewNews(pubDate) {
  const publishedTime = new Date(pubDate).getTime();
  const currentTime = new Date().getTime();
  const sixHoursInMs = 6 * 60 * 60 * 1000;
  return currentTime - publishedTime < sixHoursInMs;
}

// --- Category Button Logic ---
function createCategoryButtons() {
  buttonContainer.innerHTML = "";

  Object.keys(ALL_FEEDS).forEach((category) => {
    const button = document.createElement("button");
    button.textContent = category;
    button.setAttribute("data-category", category);
    button.onclick = () => filterNews(category);

    if (category === activeCategory) {
      button.classList.add("active");
    }
    buttonContainer.appendChild(button);
  });
}

// --- Filtering Logic ---
function filterNews(category) {
  if (activeCategory === category && !refreshButton.disabled) {
    // If the category is already active, treat the click as a refresh
    fetchNews(true); // Force refresh
    return;
  }

  activeCategory = category; // Update active button state

  document.querySelectorAll("#category-buttons button").forEach((btn) => {
    btn.classList.remove("active");
    if (btn.textContent === category) btn.classList.add("active");
  });

  fetchNews();
}

// --- Fetching and Sorting Logic ---
/**
 * Fetches, sorts, and renders news for the active category.
 * @param {boolean} [isManualRefresh=false] Flag to indicate if this was triggered by the refresh button.
 */
async function fetchNews(isManualRefresh = false) {
  // 1. Show loading message and state immediately
  updateStatus(`Fetching **${activeCategory}** headlines...`, true);
  newsContainer.innerHTML =
    '<li class="loading"><span class="icon spinner">⏳</span> Loading headlines... please wait.</li>';

  const feedsToFetch = ALL_FEEDS[activeCategory] || [];
  const fetchPromises = [];
  const errorFeeds = [];

  // 2. Create all fetch promises
  feedsToFetch.forEach((feed) => {
    const API_URL = `${BASE_API_URL}${encodeURIComponent(feed.url)}`;

    const fetchPromise = fetch(API_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.status !== "ok" || !data.items) {
          return [];
        }

        // Use the specified source name if the feed title is empty or generic
        const feedTitle =
          data.feed.title && data.feed.title.length > 5
            ? data.feed.title
            : feed.source;

        // Map and include the source information, limiting items to top 5
        return data.items.slice(0, 5).map((item) => ({
          ...item,
          sourceTitle: feedTitle,
        }));
      })
      .catch((error) => {
        console.error(`Fetch error for ${feed.source}:`, error);
        errorFeeds.push(feed.source);
        return [];
      });

    fetchPromises.push(fetchPromise);
  });

  try {
    // 3. Wait for all promises to resolve
    const results = await Promise.all(fetchPromises);
    // 4. Flatten the array of results
    let allNewsItems = results.flat();

    // 5. Sort the collected items by publication date (newest first)
    allNewsItems.sort((a, b) => {
      const dateA = new Date(a.pubDate).getTime();
      const dateB = new Date(b.pubDate).getTime();
      return dateB - dateA;
    });

    // 6. Clear the container and render the sorted items
    newsContainer.innerHTML = "";
    const fragment = document.createDocumentFragment();

    if (allNewsItems.length === 0) {
      newsContainer.innerHTML =
        '<li class="loading">No news found for this category or all feeds failed to load.</li>';
    } else {
      allNewsItems.forEach((item) => {
        const listItem = document.createElement("li");
        listItem.className = "news-item";

        const isNew = isNewNews(item.pubDate);

        const formattedDate = new Date(item.pubDate).toLocaleString("en-US", {
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });

        const newBadge = isNew ? '<span class="new-badge">NEW</span>' : "";

        listItem.innerHTML = `
                    <a href="${item.link}" target="_blank" rel="noopener noreferrer">
                        ${item.title}
                    </a>
                    ${newBadge}
                    <span class="news-meta">
                        Source: **${item.sourceTitle}** | Published: ${formattedDate}
                    </span>
                `;
        fragment.appendChild(listItem);
      });
      newsContainer.appendChild(fragment);
    }

    // 7. Display any error messages at the end
    if (errorFeeds.length > 0) {
      const errorList = document.createElement("ul");
      errorFeeds.forEach((source) => {
        const errorItem = document.createElement("li");
        errorItem.className = "news-item error-item";
        errorItem.innerHTML = `⚠️ **Error:** Failed to load headlines from **${source}**.`;
        errorList.appendChild(errorItem);
      });
      newsContainer.appendChild(errorList);
    }

    // 8. Update status bar with success message
    const totalItems = allNewsItems.length;
    const message = isManualRefresh
      ? `Refreshed successfully. Found **${totalItems}** headlines.`
      : `Showing **${activeCategory}**. Found **${totalItems}** headlines.`;

    updateStatus(message, false);
  } catch (e) {
    // Catch any unexpected error in the overall process
    newsContainer.innerHTML =
      '<li class="loading error-item">🚨 An unexpected error occurred while processing feeds.</li>';
    console.error("Critical Fetch/Sort Error:", e);
    updateStatus("🚨 Error in fetching process.", false);
  }
}

// --- Initialize and Event Listeners ---

// Manual Refresh Handler
refreshButton.addEventListener("click", () => {
  // Only refresh if not already loading
  if (!refreshButton.disabled) {
    fetchNews(true);
  }
});

// Initialization
createCategoryButtons();
fetchNews();

// Auto-refresh every 20 minutes (1,200,000 milliseconds)
setInterval(() => {
  // Auto-refresh, but don't show the manual refresh success message
  fetchNews(false);
}, 20 * 60 * 1000);
