import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactMarkdown from 'react-markdown';
import "../index.css";

const Recommendation = () => {
    const [forecast, setForecast] = useState([]);
    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        axios.post("http://localhost:8000/forecast-model/", { days: 7 })
            .then(response => {
                setForecast(response.data);
                fetchRecommendations(response.data);
            })
            .catch(error => console.error("Error fetching data:", error));
    }, []);

    const fetchRecommendations = async (forecastData) => {
        try {
            const recommendationsPromises = forecastData.map(async (item) => {
                const message = `${new Date(item.date).toLocaleDateString()} তারিখে PM2.5 এর পূর্বাভাসিত মাত্রা ${item.predicted_pm25.toFixed(2)}। নিরাপত্তার জন্য কি কি ব্যবস্থা গ্রহণ করা উচিত? বাংলা ভাষায় মার্কডাউন ফরম্যাটে বুলেট পয়েন্ট সহ উত্তর দিন।`;
                
                const response = await axios({
                    url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
                    method: 'post',
                    data: {
                        contents: [{ parts: [{ text: message }] }],
                    },
                });

                return response.data.candidates[0]?.content?.parts[0]?.text || "কোনো সুপারিশ পাওয়া যায়নি।";
            });

            const results = await Promise.all(recommendationsPromises);
            setRecommendations(results);
        } catch (error) {
            console.error("সুপারিশ পেতে সমস্যা হয়েছে:", error);
        }
    };

    return (
        <div className="recommendation-container">
            <h2 className="recommendation-title">বায়ুমান সূচক পূর্বাভাস ও নিরাপত্তা নির্দেশিকা</h2>
            <ul className="recommendation-forecast-list">
                {forecast.map((item, index) => (
                    <li key={index} className="recommendation-forecast-item">
                        <div className="recommendation-header">
                            <span className="recommendation-date">{new Date(item.date).toLocaleDateString()}</span>
                            <span className="recommendation-pm25">AQI মাত্রা - {item.predicted_pm25.toFixed(2)}</span>
                        </div>
                        <div className="recommendation-content">
                            <strong className="recommendation-text">সুপারিশ:(ecommendation)</strong>
                            <ReactMarkdown className="recommendation-markdown">
                                {recommendations[index] || "লোড হচ্ছে..."}
                            </ReactMarkdown>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Recommendation;