// FULL RSS FEED CONFIGURATION
const ALL_FEEDS = {
  "National News": [
    // --- Core Major PH Media (Original List) ---
    { url: "https://news.abs-cbn.com/feed", source: "ABS-CBN News (General)" },
    {
      url: "https://www.inquirer.net/fullfeed",
      source: "Inquirer Main (General)",
    },
    { url: "https://newsinfo.inquirer.net/feed", source: "Inquirer NewsInfo" },
    {
      url: "https://www.gmanetwork.com/news/rss/news/",
      source: "GMA News Online (General)",
    },
    {
      url: "https://www.gmanetwork.com/news/rss/regions/",
      source: "GMA Regional",
    },
    {
      url: "https://www.philstar.com/rss/headlines",
      source: "Philippine Star (General)",
    },
    { url: "https://mb.com.ph/feed/", source: "Manila Bulletin (General)" },
    {
      url: "https://www.manilatimes.net/news/feed",
      source: "Manila Times (General)",
    },
    { url: "https://www.ptvnews.ph/feed/", source: "PTV News" },
    { url: "https://www.untvweb.com/feed/", source: "UNTV News" },
    {
      url: "https://www.pna.gov.ph/rss",
      source: "Philippine News Agency (PNA)",
    },
    { url: "https://www.rappler.com/feed/", source: "Rappler Main" },
    { url: "https://www.sunstar.com.ph/rss", source: "SunStar Philippines" },
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

    // --- New: Specialized PH Sectional Feeds ---
    { url: "https://www.philstar.com/rss/nation", source: "Philstar Nation" },
    {
      url: "https://www.inquirer.net/columns/feed",
      source: "Inquirer Opinion/Columns",
    },
    {
      url: "https://www.manilatimes.net/news/national/feed/",
      source: "Manila Times Nation",
    },
    { url: "https://www.gmanetwork.com/news/rss/metro/", source: "GMA Metro" },

    // --- New: Additional Major PH News Outlets ---
    {
      url: "https://manilastandard.net/rss-feed",
      source: "Manila Standard (General)",
    },
    { url: "https://tempo.com.ph/feed/", source: "Tempo News" },
    { url: "https://tonite.abante.com.ph/feed", source: "Abante Tonite" },
    {
      url: "https://interaksyon.philstar.com/feed/",
      source: "Interaksyon (Political & Social)",
    },

    // --- New: PH Government/Institutional Feeds ---
    {
      url: "http://www.senate.gov.ph/rss/rss_news.aspx",
      source: "Senate of the Philippines (News)",
    },
    {
      url: "https://www.bsp.gov.ph/SitePages/RSS.aspx",
      source: "Bangko Sentral ng Pilipinas (BSP)",
    },
  ],

  // ===============================
  // BUSINESS / ECONOMY
  // ===============================
  "Business / Economy": [
    { url: "https://www.philstar.com/rss/money", source: "Philstar Business" },
    {
      url: "https://www.philstar.com/rss/business",
      source: "Philstar Economy",
    },
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
    {
      url: "https://www.cnnphilippines.com/business/rss",
      source: "CNN Philippines Business",
    },
    {
      url: "https://www.bsp.gov.ph/rss/MediaList.xml",
      source: "Bangko Sentral ng Pilipinas",
    },
    {
      url: "https://www.reuters.com/rssFeed/businessNews",
      source: "Reuters Business",
    },
    { url: "https://asia.nikkei.com/rss/feed/nar", source: "Nikkei Asia" },
  ],

  // ===============================
  // SPORTS
  // This section merges the two 'Sports' definitions from your original input
  // ===============================
  Sports: [
    { url: "https://www.espn.com/espn/rss/news", source: "ESPN General" },
    { url: "https://sports.inquirer.net/feed", source: "Inquirer Sports" },
    {
      url: "https://www.gmanetwork.com/news/rss/sports/",
      source: "GMA Sports",
    },
    { url: "https://www.rappler.com/sports/feed/", source: "Rappler Sports" },
    {
      url: "https://www.abs-cbn.com/sports/rss/latest-news",
      source: "ABS-CBN Sports",
    },
    {
      url: "https://nba.nbcsports.com/category/top-posts/feed/",
      source: "NBC Sports NBA",
    },
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
    { url: "https://www.espn.com/espn/rss/news", source: "ESPN General" },
    { url: "https://sports.inquirer.net/feed", source: "Inquirer Sports (PH)" },
    {
      url: "https://www.gmanetwork.com/news/rss/sports/",
      source: "GMA Sports (PH)",
    },
    {
      url: "https://www.rappler.com/sports/feed/",
      source: "Rappler Sports (PH)",
    },
    {
      url: "https://www.abs-cbn.com/sports/rss/latest-news",
      source: "ABS-CBN Sports (PH)",
    },
    {
      url: "https://www.bomboradyo.com/category/sports/feed/",
      source: "Bombo Radyo Sports (PH)",
    },
    {
      url: "https://www.philstar.com/rss/sports",
      source: "Philstar Sports (PH)",
    },
    { url: "https://www.spin.ph/feed", source: "SPIN.ph (PH)" },
    {
      url: "https://tiebreakertimes.com.ph/feed",
      source: "Tiebreaker Times (PH)",
    },
    // New general international feeds (from previous suggestions)
    {
      url: "https://rss.app/feeds/H3y9L6jQ64f5uMv2.xml",
      source: "BBC Sport (General)",
    },
    {
      url: "http://feeds.reuters.com/reuters/sportsNews",
      source: "Reuters Sports News",
    },
    {
      url: "https://www.cbssports.com/rss/headlines/",
      source: "CBS Sports (General)",
    },
  ],

  // ===============================
  // SHOWBIZ
  // ===============================
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
    {
      url: "https://rmn.ph/category/showbiz/feed/",
      source: "RMN Showbiz",
    },
    {
      url: "https://www.pep.ph/feed/",
      source: "PEP.ph",
    },
    {
      url: "https://www.pikapika.ph/feed",
      source: "Pikapika",
    },
    {
      url: "https://www.philstar.com/rss/showbiz/",
      source: "Philstar.com Showbiz",
    },
    {
      url: "https://www.gmanetwork.com/news/rss/showbiz/",
      source: "GMA News Online Showbiz",
    },
    {
      url: "https://mb.com.ph/category/entertainment/feed/",
      source: "Manila Bulletin Entertainment",
    },
    {
      url: "https://entertainment.inquirer.net/feed",
      source: "Inquirer.net Entertainment",
    },
    {
      url: "https://bandera.inquirer.net/feed",
      source: "Inquirer Bandera",
    },
  ],

  // ===============================
  // TECHNOLOGY
  // ===============================
  Technology: [
    { url: "https://www.rappler.com/technology/feed/", source: "Rappler Tech" },
    {
      url: "https://www.gmanetwork.com/news/rss/scitech/",
      source: "GMA SciTech",
    },
    { url: "https://www.theverge.com/rss/index.xml", source: "The Verge" },
    {
      url: "https://feeds.arstechnica.com/arstechnica/index",
      source: "Ars Technica",
    },
    // Global Tech News
    { url: "https://techcrunch.com/feed/", source: "TechCrunch" },
    { url: "https://www.engadget.com/rss.xml", source: "Engadget" },
    {
      url: "https://www.wired.com/feed/category/gear/latest/rss",
      source: "Wired Gear",
    },
    { url: "https://www.cnet.com/rss/news/", source: "CNET" },
    {
      url: "https://mashable.com/feeds/rss/technology",
      source: "Mashable Tech",
    },
    { url: "https://news.ycombinator.com/rss", source: "Hacker News" },
  ],

  // ===============================
  // BALITANG ESPESYAL / SPECIAL REPORTS
  // ===============================
  "Balitang Espesyal": [
    {
      url: "https://www.bomboradyo.com/category/balitang-espesyal/feed/",
      source: "Bombo Radyo Special Reports",
    },
    {
      url: "https://www.gmanetwork.com/news/rss/specialreports/",
      source: "GMA News Special Reports",
    },
    {
      url: "https://www.manilatimes.net/the-sunday-times/feed/",
      source: "Manila Times Sunday Magazine",
    },
    {
      url: "https://interaksyon.philstar.com/feed/",
      source: "Interaksyon (Political & Social)",
    },
    {
      url: "https://www.philstar.com/rss/lifestyle/features",
      source: "Philstar Lifestyle Features",
    },
    {
      url: "https://mb.com.ph/category/lifestyle/luminaries-and-life/feed/",
      source: "Manila Bulletin Luminaries & Life",
    },
    {
      url: "https://www.rappler.com/news/feed/",
      source: "Rappler News (General - Key Investigations)",
    },
  ],

  // ===============================
  // LOCAL (Social Links - Special Hardcoded List)
  // ===============================
  "Local Links": {
    // Renamed category to avoid confusion with 'General / Local'
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

  International: [
    { url: "https://www.aljazeera.com/xml/rss/all.xml", source: "Al Jazeera" },
    {
      url: "https://www.cnbc.com/id/100727362/device/rss/rss.html",
      source: "CNBC World",
    },
    { url: "https://www.france24.com/en/rss", source: "France 24" },
    { url: "https://rss.dw.com/rdf/rss-en-world", source: "DW News" },
    {
      url: "https://fulltextrssfeed.com/www.aljazeera.com/xml/rss/all.xml",
      source: "Global Echo",
    },
  ],
};

