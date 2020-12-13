const { f } = require("../utils/fetch");

const main = async () => {
  // const rawInput = await f("https://adventofcode.com/2020/day/13/input");
  // const [ts, scheduleRaw] = rawInput.split("\n");
  // const ts = parseInt("1008832", 10);
  // const rawSchedule =
  //   "23,x,x,x,x,x,x,x,x,x,x,x,x,41,x,x,x,x,x,x,x,x,x,449,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,13,19,x,x,x,x,x,x,x,x,x,29,x,991,x,x,x,x,x,37,x,x,x,x,x,x,x,x,x,x,17";

  const ts = 1008832;
  const rawSchedule =
    "23,x,x,x,x,x,x,x,x,x,x,x,x,41,x,x,x,x,x,x,x,x,x,449,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,13,19,x,x,x,x,x,x,x,x,x,29,x,991,x,x,x,x,x,37,x,x,x,x,x,x,x,x,x,x,17";
  const schedule = rawSchedule
    .split(",")
    .filter((s) => s !== "x")
    .map((s) => parseInt(s, 10));

  console.log(ts, schedule);

  const mappings = {};
  schedule.forEach((s) => {
    const key = s;
    mappings[key] = [s];
    while (s <= ts) {
      s += key;
      mappings[key].push(s);
    }
  });
  // console.log(mappings);

  const keys = Object.keys(mappings);

  const startingKey = 23;
  let smallest = mappings[startingKey][mappings[startingKey].length - 1];
  let smallestKey = startingKey;
  keys.forEach((k) => {
    const value = mappings[k][mappings[k].length - 1];
    if (value < smallest) {
      smallest = value;
      smallestKey = k;
    }
  });
  console.log(
    smallest,
    smallest - ts,
    smallestKey,
    (smallest - ts) * smallestKey
  );
};

main();
