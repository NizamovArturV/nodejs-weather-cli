import StorageService from "./storage.service.js";
import axios from "axios";
import ApiRequestException from "../execptions/api.request.exception.js";
import WeatherDto from "../dto/weather.dto.js";

export default class ApiService {
    #storageService;
    #token;

    constructor() {
        this.#storageService = new StorageService();
    }

    get urlCitySearch() {
        return this.urlApi + '/geo/1.0/direct';
    }

    get urlWeather() {
        return this.urlApi + '/data/2.5/weather';
    }

    get urlApi() {
        return 'http://api.openweathermap.org';
    }

    async getToken() {
        if (!this.#token) {
            this.#token = await this.#storageService.getToken();

            if (!this.#token) {
                throw new ApiRequestException('Установите API ключ командой -t {api key}')
            }
        }
        return this.#token;
    }

    async getCityLocationByName(cityName) {
        try {
            const {data} = await axios.get(this.urlCitySearch, {
                params: {
                    appid: await this.getToken(),
                    q: cityName,
                    limit: 1,
                    lang: 'ru'
                }
            })

            return data.pop();
        } catch (e) {
            if (e?.response) {
                throw new ApiRequestException('[' + e.response.status + '] ' + (e?.data?.message ?? e.response.statusText));
            } else {
                throw e;
            }
        }
    }

    async getWeatherByCoordinates(lat, lon) {
        try {
            const {data} = await axios.get(this.urlWeather, {
                params: {
                    appid: await this.getToken(),
                    lat: lat,
                    lon: lon,
                    units: 'metric',
                    lang: 'ru'
                }
            })

            return data;
        } catch (e) {
            if (e?.response) {
                throw new ApiRequestException('[' + e.response.status + '] ' + (e?.data?.message ?? e.response.statusText));
            } else {
                throw e;
            }
        }
    }

    async getWeather(city) {
        if (city) {
            const cityInfo = await this.getCityLocationByName(city);
            if (cityInfo) {
                const weather = await this.getWeatherByCoordinates(cityInfo.lat, cityInfo.lon);

                return new WeatherDto(
                    weather.name,
                    this.getIcon(weather.weather[0].icon),
                    weather.weather[0].description,
                    weather.main.temp,
                    weather.main.feels_like,
                    weather.main.humidity,
                    weather.wind.speed
                    );
            } else {
                throw new ApiRequestException('Город ' + city + ' не найден :(')
            }
        } else {
            throw new ApiRequestException('Город не указан');
        }

    }

    getIcon(icon) {
        switch (icon.slice(0, -1)) {
            case '01':
                return '☀️';
            case '02':
                return '🌤️';
            case '03':
                return '☁️';
            case '04':
                return '☁️';
            case '09':
                return '🌧️';
            case '10':
                return '🌦️';
            case '11':
                return '🌩️';
            case '13':
                return '❄️';
            case '50':
                return '🌫️';
        }
    }
}