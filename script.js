const apiKey ="7149002bddc4b4acafeeb18fdf89ed3d";

const weatherDataEl = document.getElementById("weather-data");

const cityInputEl = document.getElementById("city-input");

const formEl = document.querySelector("form");

formEl.addEventListener("submit",(event)=>{
    event.preventDefault();
    const cityValue = cityInputEl.value;
    getWeatherData(cityValue)
})

async function getWeatherData(cityValue){
    try {
        const respone = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`)
        if(!respone.ok){
            throw new Error("Network response was not ok");
        }
        const data = await respone.json();
        const temperature = Math.round((data.main.temp)* 9/5) + 32;
        const desc = data.weather[0].description;
        const icon = data.weather[0].icon;
        const details = [
            `Feels like: ${Math.round((data.main.feels_like) * 9/5) + 32}`,
            `Humidity: ${data.main.humidity}%`,
            `Wind Speed: ${data.wind.speed} m/s`,
        ];
        weatherDataEl.querySelector(".icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">`;
        weatherDataEl.querySelector(".temperature").textContent = `${temperature}°F`;
        weatherDataEl.querySelector(".description").textContent = `${desc}`
        weatherDataEl.querySelector(".details").innerHTML = details.map((detail)=>
            `<div>${detail}</div>`
        ).join("")

    } catch (error) {
        weatherDataEl.querySelector(".icon").innerHTML = " ";
        weatherDataEl.querySelector(".temperature").textContent = "";
        weatherDataEl.querySelector(".description").textContent = " An error happened, Please try again later"
        weatherDataEl.querySelector(".details").innerHTML = ""

        
    }

}
