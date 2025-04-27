// import React, { useState, useEffect, useContext } from 'react';
// import "../index.css";
// import { Mycontext } from "../App";
// import formula from "../assets/images/forecasting.webp";
// import axios from "axios";
// import { Card, CardContent, Typography, Grid } from '@mui/material';
// import { Line } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// const AqiForecast = () => {
//     const context = useContext(Mycontext);
//     const { currentLocationData } = context;
//     const [forecastData, setForecastData] = useState([]);
//     const [forecast, setForecast] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         // Only fetch data when currentLocationData is available
//         if (currentLocationData && currentLocationData.aqiDataJson) {
//             fetchForecast();
//         }
//     }, [currentLocationData]);

//     useEffect(() => {
//         // Fetch model forecast data
//         const fetchModelData = async () => {
//             try {
//                 setIsLoading(true);
//                 const response = await axios.post("http://localhost:8000/forecast-model/", { days: 7 });
//                 setForecast(response.data);
//             } catch (error) {
//                 console.error("Error fetching model data:", error);
//                 setError("Failed to fetch forecast model data");
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         fetchModelData();
//     }, []);

//     const fetchForecast = async () => {
//         try {
//             setIsLoading(true);
//             if (!currentLocationData.aqiDataJson || 
//                 !currentLocationData.aqiDataJson.data || 
//                 !currentLocationData.aqiDataJson.data.forecast || 
//                 !currentLocationData.aqiDataJson.data.forecast.daily) {
//                 console.error("Forecast data not available");
//                 setError("Forecast data not available");
//                 return;
//             }

//             const forecast = currentLocationData.aqiDataJson.data.forecast.daily;
//             let formattedData = forecast.pm25.map((item, index) => {
//                 const pm10Data = forecast.pm10 && forecast.pm10[index] ? forecast.pm10[index].avg : 0;
//                 const o3Data = forecast.o3 && forecast.o3[index] ? forecast.o3[index].avg : 0;

//                 return {
//                     date: item.day,
//                     pm25: item.avg,
//                     pm10: pm10Data,
//                     o3: o3Data,
//                     predictedAQI: calculateAQI(item.avg, pm10Data, o3Data),
//                 };
//             });

