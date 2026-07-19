import httpx
import logging
import time
from typing import Optional

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
logger = logging.getLogger(__name__)

class WikipediaCrawler:
    def __init__(self):
        self.base_url = "https://en.wikipedia.org/w/api.php"
        headers = {
            "User-Agent": "Evolith/1.0 (https://github.com/evolith/evolith; contact@evolith.app)"
        }
        self.client = httpx.Client(timeout=10.0, headers=headers)

    def fetch_page_text(self, title: str, retries: int = 3) -> Optional[str]:
        """Fetches the plain text extract of a Wikipedia page."""
        params = {
            "action": "query",
            "format": "json",
            "titles": title,
            "prop": "extracts",
            "explaintext": True,
            "redirects": 1,
        }
        
        for attempt in range(retries):
            try:
                response = self.client.get(self.base_url, params=params)
                
                logger.info(f"Status Code: {response.status_code}")
                logger.info(f"Content-Type: {response.headers.get('content-type', 'N/A')}")
                logger.debug(f"Response snippet: {response.text[:500]}")
                
                response.raise_for_status()
                
                data = response.json()
                pages = data.get("query", {}).get("pages", {})
                for page_id, page_data in pages.items():
                    if page_id == "-1":
                        return None
                    return page_data.get("extract")
                return None
            except httpx.HTTPError as e:
                logger.error(f"HTTP Error on attempt {attempt + 1}: {e}")
                if attempt < retries - 1:
                    time.sleep(2 ** attempt)
                else:
                    logger.error("Max retries reached.")
                    return None
            except Exception as e:
                logger.error(f"Error decoding JSON or parsing on attempt {attempt + 1}: {e}")
                if attempt < retries - 1:
                    time.sleep(2 ** attempt)
                else:
                    return None
        return None
