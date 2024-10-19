import requests
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from urllib.parse import urlparse
import time
import os
import re
import json

#url = 'https://www.amazon.in/OnePlus-Buds-Pro-Bluetooth-Ear/dp/B0DBHX75C4/ref=sr_1_1_sspa?crid=1EDEST4ZCNORE&dib=eyJ2IjoiMSJ9.jXIz5nn_0AnFAx-Y3XqNUDcevwiQNObcs1Un2Z5r_K2juLbrAP45718oCbcY_Zyi8Hwn_1avvlcpW672BWUqshmuR-dZ6_Os365DdZhlCB1rL87dJ193ytCO-6U3TUWG3tJBd_c84_UbOegMdMygXz48ho0YySXuPmfV84ojpLcY4pmjQTy9Mr5xKYGHxD4MHOIUGMI7UadPRTCk09t3xRWjZuAfLqBAYY23IdtyrPE.d6xG3j5S9SaCEANbR1guOJvm0fQGt0RW9c1bLjvfScc&dib_tag=se&keywords=oneplus%2Bearbuds&nsdOptOutParam=true&qid=1728567823&sprefix=one%2Caps%2C204&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&th=1'

def clean_text(text):
    cleaned_text= re.sub(r'[\u200e\u200f\u20b9]', '', text).strip()
    return cleaned_text

def scrape(url):
    directory = 'temp_files'

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

    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.content, 'html.parser')
    
    if platform=='amazon':
        reviews = soup.find_all('span', {'data-hook': 'review-body'})
        title = soup.find('span', {'id': 'productTitle'})
        price = soup.find('span', {'class': 'a-price-whole'})
        rating = soup.find('span', {'class': 'a-icon-alt'})
        delivery = soup.find('div', {'id': 'deliveryBlockMessage'})
        emi_details = soup.find('span',{'class':'a-hidden'})
        warranty = soup.find_all('span', {'class': 'a-size-small a-color-link a-text-normal'})
        
        technical_details = {}
        technical_table = soup.find('table', {'id': 'productDetails_techSpec_section_1'})
        if technical_table:
            rows = technical_table.find_all('tr')
            for row in rows:
                key = row.find('th').get_text(strip=True).replace('\u200e', '')
                value = clean_text(row.find('td').get_text(strip=True))
                technical_details[key] = value

        product_details = {
            'title': clean_text(title.get_text(strip=True)) if title else 'N/A',
            'price': clean_text(price.get_text(strip=True)) if price else 'N/A',
            'rating': clean_text(rating.get_text(strip=True)) if rating else 'N/A',
            'delivery_date': clean_text(delivery.get_text(strip=True)) if delivery else 'N/A',
            'emi_details': clean_text(emi_details.get_text(strip=True)) if emi_details else 'N/A',
            'warranty': clean_text(warranty[2].get_text(strip=True)) if warranty else 'N/A',
            'technical_details': technical_details
        }

    elif platform=='flipkart':
        service = Service('C:\webdrivers\chromedriver-win64\chromedriver-win64\chromedriver.exe')
        driver = webdriver.Chrome(service=service)

        driver.get(url=url)

        time.sleep(5)

        reviews = driver.find_elements(By.CLASS_NAME, 'ZmyHeo')
        title = driver.find_element(By.CLASS_NAME,'VU-ZEz')
        price = driver.find_element(By.CLASS_NAME,'Nx9bqj.CxhGGd')
        rating = driver.find_element(By.CLASS_NAME,'XQDdHH')
        emi_details = driver.find_element(By.CLASS_NAME,'g11wDd')
        delivery = driver.find_element(By.CLASS_NAME,'hVvnXm')
        warranty = driver.find_element(By.CLASS_NAME,'nX0P-8')

        # technical_details = {}

        # rows = driver.find_elements(By.CLASS_NAME, '_0ZhAN9')
        # for row in rows:
        #     tr = row.find_element(By.CLASS_NAME, 'WJdYP6')
        #     label = tr.find_element(By.CLASS_NAME,'+fFi1w.col.col-3-12').text.strip()
        #     value = tr.find_element(By.CLASS_NAME, 'Izz52n').text.strip()
        #     technical_details[label] = value

        # print(technical_details)
        product_details = {
            'title': clean_text(title.text.strip()) if title else 'N/A',
            'price': clean_text(price.text.strip()) if price else 'N/A',
            'rating': clean_text(rating.text.strip()) if rating else 'N/A',
            'delivery_date': clean_text(delivery.text.strip()) if delivery else 'N/A',
            'emi_details': clean_text(emi_details.text.strip()) if emi_details else 'N/A',
            'warranty': clean_text(warranty.text.strip()) if warranty else 'N/A',
            #'technical_details': technical_details
        }

    else:
        service = Service('C:\webdrivers\chromedriver-win64\chromedriver-win64\chromedriver.exe')
        driver = webdriver.Chrome(service=service)

        driver.get(url=url)

        time.sleep(5)

        title = driver.find_element(By.ID,'pdp_product_name')
        priceText = driver.find_element(By.ID,'price_section').text.strip()
        prices = priceText.split('\n')
        price = prices[0]
        warranty = driver.find_element(By.CSS_SELECTOR,'.jm-pv-m.jm-heading-xxs.border-default')
        print(warranty)
        reviews = driver.find_elements(By.ID,'content')

    
    # if not os.path.exists(directory):
    #     os.makedirs(directory)

    # file_path = os.path.join(directory, 'reviews.txt')
    # with open(file_path, 'a',encoding='utf-8') as file:
    #     for review in reviews:
    #         file.write(review.text.strip() + '\n')

    # file_path = os.path.join(directory, 'data.json')
    # with open(file_path, 'w') as json_file:
    #     json.dump(product_details, json_file, indent=4)

    # return len(reviews)
    return 0