let activeCategory = "National News";
let cachedNews = [];
const BASE_API_URL = `https://api.rss2json.com/v1/api.json?rss_url=`;

// --- UI HELPERS ---

function showToast(message) {
  const existing = document.querySelector(".toast");
  if (existing) existing.remove();
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2500);
}

function updateStatus(msg) {
  document.getElementById("status-message").textContent = msg;
}

// --- DATA FETCHING ---

async function fetchNews(isManual = false) {
  const container = document.getElementById("news-container");
  container.innerHTML = Array(8).fill('<li class="skeleton"></li>').join("");
  updateStatus(`Syncing ${activeCategory}...`);

  const categoryData = ALL_FEEDS[activeCategory];

  // Handle Local Links (Static Array)
  if (categoryData && categoryData.isSocialMedia) {
    cachedNews = categoryData.items.map((item) => ({
      title: item.title,
      link: item.link,
      sourceTitle: item.source,
      pubDate: new Date().toISOString(),
    }));
    renderNews(cachedNews);
    updateStatus(`${cachedNews.length} social links active`);
    return;
  }

  // Handle RSS Feeds
  try {
    const promises = categoryData.map((feed) =>
      fetch(`${BASE_API_URL}${encodeURIComponent(feed.url)}`)
        .then((res) => res.json())
        .then((data) =>
          data.status === "ok"
            ? data.items.map((item) => ({ ...item, sourceTitle: feed.source }))
            : []
        )
        .catch(() => [])
    );

    const results = await Promise.all(promises);
    cachedNews = results
      .flat()
      .sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

    renderNews(cachedNews);
    updateStatus(`${cachedNews.length} headlines live`);
    if (isManual) showToast("Headlines updated");
  } catch (error) {
    showToast("Network error. Try again.");
  }
}

