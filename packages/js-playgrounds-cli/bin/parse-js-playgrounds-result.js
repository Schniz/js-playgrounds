const parseResult = require("js-playgrounds/src/parseResult");

let str = "";

process.stdin.on("data", d => {
  str += d.toString();
});

process.stdin.on("end", () => {
  console.log(JSON.stringify(parseResult(str)));
});
