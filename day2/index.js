const { f } = require("../utils/fetch");

const l = console.log;

const main = async () => {
  const rawInput = await f("https://adventofcode.com/2020/day/2/input");

  const input = rawInput.split("\n").map((i) => {
    const [rule, pw] = i.split(":");
    if (rule && pw) {
      const [p, c] = rule.trim().split(" ");
      const [i, j] = p.split("-");
      return {
        i: parseInt(i, 10),
        j: parseInt(j, 10),
        c,
        pw: pw.trim(),
      };
    }
  });

  const a = () => {
    const f = (cur) => {
      if (cur) {
        const repetitions = cur.pw.split(cur.c).length - 1;
        return repetitions >= cur.i && repetitions <= cur.j;
      }
    };
    l(input.filter(f).length);
  };
  a();

  const b = () => {
    const f = (cur) => {
      if (cur) {
        const x = cur.pw[cur.i - 1];
        const y = cur.pw[cur.j - 1];
        return (x === cur.c && y !== cur.c) || (x !== cur.c && y === cur.c);
      }
    };
    l(input.filter(f).length);
  };
  b();
};

main();
