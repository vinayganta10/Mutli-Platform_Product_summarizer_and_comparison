# 🛒 Multi-Platform Product Summarizer and Comparison

This project is a full-stack web application that allows users to compare products across multiple e-commerce platforms like **Amazon** and **Flipkart**. It automatically scrapes product information and user reviews using **Selenium**, summarizes the reviews with a **BART** transformer model, and performs product comparison using **Google's Gemini API** to recommend the best option to the user.

Built with **Flask (Python)** for the backend and **React** for the frontend, the app provides real-time product insights and intelligent comparison for more informed shopping decisions.

---

## 🚀 Features

- 🌐 **Live Web Scraping**: Scrapes product data and reviews using Selenium ChromeDriver.
- 📝 **Review Summarization**: Uses BART model to extract concise summaries from product reviews.
- 🤖 **Smart Comparison**: Integrates Google Gemini API to compare product specs, reviews, and pricing across platforms.
- 📊 **Review Sentiment Analysis**: Extracts frequent keywords and analyzes positive vs negative mentions.
- 🔄 **Cross-Platform Aggregation**: Compares products from Amazon and Flipkart side-by-side.
- 💻 **Interactive Frontend**: Built with React for a responsive and modern user interface.

---

## 🧰 Tech Stack

### 🔙 Backend
- Python 3.10+
- Flask
- Selenium (with ChromeDriver)
- Transformers (`BART` model from Hugging Face)
- Google Generative AI (Gemini API)
- Python-dotenv (for managing secrets)

### 🖥 Frontend
- React.js
- Fetch API for async requests

---

## 🧪 How It Works

1. User inputs two product URLs (e.g., Amazon & Flipkart).
2. Flask backend uses **Selenium** to scrape:
   - Product name, price, and features
   - User reviews
3. Reviews are summarized using **BART** model via Hugging Face Transformers.
4. Both product summaries are passed to the **Gemini API**, which returns:
   - Comparative analysis
   - Suggested platform for purchase
5. React frontend displays the data in a clean, side-by-side UI.

---

## ⚙️ Setup Instructions

### 🔧 Prerequisites
- Python 3.10+
- Node.js & npm
- Chrome & compatible **ChromeDriver**
- Google Gemini API Key

---

### 🖥 Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt

### Frontend Setup
```bash
cd frontend
npm install
npm start

### api key setup
- GEMINI_API_KEY=your_google_generative_ai_key_here

### To start Flask server
```python app.py

