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
      source: "Philippine Star",
    },
    { url: "https://mb.com.ph/feed/", source: "Manila Bulletin" },
    { url: "https://www.manilatimes.net/news/feed", source: "Manila Times" },
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

    // NEW
    { url: "https://www.ptvnews.ph/feed/", source: "PTV News" },
    { url: "https://www.untvweb.com/feed/", source: "UNTV News" },
    {
      url: "https://www.gmanetwork.com/news/rss/regions/",
      source: "GMA Regional",
    },
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
    {
      url: "https://nba.nbcsports.com/category/top-posts/feed/",
      source: "NBC Sports",
    },
    { url: "https://www.rappler.com/sports/feed/", source: "Rappler Sports" },
    {
      url: "https://www.bomboradyo.com/category/sports/feed/",
      source: "Bombo Radyo Sports",
    },
    { url: "https://www.philstar.com/rss/sports", source: "Philstar Sports" },
    { url: "https://www.spin.ph/feed", source: "SPIN.ph" },
    { url: "https://tiebreakertimes.com.ph/feed", source: "Tiebreaker Times" },
    {
      url: "https://www.espn.com/espn/rss/nba/news",
      source: "ESPN NBA Headlines",
    },
    {
      url: "https://www.espn.com/espn/rss/soccer/news",
      source: "ESPN Soccer Headlines",
    },
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

  "Balitang Espesyal": [
    {
      url: "https://www.bomboradyo.com/category/balitang-espesyal/feed/",
      source: "Bombo Radyo Special Reports",
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

    // NEW
    { url: "https://www.rappler.com/technology/feed/", source: "Rappler Tech" },
  ],

  // *** START NEW CATEGORY: Social Links (Special Hardcoded List) ***
  Local: {
    isSocialMedia: true,
    items: [
      {
        title: "RMN Malaybalay ",
        link: "https://www.facebook.com/profile.php?id=100063929018518",
        source: "Facebook",
      },
      {
        title: "101.7 XFM Bukidnon",
        link: "https://www.facebook.com/101.7XFMBUKIDNON2025",
        source: "XFM Bukidnon",
      },
      {
        title: "Juander Radyo Malaybalay 90.5 FM ",
        link: "https://www.facebook.com/juanderradyomalaybalay",
        source: "Juander Radio",
      },
    ],
  },
  // *** END NEW CATEGORY ***

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

    // NEW
    {
      url: "https://apnews.com/apf-topnews?format=rss",
      source: "Associated Press",
    },
    { url: "https://feeds.npr.org/1004/rss.xml", source: "NPR World" },
    { url: "https://news.yahoo.com/rss/", source: "Yahoo News" },
    { url: "https://www.philstar.com/rss/world", source: "Philstar World" },
  ],
};

const newsContainer = document.getElementById("news-container");
const buttonContainer = document.getElementById("category-buttons");
const refreshButton = document.getElementById("refresh-button");
const statusMessage = document.getElementById("status-message");

let activeCategory = "National News";
const BASE_API_URL = `https://api.rss2json.com/v1/api.json?rss_url=`;

// Status updater
function updateStatus(message, isLoading = false) {
  statusMessage.innerHTML = message.replace(
    /\*\*(.*?)\*\*/g,
    "<strong>$1</strong>"
  );
  refreshButton.disabled = isLoading;

  const icon = refreshButton.querySelector(".icon");
  if (icon) {
    icon.innerHTML = isLoading ? "⏳" : "🔄";
    icon.classList.toggle("spinner", isLoading);
  }
}

// NOTE: isNewNews is skipped for Social Links, so we just return false
function isNewNews(pubDate) {
  return Date.now() - new Date(pubDate).getTime() < 6 * 60 * 60 * 1000;
}

function createCategoryButtons() {
  buttonContainer.innerHTML = "";
  Object.keys(ALL_FEEDS).forEach((category) => {
    const btn = document.createElement("button");
    btn.textContent = category;
    btn.className = category === activeCategory ? "active" : "";
    btn.onclick = () => {
      activeCategory = category;
      createCategoryButtons();
      fetchNews();
    };
    buttonContainer.appendChild(btn);
  });
}

async function fetchNews(isManual = false) {
  updateStatus(`Fetching **${activeCategory}**...`, true);
  newsContainer.innerHTML = `<li class="loading">⏳ Loading headlines...</li>`;

  const categoryData = ALL_FEEDS[activeCategory];
  let allItems = [];

  // --- SOCIAL MEDIA/LINK HANDLER ---
  if (categoryData && categoryData.isSocialMedia) {
    allItems = categoryData.items.map((item) => ({
      ...item,
      title: item.title,
      pubDate: null, // No date for social links
      sourceTitle: item.source,
    }));
  }
  // --- RSS FEED HANDLER ---
  else {
    const feeds = Array.isArray(categoryData) ? categoryData : [];

    const promises = feeds.map((feed) =>
      fetch(`${BASE_API_URL}${encodeURIComponent(feed.url)}`)
        .then((res) => (res.ok ? res.json() : null))
        .then((data) =>
          data && data.status === "ok"
            ? data.items
                .slice(0, 5)
                .map((item) => ({ ...item, sourceTitle: feed.source }))
            : []
        )
        .catch(() => [])
    );

    const results = await Promise.all(promises);
    allItems = results
      .flat()
      .sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
  }

  newsContainer.innerHTML = "";

  if (!allItems.length) {
    newsContainer.innerHTML = `<li class="loading">No news available.</li>`;
  }

  allItems.forEach((item) => {
    const li = document.createElement("li");
    li.className = "news-item";

    // Determine the meta-data format based on whether it's an RSS feed or Social Link
    let metaHTML;
    if (categoryData && categoryData.isSocialMedia) {
      metaHTML = `Source: <strong>${item.sourceTitle}</strong>`;
    } else {
      const date = new Date(item.pubDate).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
      metaHTML = `Source: <strong>${item.sourceTitle}</strong> | ${date}`;
    }

    li.innerHTML = `
      <div>
        ${
          item.pubDate && isNewNews(item.pubDate)
            ? `<span class="new-badge">NEW</span>`
            : ""
        }
        <a href="${item.link}" target="_blank" rel="noopener">${item.title}</a>
      </div>
      <span class="news-meta">
        ${metaHTML}
      </span>
    `;

    newsContainer.appendChild(li);
  });

  updateStatus(
    isManual
      ? `Refreshed **${allItems.length}** headlines.`
      : `Showing **${activeCategory}**.`,
    false
  );
}

refreshButton.addEventListener("click", () => fetchNews(true));

createCategoryButtons();
fetchNews();
// Only run interval for automatic fetch if the category is not Social Links
setInterval(() => {
  if (!ALL_FEEDS[activeCategory].isSocialMedia) {
    fetchNews(false);
  }
}, 20 * 60 * 1000);