//             setForecastData(formattedData);
//             console.log("Formatted Forecast Data:", formattedData);
//         } catch (error) {
//             console.error("Error fetching forecast:", error);
//             setError("Failed to fetch forecast data");
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const getAQI = (concentration, breakpoints) => {
//         for (let [C_low, C_high, I_low, I_high] of breakpoints) {
//             if (concentration >= C_low && concentration <= C_high) {
//                 return Math.round(((I_high - I_low) / (C_high - C_low)) * (concentration - C_low) + I_low);
//             }
//         }
//         return 0;
//     };

//     const calculateAQI = (pm25, pm10, o3) => {
//         const pm25Breakpoints = [[0, 12, 0, 50], [12.1, 35.4, 51, 100], [35.5, 55.4, 101, 150], [55.5, 150.4, 151, 200], [150.5, 250.4, 201, 300], [250.5, 500.4, 301, 500]];
//         const pm10Breakpoints = [[0, 54, 0, 50], [55, 154, 51, 100], [155, 254, 101, 150], [255, 354, 151, 200], [355, 424, 201, 300], [425, 604, 301, 500]];
//         const o3Breakpoints = [[0, 54, 0, 50], [55, 70, 51, 100], [71, 85, 101, 150], [86, 105, 151, 200], [106, 200, 201, 300]];

//         let aqiPM25 = getAQI(pm25, pm25Breakpoints);
//         let aqiPM10 = getAQI(pm10, pm10Breakpoints);
//         let aqiO3 = getAQI(o3, o3Breakpoints);

//         return Math.max(aqiPM25, aqiPM10, aqiO3);
//     };

//     // Format dates consistently for both charts
//     const formatDates = (dateStr) => {
//         try {
//             return new Date(dateStr).toLocaleDateString();
//         } catch (e) {
//             return dateStr;
//         }
//     };

//     // Common chart options for consistent appearance
//     const chartOptions = {
//         responsive: true,
//         scales: {
//             y: {
//                 beginAtZero: true,
//                 title: {
//                     display: true,
//                     text: 'AQI Value'
//                 }
//             },
//             x: {
//                 title: {
//                     display: true,
//                     text: 'Date'
//                 }
//             }
//         },
//         plugins: {
//             legend: {
//                 position: 'top',
//             },
//             tooltip: {
//                 mode: 'index',
//                 intersect: false,
//             },
//         },
//     };
    
//     // Consistent colors for both charts
//     const primaryColor = "rgba(75, 192, 192, 1)";
//     const primaryColorBg = "rgba(75, 192, 192, 0.2)";
//     const secondaryColor = "rgba(255, 99, 132, 1)";
//     const secondaryColorBg = "rgba(255, 99, 132, 0.2)";

//     // Convert model predicted PM2.5 to AQI for consistency
//     const modelAQIValues = forecast.map(item => {
//         // Using only PM2.5 for AQI calculation since that's what we have from the model
//         return calculateAQI(item.predicted_pm25 || 0, 0, 0);
//     });

//     const chartDataAPI = {
//         labels: forecastData.map(item => formatDates(item.date)),
//         datasets: [
//             {
//                 label: "API Forecasted AQI",
//                 data: forecastData.map(item => item.predictedAQI || 0),
//                 borderColor: primaryColor,
//                 backgroundColor: primaryColorBg,
//                 tension: 0.1
//             },
//         ],
//     };

//     const chartDataModel = {
//         labels: forecast.map(item => formatDates(item.date)),
//         datasets: [
//             {
//                 label: "Model Predicted AQI",
//                 data: modelAQIValues,
//                 borderColor: primaryColor,
//                 backgroundColor: primaryColorBg,
//                 tension: 0.1
//             },
//         ],
//     };

//     if (isLoading) {
//         return <div className="loading">Loading forecast data...</div>;
//     }

//     if (error) {
//         return <div className="error">{error}</div>;
//     }

//     return (
//         <div className="airForcastingWrapper">
//             <h2 className="aqiforecast-title">AQI Forecast Of Dhaka</h2>
            
//             {forecastData.length > 0 ? (
//                 <table className="aqiforecast-table">
//                     <thead>
//                         <tr>
//                             <th>Date</th>
//                             <th>PM2.5</th>
//                             <th>PM10</th>
//                             <th>O3</th>
//                             <th>Predicted AQI</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {forecastData.map((item, index) => (
//                             <tr key={index}>
//                                 <td>{item.date}</td>
//                                 <td>{item.pm25} µg/m³</td>
//                                 <td>{item.pm10}</td>
//                                 <td>{item.o3}</td>
//                                 <td>{item.predictedAQI}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             ) : (
//                 <p>No forecast data available</p>
//             )}

//             <h3 className="aqiforecast-subtitle">How AQI is Calculated</h3>
//             <img src={formula} alt="AQI Calculation Formula" />

//             <Grid container spacing={2} className="chart-container">
//                 <Grid item xs={12} md={6}>
//                     <Card>
//                         <CardContent>
//                             <Typography variant="h5">API Forecasted AQI</Typography>
//                             {forecastData.length > 0 ? (
//                                 <Line data={chartDataAPI} options={chartOptions} />
//                             ) : (
//                                 <p>No API forecast data available</p>
//                             )}
//                         </CardContent>
//                     </Card>
//                 </Grid>
//                 <Grid item xs={12} md={6}>
//                     <Card>
//                         <CardContent>
//                             <Typography variant="h5">Model Predicted AQI</Typography>
//                             {forecast.length > 0 ? (
//                                 <Line data={chartDataModel} options={chartOptions} />
//                             ) : (
//                                 <p>No model prediction data available</p>
//                             )}
//                         </CardContent>
//                     </Card>
//                 </Grid>
//             </Grid>
//         </div>
//     );
// };

// export default AqiForecast;




































import React, { useState, useEffect, useContext } from 'react';
import "../index.css";
import { Mycontext } from "../App";
import formula from "../assets/images/forecasting.webp";
import axios from "axios";
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const AqiForecast = () => {
    const context = useContext(Mycontext);
    const { currentLocationData } = context;
    const [forecastData, setForecastData] = useState([]);
    const [forecast, setForecast] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Only fetch data when currentLocationData is available
        if (currentLocationData && currentLocationData.aqiDataJson) {
            fetchForecast();
        }
    }, [currentLocationData]);

    useEffect(() => {
        // Fetch model forecast data
        const fetchModelData = async () => {
            try {
                setIsLoading(true);
                const response = await axios.post("http://localhost:8000/forecast-model/", { days: 7 });
                setForecast(response.data);
            } catch (error) {
                console.error("Error fetching model data:", error);
                setError("Failed to fetch forecast model data");
            } finally {
                setIsLoading(false);
            }
        };

        fetchModelData();
    }, []);

    const fetchForecast = async () => {
        try {
            setIsLoading(true);
            if (!currentLocationData.aqiDataJson || 
                !currentLocationData.aqiDataJson.data || 
                !currentLocationData.aqiDataJson.data.forecast || 
                !currentLocationData.aqiDataJson.data.forecast.daily) {
                console.error("Forecast data not available");
                setError("Forecast data not available");
                return;
            }

            const forecast = currentLocationData.aqiDataJson.data.forecast.daily;
            let formattedData = forecast.pm25.map((item, index) => {
                const pm10Data = forecast.pm10 && forecast.pm10[index] ? forecast.pm10[index].avg : 0;
                const o3Data = forecast.o3 && forecast.o3[index] ? forecast.o3[index].avg : 0;

                return {
                    date: item.day,
                    pm25: item.avg,
                    pm10: pm10Data,
                    o3: o3Data,
                    predictedAQI: calculateAQI(item.avg, pm10Data, o3Data),
                };
            });

            setForecastData(formattedData);
            console.log("Formatted Forecast Data:", formattedData);
        } catch (error) {
            console.error("Error fetching forecast:", error);
            setError("Failed to fetch forecast data");
        } finally {
            setIsLoading(false);
        }
    };

    const getAQI = (concentration, breakpoints) => {
        for (let [C_low, C_high, I_low, I_high] of breakpoints) {
            if (concentration >= C_low && concentration <= C_high) {
                return Math.round(((I_high - I_low) / (C_high - C_low)) * (concentration - C_low) + I_low);
            }
        }
        return 0;
    };

    const calculateAQI = (pm25, pm10, o3) => {
        const pm25Breakpoints = [[0, 12, 0, 50], [12.1, 35.4, 51, 100], [35.5, 55.4, 101, 150], [55.5, 150.4, 151, 200], [150.5, 250.4, 201, 300], [250.5, 500.4, 301, 500]];
        const pm10Breakpoints = [[0, 54, 0, 50], [55, 154, 51, 100], [155, 254, 101, 150], [255, 354, 151, 200], [355, 424, 201, 300], [425, 604, 301, 500]];
        const o3Breakpoints = [[0, 54, 0, 50], [55, 70, 51, 100], [71, 85, 101, 150], [86, 105, 151, 200], [106, 200, 201, 300]];

        let aqiPM25 = getAQI(pm25, pm25Breakpoints);
        let aqiPM10 = getAQI(pm10, pm10Breakpoints);
        let aqiO3 = getAQI(o3, o3Breakpoints);

        return Math.max(aqiPM25, aqiPM10, aqiO3);
    };

    // Format dates consistently for both charts
    const formatDates = (dateStr) => {
        try {
            return new Date(dateStr).toLocaleDateString();
        } catch (e) {
            return dateStr;
        }
    };

    // Convert model predicted PM2.5 to AQI for consistency
    const modelAQIValues = forecast.map(item => {
        // Using only PM2.5 for AQI calculation since that's what we have from the model
        return calculateAQI(item.predicted_pm25 || 0, 0, 0);
    });

    // Calculate min and max values for y-axis scaling
    const getYAxisConfig = () => {
        const apiValues = forecastData.map(item => item.predictedAQI || 0);
        const allValues = [...apiValues, ...modelAQIValues];
        
        if (allValues.length === 0) return { min: 0, max: 100 };
        
        // Find minimum and maximum across all datasets
        const minValue = Math.max(0, Math.floor(Math.min(...allValues) * 0.9));
        const maxValue = Math.ceil(Math.max(...allValues) * 1.1);
        
        return { min: minValue, max: maxValue };
    };

    const yAxisScale = getYAxisConfig();
    
    // Common chart options for consistent appearance
    const chartOptions = {
        responsive: true,
        scales: {
            y: {
                beginAtZero: false,
                min: yAxisScale.min,
                max: yAxisScale.max,
                title: {
                    display: true,
                    text: 'AQI Value'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Date'
                }
            }
        },
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                mode: 'index',
                intersect: false,
            },
        },
    };
    
    // Consistent colors for both charts
    const primaryColor = "rgba(75, 192, 192, 1)";
    const primaryColorBg = "rgba(75, 192, 192, 0.2)";

    const chartDataAPI = {
        labels: forecastData.map(item => formatDates(item.date)),
        datasets: [
            {
                label: "API Forecasted AQI",
                data: forecastData.map(item => item.predictedAQI || 0),
                borderColor: primaryColor,
                backgroundColor: primaryColorBg,
                tension: 0.1
            },
        ],
    };

    const chartDataModel = {
        labels: forecast.map(item => formatDates(item.date)),
        datasets: [
            {
                label: "Model Predicted AQI",
                data: modelAQIValues,
                borderColor: primaryColor,
                backgroundColor: primaryColorBg,
                tension: 0.1
            },
        ],
    };

    if (isLoading) {
        return <div className="loading">Loading forecast data...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="airForcastingWrapper">
            <h2 className="aqiforecast-title">AQI Forecast Of Dhaka</h2>
            
            {forecastData.length > 0 ? (
                <table className="aqiforecast-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>PM2.5</th>
                            <th>PM10</th>
                            <th>O3</th>
                            <th>Predicted AQI</th>
                        </tr>
                    </thead>
                    <tbody>
                        {forecastData.map((item, index) => (
                            <tr key={index}>
                                <td>{item.date}</td>
                                <td>{item.pm25} µg/m³</td>
                                <td>{item.pm10}</td>
                                <td>{item.o3}</td>
                                <td>{item.predictedAQI}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No forecast data available</p>
            )}

            <h3 className="aqiforecast-subtitle">How AQI is Calculated</h3>
            <img src={formula} alt="AQI Calculation Formula" />

            <Grid container spacing={2} className="chart-container">
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5">API Forecasted AQI</Typography>
                            {forecastData.length > 0 ? (
                                <Line data={chartDataAPI} options={chartOptions} />
                            ) : (
                                <p>No API forecast data available</p>
                            )}
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5">Model Predicted AQI</Typography>
                            {forecast.length > 0 ? (
                                <Line data={chartDataModel} options={chartOptions} />
                            ) : (
                                <p>No model prediction data available</p>
                            )}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
};

export default AqiForecast;