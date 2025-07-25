export function getArgs(args) {
  const res = {};
  const [executor, file, ...rest] = args;

  rest.forEach((value, index, array) => {
    if (value.charAt() == "-") {
      if (index == array.length - 1) {
        res[value.substring(1)] = true;
      } else if (array[index + 1].charAt() != "-") {
        res[value.substring(1)] = array[index + 1];
      } else {
        res[value.substring(1)] = true;
      }
    }
  });

  return res;
}
