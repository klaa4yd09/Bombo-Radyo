// FULL RSS FEED CONFIGURATION
const ALL_FEEDS = {
  "National News": [
    { url: "https://news.abs-cbn.com/feed", source: "ABS-CBN News" },
    { url: "https://newsinfo.inquirer.net/feed", source: "Inquirer NewsInfo" },
    { url: "https://www.gmanetwork.com/news/rss/news/", source: "GMA News Online" },
    { url: "https://www.gmanetwork.com/news/rss/regions/", source: "GMA Regional" },
    { url: "https://www.philstar.com/rss/headlines", source: "Philippine Star" },
    { url: "https://mb.com.ph/feed/", source: "Manila Bulletin" },
    { url: "https://www.manilatimes.net/news/feed", source: "Manila Times" },
    { url: "https://www.ptvnews.ph/feed/", source: "PTV News" },
    { url: "https://www.untvweb.com/feed/", source: "UNTV News" },
    { url: "https://www.pna.gov.ph/rss", source: "Philippine News Agency (PNA)" },
    { url: "https://www.rappler.com/feed/", source: "Rappler" },
    { url: "https://www.sunstar.com.ph/rss", source: "SunStar Philippines" },
    { url: "https://www.bomboradyo.com/category/national-news/feed/", source: "Bombo Radyo" },
    { url: "https://www.brigadanews.ph/category/national/feed/", source: "Brigada News" },
    { url: "https://rmn.ph/feed/", source: "RMN Networks" },
    { url: "https://www.journalnews.com.ph/feed/", source: "People's Journal" },
    { url: "https://manilastandard.net/feed", source: "Manila Standard" },
    { url: "https://tempo.com.ph/feed/", source: "Tempo News" },
    { url: "https://tonite.abante.com.ph/feed", source: "Abante Tonite" },
    { url: "https://interaksyon.philstar.com/feed/", source: "Interaksyon" },
    { url: "https://www.senate.gov.ph/rss/rss_news.aspx", source: "Senate PH" }
  ],

  "Business / Economy": [
    { url: "https://www.philstar.com/rss/business", source: "Philstar Business" },
    { url: "https://businessmirror.com.ph/feed/", source: "BusinessMirror" },
    { url: "https://www.manilatimes.net/business/feed", source: "Manila Times Business" },
    { url: "https://www.gmanetwork.com/news/rss/money/", source: "GMA Money" },
    { url: "https://www.rappler.com/business/feed/", source: "Rappler Business" },
    { url: "https://www.bworldonline.com/feed/", source: "BusinessWorld" },
    { url: "https://www.reutersagency.com/feed/?best-topics=business&post_type=best", source: "Reuters Business" },
    { url: "https://asia.nikkei.com/rss/feed/nar", source: "Nikkei Asia" }
  ],

  "Sports": [
    { url: "https://www.espn.com/espn/rss/news", source: "ESPN General" },
    { url: "https://sports.inquirer.net/feed", source: "Inquirer Sports" },
    { url: "https://www.gmanetwork.com/news/rss/sports/", source: "GMA Sports" },
    { url: "https://www.rappler.com/sports/feed/", source: "Rappler Sports" },
    { url: "https://www.philstar.com/rss/sports", source: "Philstar Sports" },
    { url: "https://www.spin.ph/feed", source: "SPIN.ph" },
    { url: "https://tiebreakertimes.com.ph/feed", source: "Tiebreaker Times" },
    { url: "https://www.manilatimes.net/sports/feed", source: "Manila Times Sports" },
    { url: "https://mb.com.ph/rss/sports", source: "Manila Bulletin Sports" },
    { url: "https://takbo.ph/feed", source: "Takbo.ph" }
  ],

  "Showbiz": [
    { url: "https://www.abs-cbn.com/entertainment/rss/latest-news", source: "ABS-CBN Ent" },
    { url: "https://www.rappler.com/entertainment/feed/", source: "Rappler Showbiz" },
    { url: "https://www.pep.ph/feed/", source: "PEP.ph" },
    { url: "https://www.pikapika.ph/feed", source: "Pikapika" },
    { url: "https://entertainment.inquirer.net/feed", source: "Inquirer Ent" },
    { url: "https://bandera.inquirer.net/feed", source: "Inquirer Bandera" }
  ],

  "Technology": [
    { url: "https://www.rappler.com/technology/feed/", source: "Rappler Tech" },
    { url: "https://www.gmanetwork.com/news/rss/scitech/", source: "GMA SciTech" },
    { url: "https://www.theverge.com/rss/index.xml", source: "The Verge" },
    { url: "https://techcrunch.com/feed/", source: "TechCrunch" },
    { url: "https://www.wired.com/feed/category/gear/latest/rss", source: "Wired Gear" },
    { url: "https://news.ycombinator.com/rss", source: "Hacker News" }
  ],

  "Local Links": {
    isSocialMedia: true,
    items: [
      { title: "RMN Malaybalay", link: "https://www.facebook.com/profile.php?id=100063929018518", source: "Facebook" },
      { title: "101.7 XFM Bukidnon", link: "https://www.facebook.com/101.7XFMBUKIDNON2025", source: "XFM Bukidnon" },
      { title: "Juander Radyo Malaybalay", link: "https://www.facebook.com/juanderradyomalaybalay", source: "Juander Radio" }
    ],
  },

  "International": [
    { url: "https://www.aljazeera.com/xml/rss/all.xml", source: "Al Jazeera" },
    { url: "https://www.france24.com/en/rss", source: "France 24" },
    { url: "https://rss.dw.com/rdf/rss-en-world", source: "DW News" }
  ]
};

