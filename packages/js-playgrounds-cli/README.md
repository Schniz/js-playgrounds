# js-playgrounds-cli

# Usage

```bash
playground myfile.js
```

Should work just like `node`!

## How does it work?

- A [babel plugin](../babel-plugin-js-playgrounds) transforms every expression to a function call
- The library stores every expression result. Every object is "stringified" using Node's `util#inspect`
- When your script exits, it prints everything with `@PLAYGROUND: ` prefix (can be changed in the future)
- Another script gets all the output from your script and splits it between plain console, and playground values. then it creates a new json from the input.
