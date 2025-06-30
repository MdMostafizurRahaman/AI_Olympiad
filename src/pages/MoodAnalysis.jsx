import React, { useContext, useState, useEffect } from 'react';
import { Mycontext } from '../App';

// NEW (works perfectly):
import { FaBrain, FaChartLine, FaLightbulb, FaComments, FaPaperPlane } from 'react-icons/fa';

const MoodAnalysis = () => {
  const context = useContext(Mycontext);
  const { currentLocationData, moodPrediction, fetchLocationData } = context;
  const [chatMessages, setChatMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    context.setisHideSidebarAndHeader(false);
    // Initial AI greeting
    setChatMessages([{
      type: 'ai',
      message: generateInitialGreeting(),
      timestamp: new Date()
    }]);
  }, []);

  const generateInitialGreeting = () => {
    const aqi = currentLocationData.aqi;
    if (aqi > 150) {
      return "Hi! I'm your AI Mood Companion. I see the air quality is quite poor today. I'm here to help you manage the impact on your well-being. How are you feeling right now?";
    } else if (aqi > 100) {
      return "Hello! I'm your AI wellness assistant. The air quality is moderate today, which might affect your mood and energy. How can I support you today?";
    }
    return "Hi there! I'm your AI Mood Companion. The air quality looks good today! I'm here to help you optimize your well-being. What would you like to know?";
  };

  const generateAIResponse = (userMessage) => {
    const responses = [
      "Based on today's air quality, I recommend taking breaks every 90 minutes to maintain your focus.",
      "The current pollution levels might affect your energy. Try staying hydrated and consider some light indoor exercises.",
      "I understand you're feeling the effects of poor air quality. Deep breathing exercises can help you feel more centered.",
      "Given today's AQI, it's normal to feel less energetic. Would you like some tips for staying productive indoors?",
      "The air quality data suggests you might experience some fatigue. Have you been drinking enough water today?"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const sendMessage = () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMsg = {
      type: 'user',
      message: inputMessage,
      timestamp: new Date()
    };
    setChatMessages(prev => [...prev, userMsg]);

    setIsTyping(true);
    
    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = {
        type: 'ai',
        message: generateAIResponse(inputMessage),
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);

    setInputMessage('');
  };

  const getMoodTrend = () => {
    const avgMood = (moodPrediction.focus + moodPrediction.energy + moodPrediction.mood) / 3;
    if (avgMood >= 0.7) return { trend: "↗️ Positive", color: "#4caf50" };
    if (avgMood >= 0.5) return { trend: "➡️ Stable", color: "#ff9800" };
    return { trend: "↘️ Needs Attention", color: "#f44336" };
  };

  return (
    <div className="mood-analysis-wrapper">
      <div className="page-header">
        <h2><Psychology className="icon" /> AI Mood Air Analysis</h2>
        <p>Understand how air quality affects your mental well-being</p>
      </div>

      <div className="mood-analysis-content">
        {/* Mood Overview Section */}
        <div className="mood-overview">
          <div className="mood-card detailed">
            <h3>Today's Mood Impact Analysis</h3>
            <div className="mood-metrics">
              <div className="metric">
                <span className="metric-label">Overall Mood Score</span>
                <div className="metric-value">
                  {((moodPrediction.focus + moodPrediction.energy + moodPrediction.mood) / 3 * 100).toFixed(0)}%
                </div>
                <div className="metric-trend" style={{ color: getMoodTrend().color }}>
                  {getMoodTrend().trend}
                </div>
              </div>
              <div className="metric">
                <span className="metric-label">Air Quality Impact</span>
                <div className="metric-value">
                  {currentLocationData.aqi > 100 ? "High" : currentLocationData.aqi > 50 ? "Moderate" : "Low"}
                </div>
              </div>
              <div className="metric">
                <span className="metric-label">Location</span>
                <div className="metric-value">{currentLocationData.location}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Breakdown */}
        <div className="detailed-breakdown">
          <div className="breakdown-card">
            <h4><TrendingUp className="icon" /> Detailed Impact Analysis</h4>
            <div className="breakdown-items">
              <div className="breakdown-item">
                <span className="breakdown-label">Cognitive Focus</span>
                <div className="breakdown-bar">
                  <div 
                    className="breakdown-progress" 
                    style={{ width: `${moodPrediction.focus * 100}%`, backgroundColor: '#2196f3' }}
                  ></div>
                </div>
                <span>{(moodPrediction.focus * 100).toFixed(0)}%</span>
              </div>
              <div className="breakdown-item">
                <span className="breakdown-label">Energy Level</span>
                <div className="breakdown-bar">
                  <div 
                    className="breakdown-progress" 
                    style={{ width: `${moodPrediction.energy * 100}%`, backgroundColor: '#ff9800' }}
                  ></div>
                </div>
                <span>{(moodPrediction.energy * 100).toFixed(0)}%</span>
              </div>
              <div className="breakdown-item">
                <span className="breakdown-label">Emotional Well-being</span>
                <div className="breakdown-bar">
                  <div 
                    className="breakdown-progress" 
                    style={{ width: `${moodPrediction.mood * 100}%`, backgroundColor: '#4caf50' }}
                  ></div>
                </div>
                <span>{(moodPrediction.mood * 100).toFixed(0)}%</span>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="recommendations-card">
            <h4><Tips className="icon" /> Personalized Recommendations</h4>
            <div className="recommendations-detailed">
              {moodPrediction.recommendations.map((rec, index) => (
                <div key={index} className="recommendation-detailed">
                  <span className="rec-number">{index + 1}</span>
                  <span className="rec-text">{rec}</span>
                </div>
              ))}
              {moodPrediction.recommendations.length === 0 && (
                <div className="no-recommendations">
                  Great! The air quality is good enough that no special precautions are needed today.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* AI Mood Companion Chat */}
        <div className="mood-companion-section">
          <div className="companion-card">
            <h4><Chat className="icon" /> AI Mood Companion</h4>
            <div className="chat-container">
              <div className="chat-messages">
                {chatMessages.map((msg, index) => (
                  <div key={index} className={`message ${msg.type}`}>
                    <div className="message-content">
                      {msg.message}
                    </div>
                    <div className="message-time">
                      {msg.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="message ai">
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                )}
              </div>
              <div className="chat-input">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask me anything about how air quality affects your mood..."
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                />
                <button onClick={sendMessage} className="send-btn">
                  <Send className="icon" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoodAnalysis;