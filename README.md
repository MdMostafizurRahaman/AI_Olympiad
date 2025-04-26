# AQI App

The AQI App is a comprehensive web application designed to provide real-time air quality index (AQI) data, weather information, safety recommendations, and more. It helps users stay informed about air pollution levels and take preventive measures to safeguard their health.

---

## Features

- **Real-Time AQI Data**: Displays current AQI levels for the user's location.
- **Weather Information**: Provides temperature and humidity details.
- **AQI Forecast**: Predicts AQI levels for the next 7 days using a forecasting model.
- **Safety Recommendations**: Offers tips and product recommendations to protect against air pollution.
- **Interactive Map**: Visualizes AQI data on a map using Google Maps API.
- **User Authentication**: Supports login, signup, and Google authentication.
- **Notifications**: Sends periodic AQI updates and alerts.
- **Daily Reports**: Redirects users to official government reports for detailed air quality data.
- **AI Chatbot**: An AI-powered chatbot for personalized safety advice.

---

## Tech Stack

- **Frontend**: React, React Router, Material-UI, Bootstrap
- **Backend**: Flask, Firebase (Authentication, Firestore)
- **APIs**: OpenWeatherMap API, AQICN API, Google Maps API
- **Charting**: Chart.js
- **Styling**: CSS, Material-UI, Bootstrap
- **AI Integration**: Google Generative Language API
- **Machine Learning**: SARIMAX model for AQI forecasting

---

## Installation

### Prerequisites

- Node.js and npm installed
- Python 3.x installed
- Flask installed
- Firebase project set up

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/aqi-app.git
   cd aqi-app
   ```

2. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```

3. Install backend dependencies:
   ```bash
   cd ../backend
   pip install -r requirements.txt
   ```

4. Start the backend server:
   ```bash
   cd backend
   flask run
   ```

5. Start the frontend development server:
   ```bash
   cd ../frontend
   npm run dev
   ```

6. Open the app in your browser at `http://localhost:5173`.

---

## Project Structure

```
aqi-app/
├── backend/
│   ├── app.py                # Main Flask application
│   ├── requirements.txt      # Backend dependencies
│   ├── sarimax_model.pkl     # Pre-trained SARIMAX model for AQI forecasting
│   ├── .gitIgnore            # Ignore model files
│   ├── static/               # Static files for the backend
│   ├── templates/            # HTML templates (if any)
│   ├── utils/                # Utility scripts for data processing
│   └── .env                  # Backend environment variables
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header/
│   │   │   │   ├── Header.jsx
│   │   │   │   ├── AIChatbotModal.jsx
│   │   ├── pages/
│   │   │   ├── DashBoard.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── SignUp.jsx
│   │   │   ├── AirQualityIndex.jsx
│   │   │   ├── AqiForecast.jsx
│   │   │   ├── AqiRanking.jsx
│   │   │   ├── SafetyMeasurement.jsx
│   │   │   ├── DailyReport.jsx
│   │   │   ├── Notification.jsx
│   │   │   ├── Recommendation.jsx
│   │   ├── assets/
│   │   ├── index.css
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── firebaseConfig.js
│   │   ├── authService.js
│   ├── .env                  # Frontend environment variables
│   ├── package.json          # Frontend dependencies
│   ├── vite.config.js        # Vite configuration
├── .gitignore                # Ignore unnecessary files
├── README.md                 # Project documentation
```

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature-name"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Contact

For any inquiries, please contact [bsse1320@iit.du.ac.bd].