// =========================================================
// CORE ENGINE
// =========================================================
const BASE_API_URL = `https://api.rss2json.com/v1/api.json?rss_url=`;
const DEFAULT_CATEGORY = "National News";
const AUTO_REFRESH_INTERVAL = 5 * 60 * 1000;
const BREAKING_MINUTES = 30;

let activeCategory = DEFAULT_CATEGORY;
let cachedNews = [];
let currentFetchController = null;

const dom = {
  container: () => document.getElementById("news-container"),
  refreshBtn: () => document.getElementById("refresh-button"),
  status: () => document.getElementById("status-message"),
  search: () => document.getElementById("news-search"),
  sourceFilter: () => document.getElementById("source-filter"),
};

// =========================================================
// FUNCTIONS
// =========================================================

function showToast(message) {
  const existing = document.querySelector(".toast");
  if (existing) existing.remove();
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2500);
}

function calculateReadingTime(text = "") {
  // Add fallback for empty text
  const content = text || "No description available";
  const words = content.replace(/<[^>]*>/g, "").split(/\s+/).length;
  return `${Math.ceil(words / 200) || 1} min read`;
}

function isBreaking(pubDate) {
  const diff = (Date.now() - new Date(pubDate).getTime()) / 60000;
  return diff > 0 && diff <= BREAKING_MINUTES;
}

function debounce(fn, delay = 300) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), delay);
  };
}

async function fetchFeed(feed, signal) {
  try {
    const res = await fetch(
      `${BASE_API_URL}${encodeURIComponent(feed.url)}&api_key=your_api_key_if_needed&_=${Date.now()}`,
      { signal }
    );
    const data = await res.json();
    return data.status === "ok"
      ? data.items.map((i) => ({ ...i, sourceTitle: feed.source }))
      : [];
  } catch {
    return [];
  }
}

async function fetchNews(isManual = false) {
  const container = dom.container();
  if (!container) return;

  currentFetchController?.abort();
  currentFetchController = new AbortController();

  if (isManual) dom.refreshBtn()?.classList.add("spinning");
  
  container.innerHTML = Array(6)
    .fill(`<li class="news-item skeleton" style="height:100px; list-style:none; background:#eee; margin:10px; border-radius:8px;"></li>`)
    .join("");

  dom.status().textContent = `Syncing ${activeCategory}...`;

  const categoryData = ALL_FEEDS[activeCategory];

  if (categoryData.isSocialMedia) {
    cachedNews = categoryData.items.map((item) => ({
      title: item.title,
      link: item.link,
      sourceTitle: item.source,
      pubDate: new Date().toISOString(),
      description: "Direct link to social broadcast.",
    }));
    renderNews(cachedNews);
  } else {
    try {
      const results = await Promise.all(
        categoryData.map((f) => fetchFeed(f, currentFetchController.signal))
      );
      cachedNews = results
        .flat()
        .filter((i) => i.title && i.link)
        .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());

      renderNews(cachedNews);
      applyFilters();
    } catch (e) {
      if (e.name !== "AbortError") showToast("Error loading feeds.");
    }
  }

  dom.status().textContent = `${cachedNews.length} headlines live`;
  if (isManual) {
    dom.refreshBtn()?.classList.remove("spinning");
    showToast("Feed updated");
  }
}

