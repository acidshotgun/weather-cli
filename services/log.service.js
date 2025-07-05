import chalk from "chalk";
import dedent from "dedent";

export function printError(error) {
  console.log(chalk.bgRed(" ERROR ") + " " + error);
}

export function printSuccess(message) {
  console.log(chalk.bgGreen(" SUCCESS ") + " " + message);
}

export function printHelp() {
  console.log(dedent`
      ${chalk.bgCyan(" HELP ")}
      Без параметров - вывод погоды
      -s[CITY] - установка города
      -h - помощь
      -t[API_KEY] - сохранение токена 
    `);
}
