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

    response = chat_session.send_message(text+"which is better based on price,warranty,delivery_Date,emi and rating and generate a percentage")
    
    formatted_response = response.text.replace("Price:", "\nPrice:") \
        .replace("Warranty:", "\nWarranty:") \
        .replace("Delivery Date:", "\nDelivery Date:") \
        .replace("EMI:", "\nEMI:") \
        .replace("Rating:", "\nRating:") \
        .replace("Percentage of Better Criteria:", "\n\nPercentage of Better Criteria:") \
        .replace("Overall:", "\n\nOverall:")
    
    return formatted_response