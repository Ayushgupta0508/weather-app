const API_KEY = "1b481be0d76e4ca687793226260207"
const weatherForm = document.querySelector(".search-form")
const searchInput = document.querySelector(".search-input")
const searchBtn = document.querySelector(".search-btn")
const weatherIcon = document.querySelector(".weather-icon")
const cityElement = document.querySelector(".city")
const temperatureElement = document.querySelector(".temperature")
const conditionElement = document.querySelector(".condition")
const humidityElement = document.querySelector(".humidity")
const windElement = document.querySelector(".wind")
const feelsLikeElement = document.querySelector(".feels-like")
const messageElement = document.querySelector(".message")

async function fetchWeather (city) {
  clearWeather() 
  searchBtn.disabled = true;
  searchBtn.innerHTML =  `<i class="fa-solid fa-spinner fa-spin"></i>`;

  const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`;

  try{ 
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
    messageElement.textContent = data.error.message;
    return;
    }

    displayCurrentWeather(data)   

    
  } catch(error){
    messageElement.textContent = "Network error. Please check your internet connection."
  } finally{
    searchBtn.disabled = false;
    searchBtn.innerHTML = `<i class="fa-solid fa-magnifying-glass"></i>`;
  }
  
}



function displayCurrentWeather(data){
  const {current , location} = data;
  cityElement.textContent = location.name;
  temperatureElement.textContent = `${current.temp_c}°C`
  conditionElement.textContent = current.condition.text;
  humidityElement.textContent = `${current.humidity}%`
  windElement.textContent = `${current.wind_kph} km/h`
  feelsLikeElement.textContent = `${current.feelslike_c}°C`
  weatherIcon.src = `https:${current.condition.icon}`
  weatherIcon.alt = current.condition.text;
}

function clearWeather(){
  cityElement.textContent = ""
  temperatureElement.textContent = ""
  conditionElement.textContent = ""
  humidityElement.textContent = ""
  windElement.textContent = ""
  feelsLikeElement.textContent = ""
  weatherIcon.src = ""
  weatherIcon.alt = ""
}

weatherForm.addEventListener("submit",async(e)=>{
  e.preventDefault()

  const city = searchInput.value.trim();

  if(!city){
    messageElement.textContent = "Please enter a city name."
    return;
  }
  messageElement.textContent = "" 
  
  
  await fetchWeather(city)
})


