import axios from "axios";
import { useEffect, useState } from "react";
import img1 from './image/sr.png';
import img2 from './image/pic2.png'
import img3 from './image/clud.jpg'
function WeatherApp() {
  const apikey = "d9132312364d6842575847c5579bb6c2"
  const [data, setData] = useState({})
  const [inputCity, setInputCity] = useState("")
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const getWeatherDetail = (cityName) => {
    const apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apikey
    axios.get(apiURL).then((res) => {
      console.log("Response", res.data)
      setData(res.data)
    }).catch((err) => {
      console.log("err", err)
    })
  }
  const handleChangeInput = (e) => {
    setInputCity(e.target.value);
  }
  const handleSearch = () => {
    getWeatherDetail(inputCity);
  }
  useEffect(() => {
    getWeatherDetail("Khategaon");
    const intervalId = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  return (
    <div className='box'>
      <div className='mainBg'>
        <div className='parent'>
          <input className='input-text' onChange={handleChangeInput} value={inputCity}></input>
          <button className="btnn" type="button" onClick={handleSearch}>Search</button>
        </div>
        <div className='second'>
          <img className="pic" src={img1} alt="Weather Icon" />
          <div className="third">
            <h1 className='weather-temp'>{((data?.main?.temp) - 273.15).toFixed(2)}°C</h1>
            <h2 className='weather-city'>{data.name}</h2>
            <h5 className='current-time'>{currentTime}</h5>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeatherApp;
