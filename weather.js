#! /usr/bin/env node

import { getArgs } from "./helpers/args.js";
import { getWeather } from "./services/api.service.js";
import { printHelp, printSuccess, printError } from "./services/log.service.js";
import { saveKeyValue, TOKEN_DICTIONARY } from "./services/storage.service.js";

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

async function getForcast() {
  try {
    const weather = await getWeather("Нью-Йорк");
    console.log(weather);
  } catch (error) {
    if (error?.response?.status == "404") {
      printError("Неверно указан город");
    } else if (error?.response?.status == "401") {
      printError("Неверно указан токен");
    } else {
      console.log(error.message);
    }
  }
}

function initCLI() {
  const args = getArgs(process.argv);

  // console.log(process.argv); // просто видеть
  console.log(args); // просто видеть

  if (args.h) {
    printHelp();
  }

  if (args.s) {
    //return saveToken(args.s);
  }

  if (args.t) {
    return saveToken(args.t);
  }

  getForcast();
}

initCLI();
