// =========================
// OpenWeather API Key
// =========================
const apiKey = "4084a842085d3b1e8e7c6050f09d9b6e";

// HTML Elements
const cityInput = document.getElementById("city");
const searchBtn = document.getElementById("searchBtn");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const weatherIcon = document.getElementById("weatherIcon");

// Search Button
searchBtn.addEventListener("click", () => {
    getWeather();
});

// Search by Enter Key
cityInput.addEventListener("keypress", function(event) {

    if (event.key === "Enter") {
        getWeather();
    }

});

// Get Weather
async function getWeather() {

    const city = cityInput.value.trim();

    if (city === "") {
        alert("Please enter a city name.");
        return;
    }

    const url =
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {

        const response = await fetch(url);
        const data = await response.json();

        console.log(data);

        if (data.cod != 200) {
            alert(data.message);
            return;
        }

        cityName.innerHTML = data.name;
        temperature.innerHTML = Math.round(data.main.temp) + "°C";
        description.innerHTML = data.weather[0].description;
        humidity.innerHTML = data.main.humidity + "%";
        wind.innerHTML = data.wind.speed + " m/s";

        weatherIcon.src =
            `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

        changeBackground(data.weather[0].main);

    }

    catch (error) {

        console.log(error);

        alert("Something went wrong.");

    }

}

// Change Background
function changeBackground(weather) {

    switch (weather) {

        case "Clear":
            document.body.style.background =
                "linear-gradient(135deg,#f6d365,#fda085)";
            break;

        case "Clouds":
            document.body.style.background =
                "linear-gradient(135deg,#bdc3c7,#2c3e50)";
            break;

        case "Rain":
        case "Drizzle":
            document.body.style.background =
                "linear-gradient(135deg,#4b79a1,#283e51)";
            break;

        case "Thunderstorm":
            document.body.style.background =
                "linear-gradient(135deg,#232526,#414345)";
            break;

        case "Snow":
            document.body.style.background =
                "linear-gradient(135deg,#e6dada,#274046)";
            break;

        default:
            document.body.style.background =
                "linear-gradient(135deg,#4facfe,#00f2fe)";
    }

}