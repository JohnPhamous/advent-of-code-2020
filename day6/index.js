const { f } = require("../utils/fetch");

const main = async () => {
  const rawInput = await f("https://adventofcode.com/2020/day/6/input");
  const input = rawInput.split("\n\n");

  const allAnswers = [];
  // input.forEach((group) => {
  //   // console.log(group, "\n");
  //   const groupAnswers = new Set();
  //   group.split("\n").forEach((person) => {
  //     [...person].forEach((answer) => groupAnswers.add(answer));
  //   });
  //   allAnswers.push(groupAnswers.size);
  //   // console.log(groupAnswers.size);
  // });
  // let total = 0;
  // // console.log(allAnswers);
  // allAnswers.forEach((answer) => {
  //   total += answer;
  // });
  // console.log({ total });

  input.forEach((group) => {
    const groupAnswers = {};

    group.split("\n").forEach((person) => {
      [...person].forEach((answer) => {
        if (groupAnswers[answer]) {
          groupAnswers[answer] += 1;
        } else {
          groupAnswers[answer] = 1;
        }
      });
    });

    const numInGroup = group.split("\n").length;
    const keys = Object.keys(groupAnswers);

    keys.forEach((key) => {
      if (groupAnswers[key] !== numInGroup) {
        delete groupAnswers[key];
      }
    });
    allAnswers.push(Object.keys(groupAnswers).length);
  });

  let total = 0;
  // console.log(allAnswers);
  allAnswers.forEach((answer) => {
    total += answer;
  });
  console.log({ total });
};

main();
