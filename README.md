# JS Playground
> Like Swift playgrounds, only for JS, and for every editor!

This is an executable that wraps every expression in a function call so it could be used in a JS playground plugin.
Then it runs it, stores all the console information and returns a JSON result with data for the playground (inspection for each line) and the console.
Should be awesome for live coding sessions in your favorite editor.

Please make IDE plugins for that!

## Usage
```bash
playground myfile.js
```

Should work just like `node`!

## How does it work?

* A babel plugin transforms every expression to a function call
* The library saves everything in an array (woohoo, simple). Every object is "stringified" using Node's `util#inspect`
* When your script exits, it prints everything with `@PLAYGROUND: ` prefix (can be changed in the future)
* Another script gets all the output from your script and splits it between plain console, and playground values. then it creates a new json from the input.
