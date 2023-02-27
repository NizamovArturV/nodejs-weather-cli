export default class WeatherDto {
    cityName;
    icon;
    description;
    temperature;
    temperatureFeels;
    humidity;
    windSpeed;

    constructor(cityName, icon, description, temperature, temperatureFeels, humidity, windSpeed) {
        this.cityName = cityName;
        this.icon = icon;
        this.description = description;
        this.temperature = temperature;
        this.temperatureFeels = temperatureFeels;
        this.humidity = humidity;
        this.windSpeed = windSpeed;
    }
}