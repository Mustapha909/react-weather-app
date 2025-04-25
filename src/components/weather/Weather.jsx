import { useEffect, useRef, useState } from 'react';
import './Weather.css';
import search_icon from '../../assets/search.png';
import clear_icon from '../../assets/clear.png';
import cloud_icon from '../../assets/cloud.png';
import drizzle_icon from '../../assets/drizzle.png';
import rain_icon from '../../assets/rain.png';
import snow_icon from '../../assets/snow.png';
import wind_icon from '../../assets/wind.png';
import humidity_icon from '../../assets/humidity.png';

const Weather = () => {
  const icons = {
    '01d': clear_icon,
    '01n': clear_icon,
    '02d': cloud_icon,
    '02n': cloud_icon,
    '03d': drizzle_icon,
    '03n': drizzle_icon,
    '04d': cloud_icon,
    '04n': cloud_icon,
    '09d': rain_icon,
    '09n': rain_icon,
    '10d': rain_icon,
    '10n': rain_icon,
    '11d': rain_icon,
    '11n': rain_icon,
    '13d': snow_icon,
    '13n': snow_icon,
  };

  const inputRef = useRef(null);
  const [weatherData, setWeatherData] = useState(false);

  const fetchWeatherData = async (city) => {
    if (!city) {
      alert('Please enter a city name');
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;

      const response = await fetch(url);
      const data = await response.json();
      if (!response.ok) {
        alert(data.message);
      }
      console.log(data);
      const icon = icons[data.weather[0].icon] || clear_icon;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      setWeatherData(false);
      console.log(error, 'City not found');
    }
  };

  const handleSearch = () => {
    const city = inputRef.current?.value.trim();
    fetchWeatherData(city);
  };

  useEffect(() => {
    fetchWeatherData('London');
  }, []);

  return (
    <section className="weather">
      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder="Search" />
        <img src={search_icon} alt="search_icon" onClick={handleSearch} />
      </div>
      {weatherData ? (
        <>
          <img
            src={weatherData.icon}
            alt="clear_icon"
            className="weather-icon"
          />
          <p className="temperature">{weatherData.temperature}°C</p>
          <p className="location">{weatherData.location}</p>
          <div className="weather-data">
            <div className="col">
              <img src={humidity_icon} alt="humidity_icon" />
              <div>
                <p>{weatherData.humidity} %</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={wind_icon} alt="wind_icon" />
              <div>
                <p>{weatherData.windSpeed} km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </section>
  );
};

export default Weather;
