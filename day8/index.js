const { f } = require("../utils/fetch");

const main = async () => {
  const rawInput = await f("https://adventofcode.com/2020/day/8/input");
  const input = rawInput.split("\n").filter((n) => n.length !== 0);
  const END_COUNTER = input.length;

  const jmpIndices = input
    .map((c, i) => {
      return c.includes("jmp") ? i : null;
    })
    .filter((n) => n !== null);

  const nopIndices = input
    .map((c, i) => {
      return c.includes("nop") ? i : null;
    })
    .filter((n) => n !== null);

  jmpIndices.forEach((i) => {
    const commands = {
      acc: (n) => {
        accumulator += n;
        instructionPointer += 1;
      },
      jmp: (n) => {
        instructionPointer += n;
      },
      nop: () => (instructionPointer += 1),
    };

    let accumulator = 0;
    let instructionPointer = 0;
    const hasInstructionRan = new Set();
    const clonedInput = [...input];
    const oldValue = clonedInput[i];
    const [_command, value] = oldValue.split(" ");
    clonedInput[i] = `nop ${value}`;

    while (instructionPointer < END_COUNTER) {
      if (hasInstructionRan.has(instructionPointer)) {
        break;
      }
      const currentInstruction = clonedInput[instructionPointer];
      const [command, stringValue] = currentInstruction.split(" ");
      const value = parseInt(stringValue, 10);
      hasInstructionRan.add(instructionPointer);
      commands[command](value);
    }
    if (instructionPointer === END_COUNTER) {
      console.log(accumulator);
    }
  });
};

main();
