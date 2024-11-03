import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

def Gemini(text):
    genai.configure(api_key='AIzaSyDazBTHytyaNeqXJRrhTB0L3s3BOi8N1_E')

    generation_config = {
        "temperature": 0.9,
        "top_p": 1,
        "max_output_tokens": 2048,
        "response_mime_type": "text/plain",
    }

    model = genai.GenerativeModel(
    model_name="gemini-1.0-pro",
    generation_config=generation_config,
    )

    chat_session = model.start_chat(
    history=[
    ]
    )

    response = chat_session.send_message("Generate an HTML table to compare two products based on 'Price', 'Delivery Date', 'Rating', 'EMI', and 'Warranty' and segregate by platform. Each row should represent one feature, and the table should have three columns: 'Feature' and two platforms from the data. After the table, provide a summary indicating which product is better based on these features. The HTML format should look like this:\n"
    "<table>\n"
    "  <tr><th>Feature</th><th>Product 1</th><th>Product 2</th></tr>\n"
    "  <tr><td>Price</td><td>[Product 1 Price]</td><td>[Product 2 Price]</td></tr>\n"
    "  <tr><td>Delivery Date</td><td>[Product 1 Delivery Date]</td><td>[Product 2 Delivery Date]</td></tr>\n"
    "  <tr><td>Rating</td><td>[Product 1 Rating]</td><td>[Product 2 Rating]</td></tr>\n"
    "  <tr><td>EMI</td><td>[Product 1 EMI]</td><td>[Product 2 EMI]</td></tr>\n"
    "  <tr><td>Warranty</td><td>[Product 1 Warranty]</td><td>[Product 2 Warranty]</td></tr>\n"
    "</table>\n"
    "<p><b>Summary:</b> Indicate which product is better based on the comparison criteria above.</p>\n"
    "This is the data:"+text)    
    return response.text