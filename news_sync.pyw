import feedparser
import requests
import time
import os
import ctypes
import logging
import re
from playwright.sync_api import sync_playwright

# --- 1. SETUP LOGGING (Importante para sa .pyw aron naay record sa background) ---
logging.basicConfig(
    filename='news_sync_activity.log',
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S'
)

# --- 2. SETUP & CONFIG ---
RSS_WEBHOOK_URL = "https://discord.com/api/webhooks/1449555169577799700/SRBD35OEYyRiZuIGH3sTpBsJYye9nRUb-F3vRPVHfyQIOf7Q_ZaGeqOhYGfTOg9LPmCr"
FB_WEBHOOK_URL = "https://discord.com/api/webhooks/1452838041000345610/xum2Ov3bem-DX-1cf9UPoQQUhmzHVBGrRvVlSGRJTFoSKM-qWqv3NFKUl_Myy4KzFzJv"
SAVE_DIR = "history"

if not os.path.exists(SAVE_DIR):
    os.makedirs(SAVE_DIR)

# --- 3. DATA STRUCTURES (KOMPLETO NGA RSS LIST) ---
ALL_FEEDS = {
    "National News": [
        {"url": "https://news.abs-cbn.com/feed", "source": "ABS-CBN News (General)"},
        {"url": "https://www.inquirer.net/fullfeed", "source": "Inquirer Main (General)"},
        {"url": "https://newsinfo.inquirer.net/feed", "source": "Inquirer NewsInfo"},
        {"url": "https://www.gmanetwork.com/news/rss/news/", "source": "GMA News Online (General)"},
        {"url": "https://www.gmanetwork.com/news/rss/regions/", "source": "GMA Regional"},
        {"url": "https://www.philstar.com/rss/headlines", "source": "Philippine Star (General)"},
        {"url": "https://mb.com.ph/feed/", "source": "Manila Bulletin (General)"},
        {"url": "https://www.manilatimes.net/news/feed", "source": "Manila Times (General)"},
        {"url": "https://www.ptvnews.ph/feed/", "source": "PTV News"},
        {"url": "https://www.untvweb.com/feed/", "source": "UNTV News"},
        {"url": "https://www.pna.gov.ph/rss", "source": "Philippine News Agency (PNA)"},
        {"url": "https://www.rappler.com/feed/", "source": "Rappler Main"},
        {"url": "https://www.sunstar.com.ph/rss", "source": "SunStar Philippines"},
        {"url": "https://www.bomboradyo.com/category/national-news/feed/", "source": "Bombo Radyo Nation"},
        {"url": "https://www.brigadanews.ph/category/national/feed/", "source": "Brigada News"},
        {"url": "https://rmn.ph/feed/", "source": "RMN Networks"},
        {"url": "https://www.journalnews.com.ph/feed/", "source": "People's Journal"},
        {"url": "https://www.philstar.com/rss/nation", "source": "Philstar Nation"},
        {"url": "https://www.inquirer.net/columns/feed", "source": "Inquirer Opinion/Columns"},
        {"url": "https://www.manilatimes.net/news/national/feed/", "source": "Manila Times Nation"},
        {"url": "https://www.gmanetwork.com/news/rss/metro/", "source": "GMA Metro"},
        {"url": "https://manilastandard.net/rss-feed", "source": "Manila Standard (General)"},
        {"url": "https://tempo.com.ph/feed/", "source": "Tempo News"},
        {"url": "https://tonite.abante.com.ph/feed", "source": "Abante Tonite"},
        {"url": "https://interaksyon.philstar.com/feed/", "source": "Interaksyon (Political & Social)"},
        {"url": "http://www.senate.gov.ph/rss/rss_news.aspx", "source": "Senate of the Philippines (News)"},
        {"url": "https://www.bsp.gov.ph/SitePages/RSS.aspx", "source": "Bangko Sentral ng Pilipinas (BSP)"},
    ],
    "Business / Economy": [
        {"url": "https://www.philstar.com/rss/money", "source": "Philstar Business"},
        {"url": "https://www.philstar.com/rss/business", "source": "Philstar Economy"},
        {"url": "https://businessmirror.com.ph/feed/", "source": "BusinessMirror"},
        {"url": "https://www.manilatimes.net/business/feed", "source": "Manila Times Business"},
        {"url": "https://www.gmanetwork.com/news/rss/money/", "source": "GMA Money"},
        {"url": "https://www.rappler.com/business/feed/", "source": "Rappler Business"},
        {"url": "https://www.bworldonline.com/feed/", "source": "BusinessWorld"},
        {"url": "https://www.cnnphilippines.com/business/rss", "source": "CNN Philippines Business"},
        {"url": "https://www.bsp.gov.ph/rss/MediaList.xml", "source": "Bangko Sentral ng Pilipinas"},
        {"url": "https://www.reuters.com/rssFeed/businessNews", "source": "Reuters Business"},
        {"url": "https://asia.nikkei.com/rss/feed/nar", "source": "Nikkei Asia"},
    ],
    "Sports": [
        {"url": "https://www.espn.com/espn/rss/news", "source": "ESPN General"},
        {"url": "https://sports.inquirer.net/feed", "source": "Inquirer Sports"},
        {"url": "https://www.gmanetwork.com/news/rss/sports/", "source": "GMA Sports"},
        {"url": "https://www.rappler.com/sports/feed/", "source": "Rappler Sports"},
        {"url": "https://www.abs-cbn.com/sports/rss/latest-news", "source": "ABS-CBN Sports"},
        {"url": "https://nba.nbcsports.com/category/top-posts/feed/", "source": "NBC Sports NBA"},
        {"url": "https://www.bomboradyo.com/category/sports/feed/", "source": "Bombo Radyo Sports"},
        {"url": "https://www.philstar.com/rss/sports", "source": "Philstar Sports"},
        {"url": "https://www.spin.ph/feed", "source": "SPIN.ph"},
        {"url": "https://tiebreakertimes.com.ph/feed", "source": "Tiebreaker Times"},
        {"url": "https://www.espn.com/espn/rss/nba/news", "source": "ESPN NBA Headlines"},
        {"url": "https://www.espn.com/espn/rss/soccer/news", "source": "ESPN Soccer Headlines"},
        {"url": "https://rss.app/feeds/H3y9L6jQ64f5uMv2.xml", "source": "BBC Sport (General)"},
        {"url": "http://feeds.reuters.com/reuters/sportsNews", "source": "Reuters Sports News"},
        {"url": "https://www.cbssports.com/rss/headlines/", "source": "CBS Sports (General)"},
    ],
    "Showbiz": [
        {"url": "https://www.abs-cbn.com/entertainment/rss/latest-news", "source": "ABS-CBN Entertainment"},
        {"url": "https://www.rappler.com/entertainment/feed/", "source": "Rappler Showbiz"},
        {"url": "https://www.brigadanews.ph/category/showbiz/feed/", "source": "Brigada Showbiz"},
        {"url": "https://rmn.ph/category/showbiz/feed/", "source": "RMN Showbiz"},
        {"url": "https://www.pep.ph/feed/", "source": "PEP.ph"},
        {"url": "https://www.pikapika.ph/feed", "source": "Pikapika"},
        {"url": "https://www.philstar.com/rss/showbiz/", "source": "Philstar.com Showbiz"},
        {"url": "https://www.gmanetwork.com/news/rss/showbiz/", "source": "GMA News Online Showbiz"},
        {"url": "https://mb.com.ph/category/entertainment/feed/", "source": "Manila Bulletin Entertainment"},
        {"url": "https://entertainment.inquirer.net/feed", "source": "Inquirer.net Entertainment"},
        {"url": "https://bandera.inquirer.net/feed", "source": "Inquirer Bandera"},
    ],
    "Technology": [
        {"url": "https://www.rappler.com/technology/feed/", "source": "Rappler Tech"},
        {"url": "https://www.gmanetwork.com/news/rss/scitech/", "source": "GMA SciTech"},
        {"url": "https://www.theverge.com/rss/index.xml", "source": "The Verge"},
        {"url": "https://feeds.arstechnica.com/arstechnica/index", "source": "Ars Technica"},
        {"url": "https://techcrunch.com/feed/", "source": "TechCrunch"},
        {"url": "https://www.engadget.com/rss.xml", "source": "Engadget"},
        {"url": "https://www.wired.com/feed/category/gear/latest/rss", "source": "Wired Gear"},
        {"url": "https://www.cnet.com/rss/news/", "source": "CNET"},
        {"url": "https://mashable.com/feeds/rss/technology", "source": "Mashable Tech"},
        {"url": "https://news.ycombinator.com/rss", "source": "Hacker News"},
    ],
    "Balitang Espesyal": [
        {"url": "https://www.bomboradyo.com/category/balitang-espesyal/feed/", "source": "Bombo Radyo Special Reports"},
        {"url": "https://www.gmanetwork.com/news/rss/specialreports/", "source": "GMA News Special Reports"},
        {"url": "https://www.manilatimes.net/the-sunday-times/feed/", "source": "Manila Times Sunday Magazine"},
        {"url": "https://interaksyon.philstar.com/feed/", "source": "Interaksyon (Political & Social)"},
        {"url": "https://www.philstar.com/rss/lifestyle/features", "source": "Philstar Lifestyle Features"},
        {"url": "https://mb.com.ph/category/lifestyle/luminaries-and-life/feed/", "source": "Manila Bulletin Luminaries & Life"},
        {"url": "https://www.rappler.com/news/feed/", "source": "Rappler News (General - Key Investigations)"},
    ],
    "International": [
        {"url": "https://www.aljazeera.com/xml/rss/all.xml", "source": "Al Jazeera"},
        {"url": "https://www.cnbc.com/id/100727362/device/rss/rss.html", "source": "CNBC World"},
        {"url": "https://www.france24.com/en/rss", "source": "France 24"},
        {"url": "https://rss.dw.com/rdf/rss-en-world", "source": "DW News"},
        {"url": "https://fulltextrssfeed.com/www.aljazeera.com/xml/rss/all.xml", "source": "Global Echo"},
    ],
}

