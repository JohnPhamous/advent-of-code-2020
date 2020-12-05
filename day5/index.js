const { f } = require("../utils/fetch");

const main = async () => {
  const rawInput = await f("https://adventofcode.com/2020/day/5/input");
  const seats = rawInput.split("\n").filter((s) => s);
  const NUM_ROW_ENTRIES = 7;
  const lowerHalfMoves = new Set(["F", "L"]);

  const getSeatId = (row, column) => row * 8 + column;
  const getRowFields = (id) => id.slice(0, NUM_ROW_ENTRIES);
  const getColumnFields = (id) => id.slice(NUM_ROW_ENTRIES);
  const binaryTraverse = (moves, range) => {
    let lowerRange = 0;
    let mid = Math.floor(lowerRange + (range - lowerRange) / 2);
    [...moves].slice(0, moves.length - 1).forEach((move) => {
      mid = Math.floor(lowerRange + (range - lowerRange) / 2);
      if (lowerHalfMoves.has(move)) {
        range = mid;
      } else {
        lowerRange = mid + 1;
      }
    });

    const lastMove = moves[moves.length - 1];
    if (lowerHalfMoves.has(lastMove)) {
      return lowerRange;
    }
    return range;
  };

  const ids = seats.map((seat) => {
    const rowFields = getRowFields(seat);
    const columnFields = getColumnFields(seat);

    const row = binaryTraverse(rowFields, Math.pow(2, rowFields.length) - 1);
    const column = binaryTraverse(
      columnFields,
      Math.pow(2, columnFields.length) - 1
    );
    return getSeatId(row, column);
  });

  ids.sort((a, b) => a - b);
  console.log("Largest seat id", ids[ids.length - 1]);

  const findMissingSeatId = (seats) => {
    let tracker = seats[0];

    seats.forEach((seat) => {
      if (seat !== tracker) {
        console.log("Missing seat", tracker);
        return;
      }
      tracker++;
    });
  };

  findMissingSeatId(ids);
};

main();

// FBFBBFFRLR
// 0..127
// 0..63
// 32..63
// 32..47
// 40..47
// 4
