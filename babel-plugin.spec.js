const babel = require("babel-core");
const pluginTester = require("babel-plugin-tester");
const plugin = require("./babel-plugin");
const prettier = require('prettier')

pluginTester({
  plugin,
  snapshot: true,
  tests: {
    "Adds the playground requirement at the top": `// nothing`,
    "Wraps every expression with the playground call": `
      const x = require("x");
      const { y } = require("y");
      x(y());
      console.log(x);
    `
  },
  formatResult: result => {
    return prettier.format(result, { parser: 'babylon' })
  }
});
