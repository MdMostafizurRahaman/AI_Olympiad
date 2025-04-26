import React, { createContext, useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DashBoard from './pages/DashBoard';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar.jsx';
import Login from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx';
import News from './pages/News.jsx';
import AirQualityIndex from './pages/AirQualityIndex.jsx'
import AqiForecast from './pages/AqiForecast.jsx';
import AqiRanking from './pages/AqiRanking.jsx'
import SafetyMeasurement from './pages/SafetyMeasurement.jsx';
import DailyReport from './pages/DailyReport.jsx';
import Notification from "./pages/Notification";
import Recommendation from "./pages/Recommendation";

const Mycontext = createContext();

const App = () => {
  const [isToggleSidebar, setIsToggleSidebar] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isHideSidebarAndHeader, setisHideSidebarAndHeader] = useState(false);
  const [themeMode, setThemeMode] = useState(true);
  const [currentLocationData, setCurrentLocationData] = useState({
    aqiDataJson: null,
    aqi: null,
    temperature: null,
    humidity: null,
    location: null,
  });
  const [isFetching, setIsFetching] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => {
    if (themeMode === true) {
      document.body.classList.remove('dark');
      document.body.classList.add('light');
      localStorage.setItem('themeMode', 'light');
    } else {
      document.body.classList.remove('light');
      document.body.classList.add('dark');
      localStorage.setItem('themeMode', 'dark');
    }
  }, [themeMode]);

  const fetchLocationData = async (searchLocation = null) => {
    setIsFetching(true);
    const aqicnToken = import.meta.env.VITE_AQICN_API_TOKEN;
    const weatherApiKey = import.meta.env.VITE_WEATHER_API_KEY;
  
    try {
      let latitude, longitude, locationName;
  
      if (searchLocation) {
        // Fetch coordinates based on searched city name
        const geoResponse = await fetch(
          `https://api.openweathermap.org/geo/1.0/direct?q=${searchLocation}&limit=1&appid=${weatherApiKey}`
        );
        const geoData = await geoResponse.json();
  
        if (geoData.length === 0) {
          console.error("Location not found");
          setIsFetching(false);
          return;
        }
  
        latitude = geoData[0].lat;
        longitude = geoData[0].lon;
        locationName = geoData[0].name;
      } else {
        // Use device's current location when no search is made
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
  
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
      }
  
      // Fetch AQI Data
      const aqiResponse = await fetch(
        `https://api.waqi.info/feed/geo:${latitude};${longitude}/?token=${aqicnToken}`
      );
      const aqiData = await aqiResponse.json();
  
      // Fetch Weather Data
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weatherApiKey}&units=metric`
      );
      const weatherData = await weatherResponse.json();
  
      setCurrentLocationData({
        aqiDataJson: aqiData || "N/A",
        aqi: aqiData.data.aqi || "N/A",
        temperature: weatherData.main.temp || "N/A",
        humidity: weatherData.main.humidity || "N/A",
        location: locationName || weatherData.name || "N/A",
      });
    } catch (error) {
      console.error("Error fetching location data:", error);
    } finally {
      setIsFetching(false);
    }
  };
  

  useEffect(() => {
    fetchLocationData(); // Initial fetch
    const intervalId = setInterval(fetchLocationData, 60 * 60 * 1000); // Update every hour

    return () => clearInterval(intervalId);
  }, []);

  const values = {
    isToggleSidebar,
    setIsToggleSidebar,
    isLogin,
    setIsLogin,
    isHideSidebarAndHeader,
    setisHideSidebarAndHeader,
    themeMode,
    setThemeMode,
    fetchLocationData, // Expose fetch function for searching
    setCurrentLocationData, // Allow resetting to current location
    currentLocationData, // Provide location data in context
    isFetching, // Provide loading state in context
    name,
    setName
  };
  
  return (
    <BrowserRouter>
      <Mycontext.Provider value={values}>
        {isHideSidebarAndHeader !== true && <Header />}
        <div className="main d-flex">
          {isHideSidebarAndHeader !== true && (
            <div className={`sidebarWrapper ${isToggleSidebar ? 'toggle' : ''}`}>
              <Sidebar />
            </div>
          )}

          <div className={`content ${isHideSidebarAndHeader ? 'full' : ''} ${isToggleSidebar ? 'toggle' : ''}`}>
            <Routes>
              <Route path="/" exact element={<DashBoard />} />
              <Route path="/dashboard" exact element={<DashBoard />} />
              <Route path="/login" exact element={<Login />} />
              <Route path="/signUp" exact element={<SignUp />} />
              <Route path="/news" exact element={<News />} />
              <Route path="/air-quality-index" exact element={<AirQualityIndex />} />
              <Route path="/forecast" exact element={<AqiForecast />} />
              <Route path="/aqi-ranking" exact element={<AqiRanking />} />
              <Route path="/safety" exact element={<SafetyMeasurement />} />
              <Route path='/daily-report' exact element={<DailyReport />} />
              <Route path="/notification" element={<Notification />} />
              <Route path="/recommerndations" element={<Recommendation />} />
             
              
            </Routes>
          </div>
        </div>
      </Mycontext.Provider>
    </BrowserRouter>
  );
};

export default App;
export { Mycontext };
