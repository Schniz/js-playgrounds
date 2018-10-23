module.exports = resultString => {
  const lines = resultString.split("\n");
  const consoleLines = [];
  const playgroundLines = [];
  for (line of lines) {
    if (line.startsWith("@PLAYGROUND: ")) {
      playgroundLines.push(line);
    } else {
      consoleLines.push(line);
    }
  }

  return {
    console: consoleLines.join("\n"),
    playground: JSON.parse(
      playgroundLines.map(line => line.replace(/^@PLAYGROUND: /, "")).join("\n")
    )
  };
};
