# JS Playgrounds

> Like Swift playgrounds, only for JS, and for every editor!
> (experimental stuff over here)

![Demo in Atom Editor](./demo-atom.gif)

Underneath, it's a combination of Babel plugin that wraps every expression in a function call so it would save the data.
Then it runs it (using `node`), stores all the console information and returns a JSON result with data for the playground (inspection for each line) and the console.
Should be awesome for live coding sessions in your favorite editor.

Eventually, I think the repo could be changed to plain "playgrounds": I want to make everything as agnostic as it can in terms of language, tools and editors.

## Packages

- [`packages/atom-js-playground`](packages/atom-js-playground) - Atom plugin
- [`packages/babel-plugin-js-playgrounds`](packages/babel-plugin-js-playgrounds) - Babel plugin that adds the functionality.
- [`packages/js-playgrounds-cli`](packages/js-playgrounds-cli) - A CLI version of the above
- [`packages/js-playgrounds`](packages/js-playgrounds) - The small library that the Babel plugin adds to report stuff.
