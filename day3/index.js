const { f } = require("../utils/fetch");

const main = async () => {
  const rawInput = await f("https://adventofcode.com/2020/day/3/input");
  const grid = [];
  rawInput.split("\n").forEach((entry) => {
    if (entry) {
      const row = [...entry];
      grid.push(row);
    }
  });

  const deltas = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
  ];
  const answers = [];
  deltas.forEach(([xDelta, yDelta]) => {
    const xLength = grid[0].length;
    const yLength = grid.length;

    let x = 0;
    let y = 0;
    let yTracker = 0;
    let numTrees = 0;
    const TREE = "#";
    while (yTracker < yLength) {
      console.log(y, x, numTrees);
      const pos = grid[y][x];
      if (pos === TREE) {
        numTrees++;
      }

      x = (x + xDelta) % xLength;
      y += yDelta;
      yTracker++;
    }
    console.log(numTrees);
    answers.push(numTrees);
  });
  console.log(answers.reduce((acc, cur) => acc * cur, 0));
};

main();
