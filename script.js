// --- Configuration ---
const ALL_FEEDS = {
  "National News": [
    { url: "https://news.abs-cbn.com/feed", source: "ABS-CBN News" },
    { url: "https://www.inquirer.net/fullfeed", source: "Inquirer" },
    {
      url: "https://www.gmanetwork.com/news/rss/news/",
      source: "GMA News Online",
    },
    {
      url: "https://www.philstar.com/rss/headlines",
      source: "The Philippine Star",
    },
    { url: "https://mb.com.ph/feed/", source: "Manila Bulletin" },
    {
      url: "https://www.manilatimes.net/news/feed",
      source: "The Manila Times",
    },
    {
      url: "https://www.bomboradyo.com/category/national-news/feed/",
      source: "Bombo Radyo Nation",
    },
    {
      url: "https://www.brigadanews.ph/category/national/feed/",
      source: "Brigada News",
    },
    { url: "https://rmn.ph/feed/", source: "RMN Networks" },
    { url: "https://www.journalnews.com.ph/feed/", source: "People's Journal" },
  ],
  "Business/Economy": [
    { url: "https://www.philstar.com/rss/money", source: "Philstar Business" },
    { url: "https://businessmirror.com.ph/feed/", source: "BusinessMirror" },
    {
      url: "https://www.manilatimes.net/business/feed",
      source: "Manila Times Business",
    },
    { url: "https://www.gmanetwork.com/news/rss/money/", source: "GMA Money" },
    {
      url: "https://www.rappler.com/business/feed/",
      source: "Rappler Business",
    },
    { url: "https://www.bworldonline.com/feed/", source: "BusinessWorld" },
  ],
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
    { url: "https://www.philstar.com/rss/sports", source: "Philstar Sports" },
    { url: "https://www.spin.ph/feed", source: "SPIN.ph" },
    { url: "https://tiebreakertimes.com.ph/feed", source: "Tiebreaker Times" },
  ],
  Showbiz: [
    {
      url: "https://www.abs-cbn.com/entertainment/rss/latest-news",
      source: "ABS-CBN Entertainment",
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
    { url: "https://www.pikapika.ph/feed", source: "Pikapika" },
  ],
  Politics: [
    {
      url: "http://rss.cnn.com/rss/cnn_allpolitics.rss",
      source: "CNN Politics",
    },
    { url: "https://www.politiko.com.ph/feed", source: "Politiko PH" },
    {
      url: "https://www.manilatimes.net/opinion/feed",
      source: "Manila Times Opinion",
    },
  ],
  General: [
    { url: "https://www.rappler.com/rss", source: "Rappler Main" },
    {
      url: "https://www.brigadanews.ph/category/local-news/feed/",
      source: "Brigada Local",
    },
    {
      url: "https://rmn.ph/category/police-report/feed/",
      source: "RMN Police Report",
    },
    { url: "https://www.sunstar.com.ph/rss/cebu", source: "SunStar Cebu" },
    { url: "https://www.sunstar.com.ph/rss/davao", source: "SunStar Davao" },
  ],
  International: [
    {
      url: "https://feeds.bbci.co.uk/news/world/rss.xml",
      source: "BBC World News",
    },
    {
      url: "http://rss.cnn.com/rss/cnn_topstories.rss",
      source: "CNN Top Stories",
    },
    { url: "http://rss.cnn.com/rss/cnn_world.rss", source: "CNN World" },
    { url: "https://www.aljazeera.com/xml/rss/all.xml", source: "Al Jazeera" },
    { url: "https://www.reutersagency.com/feed/", source: "Reuters" },
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

let activeCategory = "National News";
const BASE_API_URL = `https://api.rss2json.com/v1/api.json?rss_url=`;

// Updates status bar and handles button icon animation
function updateStatus(message, isLoading = false) {
  const formatted = message.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  statusMessage.innerHTML = formatted;

  refreshButton.disabled = isLoading;
  const icon = refreshButton.querySelector(".icon");

  if (icon) {
    if (isLoading) {
      icon.classList.add("spinner");
      icon.innerHTML = "⏳";
    } else {
      icon.classList.remove("spinner");
      icon.innerHTML = "🔄";
    }
  }
}

function isNewNews(pubDate) {
  const publishedTime = new Date(pubDate).getTime();
  const currentTime = new Date().getTime();
  return currentTime - publishedTime < 6 * 60 * 60 * 1000;
}

function createCategoryButtons() {
  buttonContainer.innerHTML = "";
  Object.keys(ALL_FEEDS).forEach((category) => {
    const btn = document.createElement("button");
    btn.textContent = category;
    btn.className = category === activeCategory ? "active" : "";
    btn.onclick = () => {
      if (activeCategory !== category) {
        activeCategory = category;
        createCategoryButtons(); // Refresh active state
        fetchNews();
      }
    };
    buttonContainer.appendChild(btn);
  });
}

async function fetchNews(isManual = false) {
  updateStatus(`Fetching **${activeCategory}**...`, true);
  newsContainer.innerHTML = '<li class="loading">⏳ Loading headlines...</li>';

  const feeds = ALL_FEEDS[activeCategory] || [];
  const promises = feeds.map((feed) =>
    fetch(`${BASE_API_URL}${encodeURIComponent(feed.url)}`)
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => {
        if (data.status !== "ok") return [];
        return data.items.slice(0, 5).map((item) => ({
          ...item,
          sourceTitle: feed.source,
        }));
      })
      .catch(() => [])
  );

  try {
    const results = await Promise.all(promises);
    const allItems = results
      .flat()
      .sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

    newsContainer.innerHTML = "";

    if (allItems.length === 0) {
      newsContainer.innerHTML =
        '<li class="loading">No news found right now.</li>';
    } else {
      allItems.forEach((item) => {
        const li = document.createElement("li");
        li.className = "news-item";
        const date = new Date(item.pubDate).toLocaleString("en-US", {
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });

        li.innerHTML = `
          <div>
            ${
              isNewNews(item.pubDate)
                ? '<span class="new-badge">NEW</span>'
                : ""
            }
            <a href="${item.link}" target="_blank" rel="noopener noreferrer">${
          item.title
        }</a>
          </div>
          <span class="news-meta">
            Source: <strong>${item.sourceTitle}</strong> | ${date}
          </span>
        `;
        newsContainer.appendChild(li);
      });
    }

    updateStatus(
      isManual
        ? `Refreshed **${allItems.length}** headlines.`
        : `Showing **${activeCategory}**.`,
      false
    );
  } catch (e) {
    updateStatus("🚨 Error connecting to news feeds.", false);
  }
}

// Attach event listener to the refresh button
refreshButton.addEventListener("click", () => {
  fetchNews(true);
});

// Initial Launch
createCategoryButtons();
fetchNews();

// Auto-refresh every 20 minutes
setInterval(() => fetchNews(false), 20 * 60 * 1000);
