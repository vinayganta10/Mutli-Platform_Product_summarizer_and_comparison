import requests
from bs4 import BeautifulSoup
from urllib.parse import urlparse
import os

#url = 'https://www.amazon.in/OnePlus-Buds-Pro-Bluetooth-Ear/dp/B0DBHX75C4/ref=sr_1_1_sspa?crid=1EDEST4ZCNORE&dib=eyJ2IjoiMSJ9.jXIz5nn_0AnFAx-Y3XqNUDcevwiQNObcs1Un2Z5r_K2juLbrAP45718oCbcY_Zyi8Hwn_1avvlcpW672BWUqshmuR-dZ6_Os365DdZhlCB1rL87dJ193ytCO-6U3TUWG3tJBd_c84_UbOegMdMygXz48ho0YySXuPmfV84ojpLcY4pmjQTy9Mr5xKYGHxD4MHOIUGMI7UadPRTCk09t3xRWjZuAfLqBAYY23IdtyrPE.d6xG3j5S9SaCEANbR1guOJvm0fQGt0RW9c1bLjvfScc&dib_tag=se&keywords=oneplus%2Bearbuds&nsdOptOutParam=true&qid=1728567823&sprefix=one%2Caps%2C204&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&th=1'

def scrape(url):
    directory = 'temp_files'

    parsed_url = urlparse(url)
    domain = parsed_url.netloc
    platform = ""

    if 'amazon' in domain:
        platform='amazon'
    elif 'flipkart' in domain:
        platform='Flipkart'
    else:
        platform='Unknown Platform'

    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.5938.132 Safari/537.36'
    }

    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.content, 'html.parser')

    reviews = soup.find_all('span', {'data-hook': 'review-body'})

    if not os.path.exists(directory):
        os.makedirs(directory)

    file_path = os.path.join(directory, 'reviews.txt')
    with open(file_path, 'a',encoding='utf-8') as file:
        for review in reviews:
            file.write(review.text.strip() + '\n')
    
    soup = BeautifulSoup(response.content, 'lxml')
    title = soup.find('span', {'id': 'productTitle'})
    price = soup.find('span', {'class': 'a-price-whole'})
    rating = soup.find('span', {'class': 'a-icon-alt'})
    delivery = soup.find('div', {'id': 'deliveryBlockMessage'})
    emi_details = soup.find('div', {'id': 'buyBackAccordionRow'}) 
    warranty = soup.find('div', {'id': 'inemi_feature_div'})
    
    technical_details = {}
    technical_table = soup.find('table', {'id': 'productDetails_techSpec_section_1'})
    if technical_table:
        rows = technical_table.find_all('tr')
        for row in rows:
            key = row.find('th').get_text(strip=True)
            value = row.find('td').get_text(strip=True)
            technical_details[key] = value

    product_details = {
        'title': title.get_text(strip=True) if title else 'N/A',
        'price': price.get_text(strip=True) if price else 'N/A',
        'rating': rating.get_text(strip=True) if rating else 'N/A',
        'delivery_date': delivery.get_text(strip=True) if delivery else 'N/A',
        'emi_details': emi_details.get_text(strip=True) if emi_details else 'N/A',
        'warranty': warranty.get_text(strip=True) if warranty else 'N/A',
        'technical_details': technical_details
    }
    print(product_details.get('warranty'))
    return len(reviews)