// import React, { useState, useEffect, useContext } from 'react';
// import "../index.css";
// import { Mycontext } from "../App";
// import formula from "../assets/images/forecasting.webp"

// const AqiRanking = () => {
//   return (
//     <div className="aqiRankingWrapper">
//           <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam rem cumque nisi. Modi dicta sequi, veritatis atque libero fuga voluptatibus non quaerat explicabo mollitia labore expedita cum. Consectetur dignissimos laborum, nulla adipisci quidem sunt omnis quis animi magnam recusandae, deserunt, deleniti minus. Quis tenetur totam natus corrupti accusantium distinctio dolorem amet veniam dolore harum! Facilis expedita recusandae similique labore quas iusto repellat libero consequatur, pariatur nemo, quidem fuga voluptas ad accusamus deserunt laudantium animi? Voluptatum voluptas ab quod laborum earum molestias, esse illum, odio pariatur dolorum rem provident animi iusto. Debitis animi ad ut alias reprehenderit possimus praesentium voluptatibus non.
//           </div>
//     </div>
//   )
// }

// export default AqiRanking

import React, { useState, useEffect } from 'react';
import "../index.css";
import formula from "../assets/images/forecasting.webp";

const AqiRanking = () => {
  const [locations, setLocations] = useState([]);
  const [sortedLocations, setSortedLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
        const locationData = [
            { city: "Vancouver", country: "Canada", code: "CA" },
            { city: "Melbourne", country: "Australia", code: "AU" },
            { city: "Canberra", country: "Australia", code: "AU" },
            { city: "Sydney", country: "Australia", code: "AU" },
            { city: "Bogota", country: "Colombia", code: "CO" },
            { city: "Seattle", country: "USA", code: "US" },
            { city: "Portland", country: "USA", code: "US" },
            { city: "Taipei", country: "Taiwan", code: "TW" },
            { city: "Copenhagen", country: "Denmark", code: "DK" },
            { city: "Sao Paulo", country: "Brazil", code: "BR" },
            { city: "Hong Kong", country: "Hong Kong SAR", code: "HK" },
            { city: "Minneapolis", country: "USA", code: "US" },
            { city: "Denver", country: "USA", code: "US" },
            { city: "Helsinki", country: "Finland", code: "FI" },
            { city: "Stockholm", country: "Sweden", code: "SE" },
            { city: "Berlin", country: "Germany", code: "DE" },
            { city: "Tokyo", country: "Japan", code: "JP" },
            { city: "Kuching", country: "Malaysia", code: "MY" },
            { city: "Madrid", country: "Spain", code: "ES" },
            { city: "Algiers", country: "Algeria", code: "DZ" },
            { city: "Prague", country: "Czech Republic", code: "CZ" },
            { city: "San Francisco", country: "USA", code: "US" },
            { city: "Bern", country: "Switzerland", code: "CH" },
            { city: "Nice", country: "France", code: "FR" },
            { city: "Auckland", country: "New Zealand", code: "NZ" },
            { city: "Paris", country: "France", code: "FR" },
            { city: "Brussels", country: "Belgium", code: "BE" },
            { city: "Washington D.C.", country: "USA", code: "US" },
            { city: "Bratislava", country: "Slovakia", code: "SK" },
            { city: "Manila", country: "Philippines", code: "PH" },
            { city: "Munich", country: "Germany", code: "DE" },
            { city: "Almaty", country: "Kazakhstan", code: "KZ" },
            { city: "Lyon", country: "France", code: "FR" },
            { city: "Santiago", country: "Chile", code: "CL" },
            { city: "Warsaw", country: "Poland", code: "PL" },
            { city: "Wrocław", country: "Poland", code: "PL" },
            { city: "Budapest", country: "Hungary", code: "HU" },
            { city: "Houston", country: "USA", code: "US" },
            { city: "Birmingham", country: "United Kingdom", code: "GB" },
            { city: "Singapore", country: "Singapore", code: "SG" },
            { city: "Lisbon", country: "Portugal", code: "PT" },
            { city: "Vienna", country: "Austria", code: "AT" },
            { city: "London", country: "United Kingdom", code: "GB" },
            { city: "Jerusalem", country: "Israel", code: "IL" },
            { city: "Barcelona", country: "Spain", code: "ES" },
            { city: "Bucharest", country: "Romania", code: "RO" },
            { city: "Lima", country: "Peru", code: "PE" },
            { city: "Salt Lake City", country: "USA", code: "US" },
            { city: "Moscow", country: "Russia", code: "RU" },
            { city: "Belgrade", country: "Serbia", code: "RS" },
            { city: "Chicago", country: "USA", code: "US" },
            { city: "Sofia", country: "Bulgaria", code: "BG" },
            { city: "Amsterdam", country: "Netherlands", code: "NL" },
            { city: "Baku", country: "Azerbaijan", code: "AZ" },
            { city: "Addis Ababa", country: "Ethiopia", code: "ET" },
            { city: "Kraków", country: "Poland", code: "PL" },
            { city: "Milano", country: "Italy", code: "IT" },
            { city: "Zagreb", country: "Croatia", code: "HR" },
            { city: "Ho Chi Minh City", country: "Vietnam", code: "VN" },
            { city: "Montreal", country: "Canada", code: "CA" },
            { city: "Ljubljana", country: "Slovenia", code: "SI" },
            { city: "Dublin", country: "Ireland", code: "IE" },
            { city: "Riyadh", country: "Saudi Arabia", code: "SA" },
            { city: "Rome", country: "Italy", code: "IT" },
            { city: "Kuala Lumpur", country: "Malaysia", code: "MY" },
            { city: "Busan", country: "South Korea", code: "KR" },
            { city: "Kyiv", country: "Ukraine", code: "UA" },
            { city: "Shenzhen", country: "China", code: "CN" },
            { city: "Detroit", country: "USA", code: "US" },
            { city: "New York City", country: "USA", code: "US" },
            { city: "Nairobi", country: "Kenya", code: "KE" },
            { city: "Los Angeles", country: "USA", code: "US" },
            { city: "Dubai", country: "United Arab Emirates", code: "AE" },
            { city: "Chiang Mai", country: "Thailand", code: "TH" },
            { city: "Chengdu", country: "China", code: "CN" },
            { city: "Mumbai", country: "India", code: "IN" },
            { city: "Jakarta", country: "Indonesia", code: "ID" },
            { city: "Kuwait City", country: "Kuwait", code: "KW" },
            { city: "Tel Aviv-Yafo", country: "Israel", code: "IL" },
            { city: "Manama", country: "Bahrain", code: "BH" },
            { city: "Bishkek", country: "Kyrgyzstan", code: "KG" },
            { city: "Hangzhou", country: "China", code: "CN" },
            { city: "Athens", country: "Greece", code: "GR" },
            { city: "Oslo", country: "Norway", code: "NO" },
            { city: "Istanbul", country: "Turkey", code: "TR" },
            { city: "Bangkok", country: "Thailand", code: "TH" },
            { city: "Cairo", country: "Egypt", code: "EG" },
            { city: "Tehran", country: "Iran", code: "IR" },
            { city: "Karachi", country: "Pakistan", code: "PK" },
            { city: "Kathmandu", country: "Nepal", code: "NP" },
            { city: "Chongqing", country: "China", code: "CN" },
            { city: "Ulaanbaatar", country: "Mongolia", code: "MN" },
            { city: "Delhi", country: "India", code: "IN" },
            { city: "Dhaka", country: "Bangladesh", code: "BD" },
            { city: "Lahore", country: "Pakistan", code: "PK" }
        ];
    

      const token =  import.meta.env.VITE_REACT_APP_AQI_TOKEN;
      if (!token) {
        console.error("API token is missing");
        return;
      }

      const fetchAQI = async (location) => {
        try {
          const response = await fetch(`https://api.waqi.info/feed/${location.city.toLowerCase().replace(/ /g, '-')}/?token=${token}`);
          const data = await response.json();
          if (!data || !data.data || !data.data.aqi) {
            console.error(`Invalid data for ${location.city}`, data);
            return { ...location, aqi: 'N/A' };
          }
          return { ...location, aqi: data.data.aqi };
        } catch (error) {
          console.error(`Error fetching data for ${location.city}:`, error);
          return { ...location, aqi: 'N/A' };
        }
      };

      const aqiData = await Promise.all(locationData.map(fetchAQI));
      const validAqiData = aqiData.filter(item => item.aqi !== 'N/A');
      setLocations(validAqiData);
      setSortedLocations(validAqiData.sort((a, b) => a.city.localeCompare(b.city)));
      console.log("Fetched and sorted AQI data:", validAqiData);
    };

    fetchLocations(); // Initial fetch

    const intervalId = setInterval(fetchLocations, 86400000); // 24 hours in milliseconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount

  }, []);

  const getAQIColor = (aqi) => {
    if (aqi === 'N/A') return '#666666';
    const value = parseInt(aqi);
    if (value <= 50) return '#009966';
    if (value <= 100) return '#c2a546';
    if (value <= 150) return '#ff9933';
    if (value <= 200) return '#cc0033';
    if (value <= 300) return '#660099';
    return '#830629';
  };

  const showTopCleanest = () => {
    const sorted = [...locations].sort((a, b) => a.aqi - b.aqi);
    setSortedLocations(sorted.slice(0, 15));
    console.log("Displaying top cleanest locations:", sorted.slice(0, 15));
  };

  const showTopWorst = () => {
    const sorted = [...locations].sort((a, b) => b.aqi - a.aqi);
    setSortedLocations(sorted.slice(0, 15));
    console.log("Displaying top worst locations:", sorted.slice(0, 15));
  };

  return (
    <div className="aqiRankingWrapper">
      <div className="aqi-ranking-container">
        <h1>Air Quality Ranking</h1>
        <div className="aqi-ranking-buttons">
          <button className="aqi-ranking-button" onClick={showTopCleanest}>Top Cleanest Locations</button>
          <button className="aqi-ranking-button" onClick={showTopWorst}>Most Worst Locations</button>
        </div>
        <div id="aqi-locations">
          {sortedLocations.map(location => (
            <div className="aqi-ranking-location" style={{ backgroundColor: getAQIColor(location.aqi) }} key={location.city}>
              
              <div className="country-and-name">
              <img src={`https://flagcdn.com/w40/${location.code.toLowerCase()}.png`} alt={location.country} />
              <span className='cnm'>{`${location.city}, ${location.country}`}</span>
              </div>
              <span className='locationdata'>{`AQI: ${location.aqi}`}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AqiRanking;
