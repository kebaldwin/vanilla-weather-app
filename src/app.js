function formatDate(timestamp){
    let date = new Date(timestamp);
    let hours = date.getHours();
     if (hours <10){
        minutes = `0${hours}`;
     }
    let minutes = date.getMinutes();
    if (minutes <10){
        minutes = `0${minutes}`;
    } 

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`;
}

function displayForecast(response){
    console.log(response.data.daily);
    let forecastElement=document.querySelector("#forecast");
    
    let forecastHTML=`<div class ="row">`;
    let days =["Thu", "Fri", "Sat", "Sun", "Mon", "Tue"];
    days.forEach(function(day){
    forecastHTML=
        forecastHTML + 
        `
        <div class="col-2">
            <div class="weather-forecast-day">${day}</div>
                <img class ="weather-forecast-img"
                    src ="https://openweathermap.org/img/wn/50d@2x.png"
                    alt =""
                    width="36"
                /> 
            <div class ="weather-forecast-temp">
                <span class = "weather-forecast-temp-max">
                    18°
                </span>
                <span class ="weather-forecast-temp-min">
                    12°
                </span>
            </div>   
        </div>
        `;
    });

    forecastHTML=forecastHTML+`</div>`;
    forecastElement.innerHTML=forecastHTML;
}

function getForecast(coordinates){
    console.log(coordinates);
    let apiKey="c4cd19b1bf4fcc9bdffc7f2ac1741ca9";
    let apiUrl=`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
    console.log(response.data);
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(response.data.main.temp);
    let cityElement = document.querySelector("#city");
    cityElement.innerHTML=response.data.name;
    console.log(response.data.weather[0].description);
    let descriptionElement = document.querySelector("#description");
    descriptionElement.innerHTML = response.data.weather[0].description;
    let humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML = response.data.main.humidity;
    let windElement=document.querySelector("#wind");
    windElement.innerHTML=Math.round(response.data.wind.speed);
    let dateElement=document.querySelector("#date");
    dateElement.innerHTML=formatDate(response.data.dt * 1000);
    let iconElement = document.querySelector("#icon");
    iconElement.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", response.data.weather[0].description);

    getForecast(response.data.coord);
}

function search(city){
    let apiKey = "c4cd19b1bf4fcc9bdffc7f2ac1741ca9";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl). then (displayTemperature);
}


function handleSubmit(event){
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    console.log(cityInputElement.value);
    search(cityInputElement.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("Brisbane");
