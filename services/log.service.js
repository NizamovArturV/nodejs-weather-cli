import chalk from 'chalk';

export default class LogService {
    printError(error) {
        console.log(chalk.bgRed('ERROR') + ' ' + error)
    }

    printSuccess(message) {
        console.log(chalk.bgGreen('SUCCESS') + ' ' + message)
    }

    printHelp() {
        console.log(
            chalk.bgCyan('HELP') + '\n' +
            'Без параметров - вывод погоды' + '\n' +
            '-s [CITY] для установки города' + '\n' +
            '-h для вывода помощи' + '\n' +
            '-t для сохранения токена' + '\n'
        )
    }

    printWeather(weatherDto) {
        console.log(
            chalk.bgYellow('WEATHER') + ' Погода в городе ' + weatherDto.cityName + '\n' +
            weatherDto.icon + ' ' + weatherDto.description + '\n' +
            'Температура: ' + weatherDto.temperature + ' (ощущается как ' + weatherDto.temperatureFeels + ')' + '\n' +
            'Влажность: ' + weatherDto.humidity + '%' + '\n' +
            'Скорость ветра: ' + weatherDto.windSpeed
        )
    }
}