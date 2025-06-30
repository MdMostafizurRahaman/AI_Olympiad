from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import joblib
import pandas as pd
from pydantic import BaseModel
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

