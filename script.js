document.addEventListener('DOMContentLoaded', function () {
    const countryCards = document.getElementById('countryCards');

    // Fetch data from Rest Countries API
    fetch('https://restcountries.com/v3.1/all')
        .then(response => response.json())
        .then(data => {
            data.forEach(country => {
                const { capital, latlng, flags, region, name, cca2 } = country;

                // Create card element
                const card = document.createElement('div');
                card.classList.add('col-lg-4', 'col-sm-12');

                // Construct card HTML
                card.innerHTML = `
                    <div class="card">
                        <div class="card-header">${name.common}</div>
                        <div class="card-body">
                            <p>Capital: ${capital}</p>
                            <p>LatLng: ${latlng.join(', ')}</p>
                            <p>Region: ${region}</p>
                            <p>Country Code: ${cca2}</p>
                            <img src="${flags.png}" alt="Flag" style="max-width: 100px;">
                            <br><br>
                            <button class="btn btn-primary" onclick="fetchWeather('${name.common}', '${latlng[0]}', '${latlng[1]}', '${cca2}')">Click for weather</button>
                            <div id="weather-${name.common}"></div>
                        </div>
                    </div>
                `;

                // Append card to the container
                countryCards.appendChild(card);
            });
        })
        .catch(error => console.error('Error fetching countries:', error));

    // Function to fetch weather
    function fetchWeather(countryName, lat, lng, countryCode) {
        // Fetch weather data from OpenWeatherMap
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=YOUR_API_KEY`)
            .then(response => response.json())
            .then(data => {
                console.log('Weather data:', data);

                // Display weather and country code information on the card
                const weatherDiv = document.getElementById(`weather-${countryName}`);
                weatherDiv.innerHTML = `
                    <p>Weather: ${data.weather[0].description}</p>
                    <p>Temperature: ${kelvinToCelsius(data.main.temp)}°C</p>
                    <p>Humidity: ${data.main.humidity}%</p>
                    <p>Country Code: ${countryCode}</p>
                `;
            })
            .catch(error => console.error('Error fetching weather:', error));
    }

    // Utility function to convert Kelvin to Celsius
    function kelvinToCelsius(kelvin) {
        return (kelvin - 273.15).toFixed(2);
    }
});
