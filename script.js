const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const loading = document.getElementById("loading");
const error = document.getElementById("error");
const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const condition = document.getElementById("condition");
const weatherCard = document.getElementById("weatherCard");

const apiKey = "3f0a094be14ed0d5250b66490a09f32c"; 

function clearUI() {
  cityName.textContent = ""; 
  temperature.textContent = ""; 
  condition.textContent = ""; 
  weatherCard.style.display = "none";
}

async function getWeather() { 
  const city = cityInput.value.trim(); 
  
  if (city === "") { 
    clearUI(); 
    error.textContent = "Please enter a city name."; 
    return; 
  } 

  loading.textContent = "Loading..."; 
  error.textContent = ""; 
  clearUI(); 
  
  try { 
    // Updated URL for OpenWeatherMap (using &units=metric for Celsius)
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`; 
    
    const response = await fetch(url); 
    
    // Improved error handling
    if (!response.ok) { 
      if (response.status === 401) {
        throw new Error("Invalid API key");
      } else if (response.status === 404) {
        throw new Error("City not found. Please check the spelling.");
      } else {
        throw new Error("An error occurred while fetching the weather data.");
      }
    } 
    
    const data = await response.json(); 
    
    cityName.textContent = data.name; 
    // Math.round() removes decimals for a cleaner UI
    temperature.textContent = `${Math.round(data.main.temp)} °C`; 
    // Capitalizes the first letter of the description
    condition.textContent = data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1); 
    
    weatherCard.style.display = "block"; 
    
  } catch (err) { 
    // Displays the specific error message generated above
    error.textContent = err.message; 
    weatherCard.style.display = "none"; 
  } finally { 
    loading.textContent = ""; 
  }
}

searchBtn.addEventListener("click", getWeather);