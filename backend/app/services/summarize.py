from transformers import pipeline
import os

def summarize_reviews_in_chunks(file_path, max_length=150, min_length=50, chunk_size=500):
    summarizer = pipeline("summarization", model="facebook/bart-large-cnn")
    with open(file_path, 'r',encoding='utf-8') as file:
        reviews = file.readlines()

    reviews_text = " ".join([review.strip() for review in reviews])

    words = reviews_text.split()
    chunks = [' '.join(words[i:i+chunk_size]) for i in range(0, len(words), chunk_size)]
    summaries = []
    
    for chunk in chunks:
        max_len = min(max_length, len(chunk.split()))
        min_len = min(min_length, max_len // 2)

        summary = summarizer(chunk, max_length=max_len, min_length=min_len, do_sample=False)
        summaries.append(summary[0]['summary_text'])

    final_summary = " ".join(summaries)
    structured_summary = "In general, customers highlight the following: " + final_summary

    return structured_summary

# directory='temp_files'

# if not os.path.exists(directory):
#     os.makedirs(directory)

# file_path = 'temp_files/reviews.txt'

# overall_summary = summarize_reviews_in_chunks(file_path, max_length=150, min_length=50, chunk_size=500)
# print("Overall Review Summary:\n", overall_summary)

