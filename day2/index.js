const fs = require("fs");

const ids = fs.readFileSync("./input.txt", "utf8").split("\n");

//part 1:
let twoCounts = 0;
let threeCounts = 0;
let idCharsObj = {};
ids.forEach(id => {
  for (let i = 0; i < id.length; i++) {
    const charCount = idCharsObj[id[i]];
    idCharsObj[id[i]] = charCount ? charCount + 1 : 1;
  }
  const chKeys = Object.keys(idCharsObj);
  if (chKeys.filter(chKey => idCharsObj[chKey] == 2).length > 0) twoCounts++;
  if (chKeys.filter(chKey => idCharsObj[chKey] === 3).length > 0) threeCounts++;
  idCharsObj = {};
});

console.log(twoCounts * threeCounts);

//part 2
let common = "";

ids.some((id, index) => {
  return ids.some((id2, index2) => {
    if (index !== index2) {
      let differCount = 0;
      let differIndex = "";
      for (let i = 0; i < id.length; i++) {
        if (id[i] !== id2[i]) {
          differCount++;
          differIndex = i;
        }
      }
      if (differCount === 1) {
        common = id.substring(0, differIndex) + id.substring(differIndex + 1);
        return true;
      }
    }
  });
});

console.log(common);
