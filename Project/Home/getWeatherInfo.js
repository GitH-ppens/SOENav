const url = 'http://api.weatherstack.com/current?access_key=674e9e24405feb04ecb0640a225eecd0&query=New York';

const options = {
	method: 'GET'
};

async function getWeather() {
	try {
		const response = await fetch(url, options);
		const result = await response.json(); // assuming the API returns JSON
		console.log(result.current.weather_icons[0]);
        console.log(result.current.temperature * (9/5) + 32)
        document.getElementById("weather-image").src = result.current.weather_icons[0]
        // document.getElementById("temperature-fah").innerText = `${result.current.temperature * (9/5) + 32}°F`
        // hard-coded to avoid over api usage
        document.getElementById("temperature-fah").innerText = `${59}°F`
	} catch (error) {
		console.error('Error fetching weather:', error);
	}
}

getWeather();
