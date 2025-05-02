
import React, { useState, useEffect } from 'react';
import { useContext } from "react";
import "../index.css";
import { Mycontext } from "../App";


const AirQualityIndex = () => {
    const [aqi, setAqi] = useState(null);
    const [healthAdvice, setHealthAdvice] = useState('');
    const context = useContext(Mycontext);
    const { fetchLocationData, currentLocationData, isFetching } = context;

    useEffect(() => {
        try {
            fetchLocationData();
            const aqiValue = currentLocationData.aqi;
            setAqi(aqiValue);
            setHealthAdvice(getHealthAdvice(aqiValue));
        }
        catch {
            setAqi("Error fetching data!");
        }
    }, []);

    // useEffect(() => {
    //     fetchLocationData();
    // }, []);
    
    // useEffect(() => {
    //     if (currentLocationData && currentLocationData.aqi !== undefined) {
    //         const aqiValue = currentLocationData.aqi;
    //         setAqi(aqiValue);
    //         setHealthAdvice(getHealthAdvice(aqiValue));
    //     }
    // }, [currentLocationData]);
    


    const getAQIColorClass = (aqi) => {
        if (aqi <= 50) return "aqiGood";
        if (aqi <= 100) return "aqiModerate";
        if (aqi <= 150) return "aqiUnhealthySensitive";
        if (aqi <= 200) return "aqiUnhealthy";
        if (aqi <= 300) return "aqiVeryUnhealthy";
        return "aqiHazardous";
    };

    const getHealthAdvice = (aqi) => {
        if (aqi <= 50) return "Good - Enjoy activities";
        if (aqi <= 100) return "Moderate - Acceptable air quality";
        if (aqi <= 150) return "Unhealthy for sensitive groups - Sensitive groups should limit outdoor activities";
        if (aqi <= 200) return "Unhealthy - Everyone should limit outdoor activities";
        if (aqi <= 300) return "Very Unhealthy - Health alert: everyone may experience more serious health effects";
        return "Hazardous - Health warnings of emergency conditions: everyone should avoid outdoor activities";
    };


    return (
        <div className="airQualityIndexWrapper">
            <h2 className="aqiTitle">Current Air Quality</h2>
            <div id="aqiBox" className={`aqiBox ${getAQIColorClass(aqi)}`}>
                {aqi ? `AQI: ${aqi}` : "Fetching AQI..."}
            </div>
            <p id="comparisonText">{healthAdvice}</p>
            <h3 className="aqiTitle">AQI Ranges</h3>
            <table className="aqiTable">
                <thead>
                    <tr>
                        <th>Range</th>
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="aqiGood">
                        <td>0-50</td>
                        <td>Good</td>
                    </tr>
                    <tr className="aqiModerate">
                        <td>51-100</td>
                        <td>Moderate</td>
                    </tr>
                    <tr className="aqiUnhealthySensitive">
                        <td>101-150</td>
                        <td>Unhealthy for sensitive groups</td>
                    </tr>
                    <tr className="aqiUnhealthy">
                        <td>151-200</td>
                        <td>Unhealthy</td>
                    </tr>
                    <tr className="aqiVeryUnhealthy">
                        <td>201-300</td>
                        <td>Very Unhealthy</td>
                    </tr>
                    <tr className="aqiHazardous">
                        <td>301+</td>
                        <td>Hazardous</td>
                    </tr>
                </tbody>

            </table>
        </div>
    );
};

export default AirQualityIndex;
