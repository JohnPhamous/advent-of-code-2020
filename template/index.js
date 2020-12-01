const { f } = require("../utils/fetch");
const { newLineSeparatedToArray } = require("../utils/jsonify");

const main = async () => {
  const rawInput = await f("TODO: REPLACE_ME");
  const input = newLineSeparatedToArray(rawInput);
};

main();
