const { inspect } = require("util");

const exprs = [];

process.on("exit", () => {
  const results = JSON.stringify(exprs, null, 2).replace(
    /^/gm,
    "@PLAYGROUND: "
  );
  console.log(results);
});

module.exports = (info, expr) => {
  exprs.push({ loc: info, expr: inspect(expr) });
  return expr;
};
