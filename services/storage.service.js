import {homedir} from 'os';
import {join} from 'path';
import {promises} from 'fs';
import StorageException from "../execptions/storage.exception.js";


export default class StorageService {
    get pathToFile() {
        return join(homedir(), '/weather-data.json');
    }

    async saveKeyValue(key, value) {
        const data = await this.getConfigurations() ?? {};
        const filePath = this.pathToFile;

        data[key] = value;
        await promises.writeFile(filePath, JSON.stringify(data));
    }

    async getKeyValue(key) {
        const data = await this.getConfigurations();
        if (!data) {
            throw new StorageException('Не указано ни одного параметра. Что получить список параметров, воспользуйтесь командой -h')
        }
        return data[key];
    }

    async getToken() {
        return process.env.TOKEN ?? await this.getKeyValue('token');
    }

    async saveToken(token) {
        return await this.saveKeyValue('token', token)
    }

    async getCity() {
        return process.env.CITY ?? await this.getKeyValue('city');
    }

    async saveCity(city) {
        return await this.saveKeyValue('city', city);
    }


    async getConfigurations() {
        let data = {};
        if (await this.isExistFile(this.pathToFile)) {
            const file = await promises.readFile(this.pathToFile, 'utf-8');
            data = JSON.parse(file);

            return data;
        }
    }

    async isExistFile(filePath) {
        try {
            await promises.stat(filePath)
            return true;
        } catch (e) {
            return false;
        }
    }
}