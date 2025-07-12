import { homedir } from "os";
import { join } from "path";
import { promises } from "fs";

export const TOKEN_DICTIONARY = {
  token: "token",
  city: "city",
};

const filePath = join(homedir(), "weather-data.json");

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
