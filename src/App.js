import React, {useState} from 'react';


const api = {
  key: "570dff2e47c343d3ebed4ce245cd5ef4",
  base: "https://api.openweathermap.org/data/2.5/",
  iconurl: "http://openweathermap.org/img/w/"
  // "weather?q={city name},{state code},{country code}&appid={API key}" 
}

function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if(evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }

  
  const imgIcon = () => {
    const weatherIcon = weather.weather[0].icon;
    return `${api.iconurl}${weatherIcon}.png`;
  }

  

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August",
    "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    
    return `${day} ${date} ${month} ${year}`; 
  }

  return (
    <div className={
      (typeof weather.main != "undefined") 
        ? ((weather.main.temp > 16)
          ? 'app warm' 
          : 'app')
        : 'app'}>
      <main>
        <div className="search-box">
          <input 
            type="text" 
            className="search-bar" 
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
            placeholder="Search..."
          />
        </div>
        {(typeof weather.main != "undefined") ? (
          <div>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>

            <div className="weather-box">
              <div className="temp">
                {Math.round(weather.main.temp)}°c
              </div>
              <div className="weather">
                <div className="weather-detail">
                <span>{weather.weather[0].main}</span> <img src={imgIcon()} alt="icon"/>
                </div>
                <div className="weather-description">
               <span>Maximum : {weather.main.temp_max}°c</span>
                </div>
                <div className="weather-description">
               <span>Minimun : {weather.main.temp_min}°c</span>
                </div>
              
              </div>
            </div>

          </div>
        ) : ('')}
        

      </main>
    </div>
  );
}

export default App;
