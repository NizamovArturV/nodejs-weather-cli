#!/usr/bin/env node
import WeatherService from "./services/weather.service.js";

const weatherService = new WeatherService()

weatherService.init(process.argv);