function renderNews(items) {
  const container = document.getElementById("news-container");
  container.innerHTML = "";

  if (items.length === 0) {
    container.innerHTML = `<li style="grid-column: 1/-1; text-align:center; padding: 3rem;">No results found.</li>`;
    return;
  }

  items.forEach((item) => {
    const timeStr = new Date(item.pubDate).toLocaleTimeString("en-PH", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const dateStr = new Date(item.pubDate).toLocaleDateString("en-PH", {
      month: "short",
      day: "numeric",
    });

    const li = document.createElement("li");
    li.className = "news-item";
    li.innerHTML = `
            <a href="${item.link}" target="_blank" rel="noopener">${item.title}</a>
            <div class="news-meta">
                <span class="source-tag">${item.sourceTitle}</span>
                <span>${dateStr} • ${timeStr}</span>
            </div>
        `;
    container.appendChild(li);
  });
}

// --- CONTROLS ---

document.getElementById("news-search").addEventListener("input", (e) => {
  const term = e.target.value.toLowerCase();
  const filtered = cachedNews.filter(
    (n) =>
      n.title.toLowerCase().includes(term) ||
      n.sourceTitle.toLowerCase().includes(term)
  );
  renderNews(filtered);
});

function initCategories() {
  const nav = document.getElementById("category-buttons");
  Object.keys(ALL_FEEDS).forEach((cat) => {
    const btn = document.createElement("button");
    btn.textContent = cat;
    btn.className = cat === activeCategory ? "active" : "";
    btn.onclick = () => {
      if (activeCategory === cat) return;
      activeCategory = cat;
      document
        .querySelectorAll(".category-tabs button")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      document.getElementById("news-search").value = "";
      fetchNews();
    };
    nav.appendChild(btn);
  });
}

document.getElementById("refresh-button").onclick = () => fetchNews(true);

// Start App
initCategories();
fetchNews();
