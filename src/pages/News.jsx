import React, { useState, useEffect } from "react";
import axios from "axios";

function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_KEY = import.meta.env.VITE_API_NEWS_KEY;  // Access the API key from the .env file
  const CX = import.meta.env.VITE_CX;  // Access the Custom Search Engine ID from the .env file

  // Function to check if 24 hours have passed
  const has24HoursPassed = () => {
    const lastFetchTime = localStorage.getItem('lastFetchTime');
    if (!lastFetchTime) return true; // If there's no last fetch time, make the API call

    const currentTime = new Date().getTime();
    const elapsedTime = currentTime - lastFetchTime;

    return elapsedTime >= 24 * 60 * 60 * 1000; // 24 hours in milliseconds
  };

  useEffect(() => {
    const fetchNews = async () => {
      if (!has24HoursPassed()) {
        // If 24 hours haven't passed, load news from localStorage
        const cachedNews = localStorage.getItem('cachedNews');
        if (cachedNews) {
          setNews(JSON.parse(cachedNews));
          setLoading(false);
        }
        return; // Skip API call if not yet 24 hours
      }

      try {
        const response = await axios.get('https://www.googleapis.com/customsearch/v1', {
          params: {
            key: API_KEY,
            cx: CX,
            q: 'AQI air Bangladesh',
           
            // This specifies that you want news results
          },
        });

        // Extract and sort the articles based on published date (assuming it exists)
        const articles = response.data.items.map((item) => ({
          image: item.pagemap.cse_image ? item.pagemap.cse_image[0].src : 'https://via.placeholder.com/150', // Fallback image
          title: item.title,
          description: item.snippet,
          url: item.link,
          publishedDate: item.pagemap.metatags ? item.pagemap.metatags[0]["article:published_time"] : null,
        }));

        // Sort articles by published date, newest first
        articles.sort((a, b) => (b.publishedDate ? new Date(b.publishedDate) : 0) - (a.publishedDate ? new Date(a.publishedDate) : 0));

        setNews(articles);
        setLoading(false);

        // Store the current time and the fetched news in localStorage
        localStorage.setItem('lastFetchTime', new Date().getTime());
        localStorage.setItem('cachedNews', JSON.stringify(articles));

      } catch (error) {
        console.error("Error fetching news:", error);
        setLoading(false);
      }
    };

    fetchNews();
  }, []); // Empty dependency array ensures it runs once when the component mounts

  const truncateDescription = (description, wordLimit = 10) => {
    const words = description.split(" ");
    if (words.length <= wordLimit) return description;
    return `${words.slice(0, wordLimit).join(" ")}...`;
  };

  return (
    <div className="news-container">
      <h2>🔥  AQI News</h2>
      <div className="news-grid">
        {loading ? (
          <p>Loading news...</p>
        ) : (
          news.length > 0 ? (
            news.map((article, index) => (
              <div key={index} className="news-card">
                <img src={article.image} alt="News" className="news-image" />
                <h3>{article.title}</h3>
                <p>{truncateDescription(article.description)} <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a></p>
              </div>
            ))
          ) : (
            <p>No news available.</p>
          )
        )}
      </div>
    </div>
  );
}

export default News;
