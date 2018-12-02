//	frequencies1`
const fs = require("fs");

const frequencies = fs
  .readFileSync("./fequencies.txt", "utf8")
  .split("\n")
  .map(f => parseInt(f));

//part 1:
const resultingFrequency = frequencies.reduce(
  (prev, current) => prev + current,
  0
);
console.log(resultingFrequency);

//part 2:
const getRepeatedFrequency = () => {
  const frequenciesObj = {};
  let current = 0;
  while (true) {
    for (i = 0; i < frequencies.length; i++) {
      current += frequencies[i];
      if (frequenciesObj[current]) return current;
      frequenciesObj[current] = true;
    }
  }
};

console.log(getRepeatedFrequency());
