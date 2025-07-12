#! /usr/bin/env node

import { getArgs } from "./helpers/args.js";
import { getWeather, getIcon } from "./services/api.service.js";
import {
  printHelp,
  printSuccess,
  printError,
  printWeather,
} from "./services/log.service.js";
import {
  saveKeyValue,
  TOKEN_DICTIONARY,
  getKeyValue,
} from "./services/storage.service.js";

async function saveToken(token) {
  // Если token(строка) указан - ок
  // Если token != true - не ок (bool - не имеет длины)
  if (!token.length) {
    return printError("Не передан токен");
  }

  try {
    await saveKeyValue(TOKEN_DICTIONARY.token, token);
    printSuccess("Токен сохранен");
  } catch (error) {
    printError(error.message);
  }
}

async function saveCity(city) {
  // Если token(строка) указан - ок
  // Если token != true - не ок (bool - не имеет длины)
  if (!city.length) {
    return printError("Не передан токен");
  }

  try {
    await saveKeyValue(TOKEN_DICTIONARY.city, city);
    printSuccess("Город сохранен");
  } catch (error) {
    printError(error.message);
  }
}

async function getForcast() {
  try {
    const city =
      process.env.API_CITY ?? (await getKeyValue(TOKEN_DICTIONARY.city));
    const weather = await getWeather(city);

    printWeather(weather, getIcon(weather.weather[0].icon));
  } catch (error) {
    if (error?.response?.status == "404") {
      printError("Неверно указан город");
    } else if (error?.response?.status == "401") {
      printError("Неверно указан токен");
    } else {
      printError(error.message);
    }
  }
}

function initCLI() {
  const args = getArgs(process.argv);

  // console.log(process.argv); // просто видеть
  // console.log(args); // просто видеть

  if (args.h) {
    return printHelp();
  }

  if (args.s) {
    return saveCity(args.s);
  }

  if (args.t) {
    return saveToken(args.t);
  }

  return getForcast();
}

initCLI();