function renderNews(items) {
  const container = dom.container();
  if (!container) return;
  container.innerHTML = "";
  
  if (!items.length) {
    container.innerHTML = `<li style="grid-column:1/-1; text-align:center; padding:3rem;">No matches.</li>`;
    return;
  }

  updateFeaturedCard(items[0]);

  items.forEach((item) => {
    const date = new Date(item.pubDate);
    const domain = new URL(item.link).hostname;
    const favicon = `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;

    const li = document.createElement("li");
    li.className = "news-item";
    li.innerHTML = `
      <div class="news-content">
        <div class="source-row">
          <img src="${favicon}" class="source-icon" onerror="this.style.display='none'">
          <span class="source-tag">${item.sourceTitle}</span>
          ${isBreaking(item.pubDate) ? '<span class="breaking-badge">BREAKING</span>' : ""}
        </div>
        <a href="${item.link}" target="_blank" class="news-link">${item.title}</a>
      </div>
      <div class="news-meta">
        <span>${calculateReadingTime(item.description)}</span>
        <span>${date.toLocaleDateString()}</span>
      </div>
    `;
    container.appendChild(li);
  });
}

function updateFeaturedCard(item) {
  const card = document.querySelector(".featured-card");
  if (!card || !item) return;
  
  card.querySelector(".featured-title").textContent = item.title;
  // Correction: Check if description exists before using replace
  const desc = item.description || "Click to read the full story on the provider's website.";
  const cleanDesc = desc.replace(/<[^>]*>/g, "").slice(0, 160) + "...";
  
  card.querySelector(".featured-excerpt").textContent = cleanDesc;
  card.querySelector(".source-tag").textContent = item.sourceTitle;
  card.onclick = () => window.open(item.link, "_blank");
}

function applyFilters() {
  const term = dom.search()?.value.toLowerCase() || "";
  const source = dom.sourceFilter()?.value || "";
  const filtered = cachedNews.filter(
    (i) =>
      i.title.toLowerCase().includes(term) &&
      (!source || i.sourceTitle === source)
  );
  renderNews(filtered);
}

function init() {
  const nav = document.getElementById("category-buttons");
  if (!nav) return;

  Object.keys(ALL_FEEDS).forEach((cat) => {
    const btn = document.createElement("button");
    btn.textContent = cat;
    btn.className = cat === activeCategory ? "active" : "";
    btn.onclick = () => {
      activeCategory = cat;
      document.querySelectorAll("#category-buttons button").forEach((b) => 
        b.classList.toggle("active", b.textContent === cat)
      );
      fetchNews();
    };
    nav.appendChild(btn);
  });

  const sources = new Set();
  Object.values(ALL_FEEDS).forEach((v) => {
    // Correction: Correctly iterate whether it's the Social object or an array
    const items = v.isSocialMedia ? v.items : v;
    items.forEach((f) => sources.add(f.source || f.sourceTitle));
  });

  const sourceDropdown = dom.sourceFilter();
  if (sourceDropdown) {
    sources.forEach((s) => {
      const opt = document.createElement("option");
      opt.value = opt.textContent = s;
      sourceDropdown.appendChild(opt);
    });
  }

  dom.refreshBtn().onclick = () => fetchNews(true);
  dom.search().oninput = debounce(applyFilters);
  dom.sourceFilter().onchange = applyFilters;

  fetchNews();
  setInterval(fetchNews, AUTO_REFRESH_INTERVAL);
}

// Initial Run
document.addEventListener("DOMContentLoaded", init);
