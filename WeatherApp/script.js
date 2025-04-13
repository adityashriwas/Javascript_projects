document.addEventListener("DOMContentLoaded", ()=>{
    const cityInput = document.getElementById("city-input");
    const getWeatherBtn =  document.getElementById("get-weather-btn");
    const weatherInfo = document.getElementById("weather-info");
    const cityNameDisplay = document.getElementById("city-name");
    const temperatureDisplay = document.getElementById("temperature");
    const descriptionDisplay = document.getElementById("description");
    const errorMeassage = document.getElementById("error-message");

    const API_KEY = "2b6b0f6383650e93b70d3b532368d009";

    getWeatherBtn.addEventListener('click', async ()=>{
        const city = cityInput.value.trim();
        if(!city){
            showError("Please enter a valid city name")
            return;
        }

        try {
            const weatherData = await fetchWeatherData(city)
            displayWeatherData(weatherData)
        } catch (error) {
            showError(error)
        }
    })

    async function fetchWeatherData(city) {
        // gets the data from the API
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
        const response = await fetch(url);
        if(!response.ok){
            throw new Error("City not found")
        }
    
        const data = await response.json();
        return data;
    }

    function displayWeatherData(data) {
        // displays the data on the page
        console.log(data);     
        
        const { name, main, weather} = data;
        cityNameDisplay.textContent = name;

        weatherInfo.classList.remove("hidden");
        errorMeassage.classList.add("hidden");
        temperatureDisplay.textContent = `Temprature :${main.temp}°C`;
        descriptionDisplay.textContent = `Weather: ${weather[0].description.charAt(0).toUpperCase() + weather[0].description.slice(1)}`;
    }

    function showError(message) {
        // shows an error message
        weatherInfo.classList.add("hidden");
        errorMeassage.classList.remove("hidden");
        errorMeassage.textContent = message;
    }
});