FB_PAGES = [
    "https://www.facebook.com/bomboradyophilippines",
    "https://www.facebook.com/101.7XFMBUKIDNON2025",
    "https://www.facebook.com/profile.php?id=100063929018518",
    "https://www.facebook.com/juanderradyo",
    "https://www.facebook.com/88.1RBMalaybalay",
    "https://www.facebook.com/DXDBRadyoBandilyo"
]

sent_articles = set()

# --- 4. FUNCTIONS ---

def disable_close_button():
    try:
        hwnd = ctypes.windll.kernel32.GetConsoleWindow()
        if hwnd != 0:
            hMenu = ctypes.windll.user32.GetSystemMenu(hwnd, False)
            if hMenu != 0:
                ctypes.windll.user32.DeleteMenu(hMenu, 0xF060, 0x0)
    except Exception as e:
        logging.error(f"Could not disable close button: {e}")

def get_latest_fb_post(page_url):
    try:
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            context = browser.new_context(user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36")
            page = context.new_page()
            page.goto(page_url, timeout=45000)
            page.keyboard.press("Escape")
            page.wait_for_selector('div[role="main"]', timeout=15000)
            
            message_locator = page.locator('div[data-ad-preview="message"]').first
            if message_locator.count() == 0:
                browser.close()
                return None, None, None

            newest_text = message_locator.inner_text().strip()
            post_container = message_locator.locator("xpath=./ancestor::div[contains(@class, 'x1yzt60q')]").first
            
            post_link = page_url
            link_elements = post_container.locator('a[role="link"]').all()
            for link in link_elements:
                href = link.get_attribute("href")
                if href and ("/posts/" in href or "/videos/" in href):
                    post_link = href.split('?')[0]
                    break

            img_locator = post_container.locator("img").first
            img_url = img_locator.get_attribute("src") if img_locator.count() > 0 else None

            browser.close()
            return newest_text, img_url, post_link
    except Exception as e:
        logging.warning(f"FB Scrape Error ({page_url}): {e}")
        return None, None, None

def check_rss():
    logging.info("Starting RSS sync...")
    for category, feeds in ALL_FEEDS.items():
        if not isinstance(feeds, list): continue
        for feed_info in feeds:
            try:
                feed = feedparser.parse(feed_info['url'])
                if not feed.entries: continue
                latest = feed.entries[0]
                if latest.link not in sent_articles:
                    desc = latest.get('summary', 'No description.')
                    clean_desc = (desc[:250] + '...') if len(desc) > 250 else desc
                    payload = {
                        "username": "News Intelligence Bot",
                        "embeds": [{
                            "title": f"🚨 {latest.title}",
                            "url": latest.link,
                            "description": clean_desc,
                            "color": 1982639,
                            "fields": [
                                {"name": "Source", "value": feed_info['source'], "inline": True},
                                {"name": "Category", "value": category, "inline": True}
                            ],
                            "footer": {"text": "Bombo Radyo Intel • RSS"},
                            "timestamp": time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime())
                        }]
                    }
                    requests.post(RSS_WEBHOOK_URL, json=payload)
                    sent_articles.add(latest.link)
            except Exception as e:
                logging.error(f"RSS Error in {category} ({feed_info.get('source')}): {e}")

