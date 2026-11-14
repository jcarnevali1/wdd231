const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('#description');

const url = 'https://api.openweathermap.org/data/2.5/weather?lat=4.71&lon=74.06&units=metric&appid=a4ce565708d23a716beaf8ed7baab1f0';

async function apiFetch() {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log(data)
      displayResults(data);
    } else {
      throw new Error(await response.text());
    }
  } catch (error) {
    console.error(error);
  }
}

apiFetch();

function displayResults(data) {
  currentTemp.innerHTML = `${data.main.temp}&deg;C`;
  const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  const desc = data.weather[0].description;
  weatherIcon.setAttribute('src', iconsrc);
  weatherIcon.setAttribute('alt', desc);
  captionDesc.textContent = desc;
}

const forecast = document.querySelector('#forecast');
const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=4.71&lon=-74.06&units=metric&appid=a4ce565708d23a716beaf8ed7baab1f0'

async function getForecast() {
    try {
        const response = await fetch(forecastUrl);

        if (!response.ok) {
            const error = await response.text();
            throw new Error(await response.text());
        }
        
const data = await response.json();
        console.log("Forecast:", data);

        forecast.innerHTML = "";

        const days = data.list.filter(item =>
            item.dt_txt.includes("18:00:00")).slice(0, 4);

        const today = new Date().toLocaleDateString("en-CA", {
            timeZone: "America/Bogota"
        });

        const nextDays = days.filter(item =>
            item.dt_txt.slice(0, 10) > today
        ).slice(0, 3);

        nextDays.forEach(item => {
            const day = new Date(item.dt * 1000)
                .toLocaleDateString("en-US", {
                    weekday: "long",
                    timeZone: "America/Bogota"
                });

            const temp = Math.round(item.main.temp);

            const div = document.createElement("div");
            div.classList.add("forecast-day");

            const p = document.createElement("p");
            const day_temp = document.createElement("p");

            p.classList.add("day");
            p.textContent = day;

            day_temp.classList.add("day-temp");
            day_temp.textContent = `${temp}°C`;

            div.appendChild(day_temp);
            div.appendChild(p);

            forecast.appendChild(div);
        });

    } catch (error) {
        console.error("Forecast error:", error);
        forecast.textContent = "Unable to load forecast.";
    }
}

getForecast();