from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import joblib
import pandas as pd
from pydantic import BaseModel
from datetime import datetime
import random
from datetime import datetime

# Load the trained SARIMAX model
model = joblib.load("sarimax_model.pkl")

# Initialize FastAPI app
app = FastAPI()

# CORS setup to allow frontend to access the backend
origins = [
    "http://localhost:5173",  # React app (adjust if you use another port or host)
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)



# Define a request model if needed
class ForecastRequest(BaseModel):
    days: int = 7  # Default forecast for 7 days

@app.get("/")
def home():
    return {"message": "AQI Forecast API is running!!"}



@app.post("/forecast-model/")
def get_forecast(request: ForecastRequest):
    # Load the CSV and get the last date
    df = pd.read_csv("dhaka_data_2.csv")
    df['date'] = pd.to_datetime(df['date'])
    last_date = df['date'].max()

    # Generate future dates
    future_dates = pd.date_range(start=last_date + pd.Timedelta(days=1), periods=request.days, freq="D")

    # Predict for the next N days after the last known value
    start = len(model.data.endog)
    end = start + request.days - 1
    forecast = model.predict(start=start, end=end)

    forecast_df = pd.DataFrame({
        "date": future_dates.strftime("%Y-%m-%d"),
        "predicted_pm25": forecast.values
    })
    return {"predictions": forecast_df.to_dict(orient="records")}

# Add these imports to your existing server.py

# Add this new endpoint after your existing ones
@app.post("/mood-prediction/")
def get_mood_prediction(request: dict):
    """
    Simple mood prediction based on AQI and environmental factors
    """
    aqi = request.get('aqi', 100)
    temperature = request.get('temperature', 25)
    humidity = request.get('humidity', 60)
    
    # Simple mood calculation based on research
    focus_impact = max(0.2, 1 - (aqi - 50) * 0.003)
    energy_impact = max(0.2, 1 - (aqi - 30) * 0.004)
    mood_impact = max(0.2, 1 - (aqi - 40) * 0.0035)
    
    # Generate recommendations
    recommendations = []
    if aqi > 100:
        recommendations.extend([
            "Take frequent indoor breaks",
            "Use air purifiers if available",
            "Stay well-hydrated"
        ])
    if focus_impact < 0.6:
        recommendations.extend([
            "Try breathing exercises",
            "Take short meditation breaks"
        ])
    if energy_impact < 0.6:
        recommendations.extend([
            "Consider vitamin D supplements",
            "Light indoor exercises"
        ])
    
    return {
        "focus": focus_impact,
        "energy": energy_impact,
        "mood": mood_impact,
        "recommendations": recommendations,
        "confidence": 0.8,
        "timestamp": datetime.now().isoformat()
    }

@app.post("/chat-companion/")
def chat_companion(request: dict):
    """
    Simple AI companion responses
    """
    user_message = request.get('message', '')
    
    responses = [
        "Based on today's air quality, I recommend taking breaks every 90 minutes.",
        "The current pollution levels might affect your energy. Try staying hydrated!",
        "I understand you're feeling the effects. Deep breathing exercises can help.",
        "Given today's AQI, it's normal to feel less energetic. Try some indoor activities!",
        "The air quality suggests you might experience fatigue. Have you been drinking water?"
    ]
    
    return {
        "response": random.choice(responses),
        "timestamp": datetime.now().isoformat()
    }