def check_facebook():
    logging.info("Checking Facebook Pages...")
    for fb_url in FB_PAGES:
        # Sanitize filename
        safe_name = "".join([c for c in fb_url.split('/')[-1] if c.isalnum()]) + ".txt"
        save_path = os.path.join(SAVE_DIR, safe_name)
        
        current_text, current_img, current_url = get_latest_fb_post(fb_url)
        if current_text:
            last_text = ""
            if os.path.exists(save_path):
                with open(save_path, "r", encoding="utf-8") as f:
                    last_text = f.read().strip()
            
            if current_text != last_text:
                logging.info(f"✨ New FB Post: {fb_url}")
                payload = {
                    "embeds": [{
                        "title": f"📢 FB Update: {fb_url.split('/')[-1]}",
                        "description": current_text[:1800],
                        "url": current_url,
                        "color": 3447003,
                        "image": {"url": current_img} if current_img else None,
                        "footer": {"text": f"Scanned at {time.strftime('%H:%M:%S')}"}
                    }]
                }
                requests.post(FB_WEBHOOK_URL, json=payload)
                with open(save_path, "w", encoding="utf-8") as f:
                    f.write(current_text)
        time.sleep(5)

# --- 5. MAIN LOOP ---
if __name__ == "__main__":
    disable_close_button()
    logging.info("Bot Intelligence Active (Background Mode Enabled)")
    
    while True:
        try:
            check_rss()
            check_facebook()
        except Exception as e:
            logging.critical(f"Main loop encountered a major error: {e}")
        
        if len(sent_articles) > 500:
            sent_articles.clear()
        
        logging.info("Cycle complete. Sleeping for 10 minutes...")
        time.sleep(600)
