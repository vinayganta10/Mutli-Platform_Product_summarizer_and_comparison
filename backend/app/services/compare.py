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
import os
import re
import json
from .gemini import Gemini


chrome_options = Options()
chrome_options.add_argument("--headless")
chrome_options.add_argument("--disable-gpu")
chrome_options.add_argument("--disable-dev-shm-usage")
chrome_options.add_argument("--window-size=1920x1080")

def clean_text(text):
    cleaned_text= re.sub(r'[\u200e\u200f\u20b9]', '', text).strip()
    return cleaned_text

def compare(name,platform):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.5938.132 Safari/537.36'
    }
    if platform == 'amazon':
        url = "https://www.amazon.in/s?k=" + name
        response = requests.get(url, headers=headers)
        soup = BeautifulSoup(response.text, 'html.parser')

        sponsored = soup.find_all('div',{"class":"a-row a-spacing-micro"})
        print(len(sponsored))
        product = soup.find_all('a',{"class":"a-link-normal s-underline-text s-underline-link-text s-link-style a-text-normal"})
        best_product = product[len(sponsored)+1]
        link = "https://amazon.in"+best_product.get('href')
        print(link)

        response = requests.get(link,headers=headers)
        soup = BeautifulSoup(response.text, 'html.parser')

        title = soup.find('span', {'id': 'productTitle'})
        price = soup.find('span', {'class': 'a-price-whole'})
        rating = soup.find('span', {'class': 'a-icon-alt'})
        delivery = soup.find('div', {'id': 'deliveryBlockMessage'})
        emi_details = soup.find('span',{'class':'a-hidden'})
        warranty = soup.find_all('span', {'class': 'a-size-small a-color-link a-text-normal'})

        product1= {
            'title': clean_text(title.get_text(strip=True)) if title else 'N/A',
            'price': clean_text(price.get_text(strip=True)) if price else 'N/A',
            'rating': clean_text(rating.get_text(strip=True)) if rating else 'N/A',
            'delivery_date': clean_text(delivery.get_text(strip=True)) if delivery else 'N/A',
            'emi_details': emi_details.get_text(strip=True) if emi_details else 'N/A',
            'warranty': clean_text(warranty[2].get_text(strip=True)) if warranty else 'N/A',
            'platform':platform
        }

    elif platform == 'flipkart':
        service = Service('C:\webdrivers\chromedriver-win64\chromedriver-win64\chromedriver.exe')
        driver = webdriver.Chrome(service=service,options=chrome_options)
        url = "https://flipkart.com/search?q="+name
        driver.get(url=url)

        time.sleep(5)

        linkDiv = driver.find_element(By.CLASS_NAME,'CGtC98')
        link = linkDiv.get_attribute('href')

        driver.get(url=link)

        title = driver.find_element(By.CLASS_NAME,'VU-ZEz')
        price = driver.find_element(By.CLASS_NAME,'Nx9bqj.CxhGGd')
        rating = driver.find_element(By.CLASS_NAME,'XQDdHH')
        emi_details = driver.find_element(By.CLASS_NAME,'g11wDd')
        delivery = driver.find_element(By.CLASS_NAME,'hVvnXm')
        warranty = driver.find_element(By.CLASS_NAME,'nX0P-8')

        product1 = {
            'title': clean_text(title.text.strip()) if title else 'N/A',
            'price': clean_text(price.text.strip()) if price else 'N/A',
            'rating': clean_text(rating.text.strip()) if rating else 'N/A',
            'delivery_date': clean_text(delivery.text.strip()) if delivery else 'N/A',
            'emi_details': emi_details.text.strip() if emi_details else 'N/A',
            'warranty': clean_text(warranty.text.strip()) if warranty else 'N/A',
            'platform':platform
        }


    else:
        service = Service('C:\webdrivers\chromedriver-win64\chromedriver-win64\chromedriver.exe')
        driver = webdriver.Chrome(service=service,options=chrome_options)
        url = "https://jiomart.com/search/"+name
        driver.get(url=url)

        time.sleep(5)

        linkDiv = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located(
                (By.XPATH, "//ol[contains(@class, 'ais-InfiniteHits-list')]//li[contains(@class, 'ais-InfiniteHits-item')]//a[contains(@class, 'plp-card-wrapper')]")
            )
        )
        link = linkDiv.get_attribute('href')
        print(link)


    directory = 'temp_files'
    file_path = os.path.join(directory, 'data.json')

    with open(file_path, 'r') as file:
        data = json.load(file)#load ->to dict,dump-> to json 
    
    product2={
        'title':data['title'],
        'price':data['price'],
        'rating':data['rating'],
        'delivery_date':data['delivery_date'],
        'emi_details':data['emi_details'],
        'warranty':data['warranty'],
        'platform':data['platform']
    }
    print(product1)
    print(product2)
    data = Gemini(str(product1)+str(product2))
    print(data)
    return data
