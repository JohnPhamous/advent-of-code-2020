const newLineSeparatedToArray = (text) => {
  return text.split("\n").map((n) => parseInt(n, 10));
};

exports.newLineSeparatedToArray = newLineSeparatedToArray;
