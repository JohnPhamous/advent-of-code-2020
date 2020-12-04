const { f } = require("../utils/fetch");

function eqSet(as, bs) {
  if (as.size !== bs.size) return false;
  for (var a of as) if (!bs.has(a)) return false;
  return true;
}

const main = async () => {
  const rawInput = await f("https://adventofcode.com/2020/day/4/input");
  const allRecords = [];
  let curRecord = {};
  const requiredKeys = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

  rawInput.split("\n").forEach((row) => {
    const tokens = row.split(" ");
    if (tokens.length === 1 && tokens[0] === "") {
      allRecords.push(curRecord);
      curRecord = {};
    } else {
      tokens.forEach((token) => {
        const [key, value] = token.split(":");
        curRecord[key] = value;
      });
    }
  });

  let validRecords = 0;
  const requiredKeysSet = new Set(requiredKeys);
  allRecords.forEach((record) => {
    const keys = Object.keys(record);
    const keysSet = new Set(keys);

    if (keysSet.has("cid")) {
      keysSet.delete("cid");
    }
    if (eqSet(keysSet, requiredKeysSet)) {
      const byr = parseInt(record["byr"], 10);
      if (!(byr >= 1920 && byr <= 2002)) {
        return;
      }
      const iyr = parseInt(record["iyr"], 10);
      if (!(iyr >= 2010 && iyr <= 2020)) {
        return;
      }
      const eyr = parseInt(record["eyr"], 10);
      if (!(eyr >= 2020 && eyr <= 2030)) {
        return;
      }
      const hgt = record["hgt"];
      if (hgt.includes("cm")) {
        const cm = parseInt(hgt.split("cm")[0], 10);
        if (!(cm >= 150 && cm <= 193)) {
          return;
        }
      } else if (hgt.includes("in")) {
        const inch = parseInt(hgt.split("in")[0]);
        if (!(inch >= 59 && inch <= 76)) {
          return;
        }
      } else {
        return;
      }

      const hcl = record["hcl"];
      if (hcl[0] === "#") {
        if (hcl.length !== 7) {
          // TODO: check alpha and numbers?
          return;
        }
      } else {
        return;
      }

      const ecl = record["ecl"];
      const eclSet = new Set(["amb", "blu", "brn", "gry", "grn", "hzl", "oth"]);
      if (!eclSet.has(ecl)) {
        return;
      }

      const pid = record["pid"];
      if (pid.length !== 9) {
        return;
      }
      validRecords++;
    }
  });
  console.log(validRecords);
};

main();
