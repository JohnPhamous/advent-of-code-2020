const { f } = require("../utils/fetch");
const { newLineSeparatedToArray } = require("../utils/jsonify");

const main = async () => {
  const rawInput = await f("https://adventofcode.com/2020/day/1/input");
  const input = newLineSeparatedToArray(rawInput);

  const TARGET_SUM = 2020;

  const twoSum = () => {
    const cache = new Set();

    for (let i of input) {
      const diff = Math.abs(TARGET_SUM - i);
      if (cache.has(diff)) {
        console.log(diff * i);
        return;
      }
      cache.add(i);
    }
  };

  const threeSum = () => {
    for (let i = 0; i < input.length; i++) {
      for (let j = i + 1; j < input.length; j++) {
        for (let k = j + 1; k < input.length; k++) {
          const sum = input[i] + input[j] + input[k];

          if (sum === TARGET_SUM) {
            console.log(input[i] * input[j] * input[k]);
            return;
          }
        }
      }
    }
  };

  twoSum();
  threeSum();
};

main();
