import { useEffect } from "react";
import { useState } from "react";
import './weather.scss'

const Weather = () => {

    const [c,setc] = useState('');
    const [city,setcity] = useState('');
    const [res,setres] = useState({
        cityy : '',
        hum : '',
        temp : '',
        res : ''
    })
    const [emo,setemo] = useState('');

    const handleCity = (e) => {
        if (e.target.value.trim() !== '') {
            
            setc(e.target.value);
        }

        e.preventDefault();
    }

    const handleClick = (e) => {
        e.preventDefault();
        setcity(c);
    }

    

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    useEffect(() => {

        const fetchWeatherData = async () => {
            try {
                const response = await fetch(apiUrl);

                if (response.ok) {
                    
                    const data = await response.json();
                
                    console.log(data);
    
                    setres({
                        des : data.weather[0].description,
                        hum : 'Humidite :'+data.main.humidity+'%',
                        temp : data.main.temp - 273.15+' '+'°F',
                        cityy : data.name
                    })

                    var id = data.weather[0].id;

                    if (id >= 200 && id <= 232) {
                        setemo('⛈️');
                    }else if (id >= 300 && id <= 321) {
                        setemo('☔');
                    }else if (id >= 500 && id <= 531) {
                        setemo('🌧️');
                    }else if (id >= 600 && id <= 622) {
                        setemo('❄️');
                    }else if (id >= 700 && id <= 781) {
                        setemo('☁️');
                    }else if (id === 800) {
                        setemo('☀️');
                    }else if (id >= 801 && id <= 804) {
                        setemo('☁️');
                    }else{
                        setemo('');;
                    }

                }
            
            
            } catch (error) {
                console.log(error);
            
            }
        };
    
        fetchWeatherData();

    },[apiUrl])

    return (
        <div className="container">
            <div className="form-container">
                <input type="text" id="input" placeholder="enter city" onChange={handleCity} />
                <button type="submit" id="btn"  onClick={handleClick}>Get Weather</button>
            </div>
            <div className="weather-container">
                <h1>{res.cityy}</h1>
                <p>{res.temp}</p>
                <p>{res.des}</p>
                <p>{res.hum}</p>
                <p className="emoji">{emo}</p>
            </div>
        </div>
    );
};

export default Weather;
