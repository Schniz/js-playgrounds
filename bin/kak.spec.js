const { execSync } = require("child_process");
const path = require("path");

describe("binary", () => {
  it("should work", () => {
    const fileToRun = path.resolve(__dirname, "kak.js");
    const playgroundBinary = path.resolve(__dirname, "playground");
    const result = execSync(`${playgroundBinary} ${fileToRun}`);
    const resultInJSON = JSON.parse(result.toString());
    expect(resultInJSON).toMatchSnapshot();
  });
});
