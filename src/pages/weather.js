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
            return axios.request(options);
        }).then(data=>{
            const info =
                <p>City Name - {data.data.location.name}<br/>State - {data.data.location.region}<br/>Country - {data.data.location.country}<br/>longitude - {data.data.location.lon} deg<br/>latitude - {data.data.location.lat} deg<br/><br/>Date and Time - {data.data.location.localtime}<br/>Temperature - {data.data.current.temp_c} C , {data.data.current.temp_f} F<br/>Wind Speed - {data.data.current.wind_kph} kph<br/>Humidity - {data.data.current.humidity}<br/>Condition - {data.data.current.condition.text}</p>;
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
                <input type="submit" value="Check" className="btn" />
            </form>
            <div className="dis">{details}</div>
        </div>
    )
    
}
export default Weather;