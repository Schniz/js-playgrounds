let str = "";

process.stdin.on("data", d => {
  str += d.toString();
});

process.stdin.on("end", () => {
  const lines = str.split("\n");
  const consoleLines = [];
  const playgroundLines = [];
  for (line of lines) {
    if (line.startsWith("@PLAYGROUND: ")) {
      playgroundLines.push(line);
    } else {
      consoleLines.push(line);
    }
  }

  const result = {
    console: consoleLines.join("\n"),
    playground: JSON.parse(
      playgroundLines.map(line => line.replace(/^@PLAYGROUND: /, "")).join("\n")
    )
  };

  console.log(JSON.stringify(result));
});
