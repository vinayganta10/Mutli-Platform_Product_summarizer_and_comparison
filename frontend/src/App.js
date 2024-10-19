import "./App.css";
import React, { useState } from "react";


function App() {
  const [url, setUrl] = useState();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/scrapper", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();
      console.log("Response from backend:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="App">
      <div>
        <h1>Enter Product URL</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter Amazon/Flipkart URL"
            required
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default App;
