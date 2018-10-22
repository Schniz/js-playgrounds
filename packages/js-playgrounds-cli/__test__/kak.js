const Reducer = (f, tag = "empty") => ({
  map: fn => Reducer((acc, curr) => f(acc, fn(curr)), `map(${tag})`),
  filter: fn => Reducer((acc, curr) => (fn(curr) ? f(acc, curr) : acc), `filter(${tag})`),
  take: num => Reducer((acc, curr) => (acc.length < num ? f(acc, curr) : acc), `take(${tag})`),
  value: (initial, xs) => xs.reduce(f, initial),
  inspect: () => `Reducer(${tag})`
});

const LodashChain = (reducer, initial, xs) => ({
  map: fn => LodashChain(reducer.map(fn), initial, xs),
  filter: fn => LodashChain(reducer.filter(fn), initial, xs),
  take: fn => LodashChain(reducer.take(fn), initial, xs),
  value: () => reducer.value(initial, xs),
  inspect: () => `${reducer.inspect()}<${initial}, ${xs}>`
})

// Lodash chain syntax

Array.empty = [];
Array.concat = (a, b) => a.concat(b);

const chain = items => {
  return LodashChain(Reducer(items.constructor.concat), items.constructor.empty, items)
}

// USAGE

const reducer = Reducer((acc, curr) => acc.concat([curr]))
  .map(x => x + 1)
  .filter(x => x > 0)
  .take(1);

const result = reducer.value([], [-1, 1, 2, 3]);

let chainer = chain([1,2,3,4]).map(x => x + 1).take(1)

chainer.value()

console.log(chainer.value())
