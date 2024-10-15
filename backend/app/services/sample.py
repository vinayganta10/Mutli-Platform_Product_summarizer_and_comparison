from urllib.parse import urlparse

def extract_platform(url):
    # Parse the URL to extract the domain
    parsed_url = urlparse(url)
    domain = parsed_url.netloc
    
    # Check if the domain contains Amazon or Flipkart
    if 'amazon' in domain:
        return 'Amazon'
    elif 'flipkart' in domain:
        return 'Flipkart'
    else:
        return 'Unknown Platform'

# Example URLs
amazon_url = 'https://www.amazon.com/product-reviews/B08L5VJK2X/'
flipkart_url = 'https://www.flipkart.com/product-reviews/itm8d6f7e8919117'

# Extract platform names
print(extract_platform(amazon_url))  # Output: Amazon
print(extract_platform(flipkart_url))  # Output: Flipkart
