import React, { useEffect, useContext } from "react";
import { Air, Thermostat, WaterDrop, LocationOn } from "@mui/icons-material";
import { FaBrain, FaSmile, FaBolt, FaLightbulb } from "react-icons/fa";
import { Link } from 'react-router-dom'; // Add this import for the navigation button
import "../index.css";
import { Mycontext } from "../App";

const DashBoard = () => {
  const context = useContext(Mycontext);
  const { fetchLocationData, currentLocationData, isFetching, moodPrediction } = context;

  useEffect(() => {
    context.setisHideSidebarAndHeader(false);
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    fetchLocationData();
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    const aqicnToken = import.meta.env.VITE_AQICN_MAP_TOKEN;

    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      const map = new window.google.maps.Map(document.getElementById("map"), {
        center: { lat: 23.5937, lng: 83.9629 },
        zoom: 6,
      });

      const waqiMapOverlay = new window.google.maps.ImageMapType({
        getTileUrl: (coord, zoom) =>
          `https://tiles.aqicn.org/tiles/usepa-aqi/${zoom}/${coord.x}/${coord.y}.png?token=${aqicnToken}`,
        tileSize: new window.google.maps.Size(256, 256),
        name: "Air Quality",
        maxZoom: 15,
      });

      map.overlayMapTypes.insertAt(0, waqiMapOverlay);

      const pakistanCircle = new window.google.maps.Circle({
        center: { lat: 23.685, lng: 90.3563 },
        radius: 300000,
        strokeColor: "red",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#9999FF",
        fillOpacity: 0.01,
      });

      pakistanCircle.setMap(map);
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Function to get mood status text and color
  const getMoodStatus = (score) => {
    if (score >= 0.7) return { text: "Good", color: "#4caf50" };
    if (score >= 0.5) return { text: "Moderate", color: "#ff9800" };
    return { text: "Low", color: "#f44336" };
  };

  return (
    <div className="right-content">
      <div className="dashboardWrapper">
        <div className="titleContent">
          <h2>Current Air Quality Index <span className="text-sky">(AQI)</span> & Weather</h2>
        </div>

        <div className="dashboardBox">
          <div id="map" className="map-aqi"></div>
        </div>
      </div>

      <div className="info-box">
        <div className="card">
          <div className="card-content">
            <h6>Current Location Information</h6>

            {isFetching ? (
              <div className="loading"><div className="spinner"></div></div>
            ) : (
              <div className="grid-container">
                <div className="grid-item location"><LocationOn className="icon" /><span>Location:</span></div>
                <div className="grid-item">{currentLocationData.location}</div>
                <div className="grid-item aqi"><Air className="icon" /><span>AQI:</span></div>
                <div className="grid-item">{currentLocationData.aqi}</div>
                <div className="grid-item temperature"><Thermostat className="icon" /><span>Temperature:</span></div>
                <div className="grid-item">{currentLocationData.temperature}°C</div>
                <div className="grid-item humidity"><WaterDrop className="icon" /><span>Humidity:</span></div>
                <div className="grid-item">{currentLocationData.humidity}%</div>
              </div>
            )}
          </div>
          <div className="card-actions">
            <button className="refresh-btn" onClick={fetchLocationData}>Refresh</button>
          </div>
        </div>
      </div>

      {/* AI Mood Air Section */}
      <div className="info-box">
        <div className="card mood-card">
          <div className="card-content">
            <h6>🧠 AI Mood Air - How Today's Air Affects You</h6>
            
            <div className="mood-grid">
              <div className="mood-item">
                <FaBrain className="mood-icon" style={{ color: getMoodStatus(moodPrediction.focus).color }} />
                <div className="mood-info">
                  <span className="mood-label">Focus</span>
                  <div className="mood-bar">
                    <div 
                      className="mood-progress" 
                      style={{ 
                        width: `${moodPrediction.focus * 100}%`,
                        backgroundColor: getMoodStatus(moodPrediction.focus).color
                      }}
                    ></div>
                  </div>
                  <span className="mood-value">{(moodPrediction.focus * 100).toFixed(0)}%</span>
                </div>
              </div>

              <div className="mood-item">
                <FaBolt className="mood-icon" style={{ color: getMoodStatus(moodPrediction.energy).color }} />
                <div className="mood-info">
                  <span className="mood-label">Energy</span>
                  <div className="mood-bar">
                    <div 
                      className="mood-progress" 
                      style={{ 
                        width: `${moodPrediction.energy * 100}%`,
                        backgroundColor: getMoodStatus(moodPrediction.energy).color
                      }}
                    ></div>
                  </div>
                  <span className="mood-value">{(moodPrediction.energy * 100).toFixed(0)}%</span>
                </div>
              </div>

              <div className="mood-item">
                <FaSmile className="mood-icon" style={{ color: getMoodStatus(moodPrediction.mood).color }} />
                <div className="mood-info">
                  <span className="mood-label">Mood</span>
                  <div className="mood-bar">
                    <div 
                      className="mood-progress" 
                      style={{ 
                        width: `${moodPrediction.mood * 100}%`,
                        backgroundColor: getMoodStatus(moodPrediction.mood).color
                      }}
                    ></div>
                  </div>
                  <span className="mood-value">{(moodPrediction.mood * 100).toFixed(0)}%</span>
                </div>
              </div>
            </div>

            {moodPrediction.recommendations.length > 0 && (
              <div className="recommendations-section">
                <h6><FaLightbulb className="icon" /> AI Recommendations</h6>
                <div className="recommendations-list">
                  {moodPrediction.recommendations.map((rec, index) => (
                    <div key={index} className="recommendation-item">
                      • {rec}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="confidence-indicator">
              <small>AI Confidence: {(moodPrediction.confidence * 100).toFixed(0)}%</small>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Button to Full Mood Analysis */}
      <div className="info-box">
        <div className="card" style={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
          color: 'white', 
          textAlign: 'center' 
        }}>
          <div className="card-content">
            <FaBrain style={{ fontSize: '48px', marginBottom: '10px' }} />
            <h6>🔍 Detailed Mood Analysis</h6>
            <p style={{ fontSize: '14px', opacity: '0.9' }}>
              Get comprehensive insights, AI chat companion, and personalized recommendations
            </p>
            <Link to="/mood-analysis" style={{ textDecoration: 'none' }}>
              <button 
                className="btn w-100" 
                style={{ 
                  background: 'rgba(255,255,255,0.2)', 
                  color: 'white', 
                  border: '1px solid rgba(255,255,255,0.3)',
                  backdropFilter: 'blur(10px)',
                  fontWeight: 'bold'
                }}
              >
                <FaBrain className="me-2" />
                View Full Analysis →
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;