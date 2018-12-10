// node v10.14.1
const fs = require("fs");

const claims = fs.readFileSync("./input.txt", "utf8").split("\n");

const regex = /^#(?<id>\d+)@(?<x>\d+),(?<y>\d+):(?<w>\d+)x(?<h>\d+)/;

const claimsObjs = claims.map(c => {
  const { id, x, y, w, h } = regex.exec(c.replace(/ +/g, "")).groups;
  return {
    id,
    x: parseInt(x),
    y: parseInt(y),
    w: parseInt(w),
    h: parseInt(h)
  };
});

// part 1
const map = {};

for (let i = 0; i < claimsObjs.length; i++) {
  let claim = claimsObjs[i];
  let claimOverlapped = false;
  const { x, y, w, h } = claim;
  for (let j = x; j < x + w; j++) {
    for (let k = y; k < y + h; k++) {
      const key = `${j}_${k}`;
      const pos = map[key];
      map[key] = pos ? pos + 1 : 1;
    }
  }
}

const count = Object.keys(map)
  .map(key => map[key])
  .filter(count => count > 1).length;

console.log("count", count);

// part 2
let claimIdNotOverlapped = "";

for (let i = 0; i < claimsObjs.length; i++) {
  let claim = claimsObjs[i];
  let claimOverlapped = false;
  const { x, y, w, h } = claim;
  for (let j = x; j < x + w; j++) {
    for (let k = y; k < y + h; k++) {
      const key = `${j}_${k}`;
      if (map[key] > 1) {
        claimOverlapped = true;
        break;
      }
    }
    if (claimOverlapped) break;
  }
  if (!claimOverlapped) claimIdNotOverlapped = claim.id;
}

console.log("claimIdNotOverlapped", claimIdNotOverlapped);
