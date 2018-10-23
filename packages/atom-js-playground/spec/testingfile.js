Array.concat = (a, b) => a.concat(b)
Array.empty = []

const withTag = (tag, x) => (x.tag = tag, x);

const Reducer = (f, tag) => ({
  map: fn => Reducer((acc, curr) => f(acc, fn(curr)), `map(${f})`),
  filter: fn =>
    Reducer((acc, curr) => f(acc, fn(curr)), `filter(${f})`),
  inspect: () => `Reducer(${tag || f})`
})

Reducer(Array.concat).map(x => x + 1);
