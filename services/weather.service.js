import ApiService from "./api.service.js";
import LogService from "./log.service.js";
import StorageService from "./storage.service.js";
import getArgs from "../helpers/args.js";
import ApiRequestException from "../execptions/api.request.exception.js";
import StorageException from "../execptions/storage.exception.js";

export default class WeatherService {
    #storageService;
    #apiService;
    #logService;

    constructor() {
        this.#apiService = new ApiService();
        this.#logService = new LogService();
        this.#storageService = new StorageService();
    }

    init(params) {
        const args = getArgs(params);

        if (args.h) {
            return this.#logService.printHelp();
        }

        if (args.s) {
            return this.saveCity(args.s)
        }

        if (args.t) {
            return this.saveToken(args.t);
        }

        return this.getForecast();
    }

    async saveToken(token) {
        if (!token.length) {
            this.#logService.printError('Не передан токен');
            return;
        }
        try {
            await this.#storageService.saveToken(token);
            this.#logService.printSuccess('Токен сохранен!')
        } catch (e) {
            this.#logService.printError(e.message);
        }
    }

    async saveCity(city) {
        if (!city.length) {
            this.#logService.printError('Не передан город');
            return;
        }

        try {
            await this.#storageService.saveCity(city);
            this.#logService.printSuccess('Город сохранен!')
        } catch (e) {
            this.#logService.printError(e.message);
        }
    }

    async getForecast() {
        try {
            const city = await this.#storageService.getCity();
            const weather = await this.#apiService.getWeather(city);

            this.#logService.printWeather(weather);
        } catch (e) {
           if (e instanceof ApiRequestException) {
               this.#logService.printError('Ошибка запроса к API ' + e.message)
           } else if (e instanceof StorageException) {
               this.#logService.printError('Ошибка конфигурации ' + e.message)
           } else {
               throw e;
           }
        }
    }
}