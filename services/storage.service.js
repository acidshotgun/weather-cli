import { homedir } from "os";
import { join } from "path";
import { promises } from "fs";

export const TOKEN_DICTIONARY = {
  token: "token",
  city: "city",
};

const filePath = join(homedir(), "weather-data.json");

/**
 * Потенциальная ошибка в saveKeyValue() и getKeyValue()
 * Если файл есть, но он пустой - выдает ошибку при парсинге пустой строки
 * Нужна проверка (если по задумке в файл можно залезть)
 */

export async function saveKeyValue(key, value) {
  let data = {};

  // Существует ли файл
  if (await isExist(filePath)) {
    const file = await promises.readFile(filePath);
    data = JSON.parse(file);
  }

  data[key] = value;

  await promises.writeFile(filePath, JSON.stringify(data));
}

export async function getKeyValue(key) {
  // Существует ли файл
  if (await isExist(filePath)) {
    const file = await promises.readFile(filePath);
    const data = JSON.parse(file);
    return data[key];
  }

  return undefined;
}

async function isExist(file) {
  try {
    await promises.stat(file);
    return true;
  } catch (error) {
    return false;
  }
}
