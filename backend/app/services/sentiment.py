import requests
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from urllib.parse import urlparse
import time

chrome_options = Options()
chrome_options.add_argument("--headless")
chrome_options.add_argument("--disable-gpu")
chrome_options.add_argument("--disable-dev-shm-usage")
chrome_options.add_argument("--window-size=1920x1080")

def analyze(url):
    parsed_url = urlparse(url)
    domain = parsed_url.netloc
    platform = ""

    if 'amazon' in domain:
        platform='amazon'
    elif 'flipkart' in domain:
        platform='flipkart'
    elif 'jiomart' in domain:
        platform='jiomart'
    else:
        platform='Unknown Platform'
    
    if platform=='Unknown Platform':
        return -1
    print(platform)
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.5938.132 Safari/537.36'
    }

    if platform=="amazon":
        response = requests.get(url, headers=headers)
        soup = BeautifulSoup(response.text, 'html.parser')

        keywordsDiv = soup.find('div',{'class': 'a-section a-spacing-small a-spacing-top-small _cr-product-insights_style_aspect-symbol-list__24amT'})
        keywordsA = keywordsDiv.find_all('a')
        keywords = []
        for keyword in keywordsA:
            element = keyword.get('aria-label')
            element = element.replace("aspect","")
            keywords.append(element)
        print(keywords)
    
    elif platform=="flipkart":
        service = Service('C:\webdrivers\chromedriver-win64\chromedriver-win64\chromedriver.exe')
        driver = webdriver.Chrome(service=service,options=chrome_options)

        driver.get(url=url)

        time.sleep(5)

        keywordsDiv = driver.find_elements(By.CLASS_NAME,'_5nb2hu')
        keywords=[]
        for keyword in keywordsDiv:
            sentiment = ""
            rating = float(keyword.find_element(By.CLASS_NAME,'tobygM').text.strip())
            if rating>=4.3:
                sentiment = "POSITIVE"
            elif rating>=4.0 and rating<4.3:
                sentiment = "MIXED"
            else:
                sentiment = "NEGATIVE" 
            keywords.append(sentiment+" "+keyword.find_element(By.CLASS_NAME,'NTiEl0').text.strip())

    return keywords
