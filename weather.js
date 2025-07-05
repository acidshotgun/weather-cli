#! /usr/bin/env node

import { getArgs } from "./helpers/args.js";
import { printHelp, printSuccess, printError } from "./services/log.service.js";
import { saveKeyValue } from "./services/storage.service.js";

async function saveToken(token) {
  try {
    await saveKeyValue("token", token);
    printSuccess("Токен сохранен");
  } catch (error) {
    printError(error.message);
  }
}

function initCLI() {
  const args = getArgs(process.argv);

  console.log(process.argv); // просто видеть
  console.log(args); // просто видеть

  if (args.h) {
    printHelp();
  }

  if (args.s) {
    // Сохранить город
  }

  if (args.t) {
    return saveToken(args.t);
  }

  // Вывести погоду
}

initCLI();
