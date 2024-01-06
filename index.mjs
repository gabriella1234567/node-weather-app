import "dotenv/config";
import axios from "axios";
import inquirer from "inquirer";

async function getUserInput() {
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "city",
      message:
        "Please enter the name of the city you would like to search for:",
    },
  ]);
  return answers.city;
}

async function getWeatherData(city) {
  try {
    const apiKey = process.env.WEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error getting weather data:", error);
  }
}

async function main() {
  try {
    const city = await getUserInput();
    console.log(`Searching for ${city}...`);
    const weatherData = await getWeatherData(city);
    console.log(
      `The current temperature in ${city} is ${weatherData.main.temp} degrees Celsius, but it feels like ${weatherData.main.feels_like} degrees.`
    );
  } catch (error) {
    console.error("Error getting user input:", error);
  }
}

main();
