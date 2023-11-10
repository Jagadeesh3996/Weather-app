import { useState } from "react";
import axios from 'axios';
import './weather.css';

const Weather=()=>{
    const [cname,SetCname]= useState("");
    const [details,setDetails]=useState([]);
    
    const changeName=(e)=>{
        let {value}=e.target;
        SetCname(value);
    }

    const weather=(e)=>{
        e.preventDefault();
        let promise=new Promise((res,rej)=>{
            res();
        });
        promise.then((result)=>{
            const options = {
                method: 'GET',
                url: 'https://weatherapi-com.p.rapidapi.com/current.json',
                params: {q: cname},
                headers: {
                    'X-RapidAPI-Key': '38d2221a4cmsh42db6f81161bb40p1d0f3bjsn50e8e5bdb2d5',
                    'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
                }
            };
            return axios(options);
        }).then(data=>{
            const {location,current}=data.data;
            const info =
                <p>City Name - {location.name}<br/>State - {location.region}<br/>Country - {location.country}<br/>longitude - {location.lon} deg<br/>latitude - {location.lat} deg<br/><br/>Date and Time - {location.localtime}<br/>Temperature - {current.temp_c}&deg;C , {current.temp_f}&deg;F<br/>Wind Speed - {current.wind_kph} km/h<br/>Humidity - {current.humidity} %<br/>Condition - {current.condition.text}</p>;
            setDetails([info]);
            SetCname("");
        }).catch(error=>{
            console.log(error);
        })
    }

    return(
        <div className="main">
            <h1>Check Weather Report for a City</h1>
            <form onSubmit={weather} className="form">
                <input type="text" name="cityName" placeholder="Enter the City Name" value={cname} onChange={changeName} required />
                <button type="submit" className="btn">Check</button>
            </form>
            <div className="dis">{details}</div>
        </div>
    )
    
}
export default Weather;