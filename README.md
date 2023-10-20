# @jill64/unfurl

[![npm](https://img.shields.io/npm/v/%40jill64%2Funfurl)](https://npmjs.com/package/@jill64/unfurl)
[![npm](https://img.shields.io/npm/l/%40jill64%2Funfurl)](https://npmjs.com/package/@jill64/unfurl)
[![codecov](https://codecov.io/github/jill64/unfurl/graph/badge.svg?token=SC3Z3UKGRZ)](https://codecov.io/github/jill64/unfurl)

Concurrently wait for a Promise mapped to an object while preserving the type

## Installation

```sh
npm i @jill64/unfurl
```

## Usage

When passed an object containing promises, it will wait until all promises are resolved, keeping the keys and values.

```js
import { unfurl } from '@jill64/unfurl'

const result = await unfurl({
  number: Promise.resolve(1),
  string: Promise.resolve('Test'),
  boolean: true,
  object: Promise.resolve({
    key: 'value'
  })
})
// Return Value
// {
//   number: 1,
//   string: 'Test',
//   boolean: true,
//   object: {
//     key: 'value'
//   }
// }
```

If you pass any number of promises after the second argument, it will wait until they are resolved.  
However, the return value is not available.

```js
import { unfurl } from '@jill64/unfurl'

const result = await unfurl(
  {
    set: Promise.resolve(new Set(['A', 'B', 'C'])),
    date: Promise.resolve(new Date('2000-01-01'))
  },
  new Promise((resolve) => setTimeout(resolve, 100)),
  new Promise((resolve) => setTimeout(resolve, 200)),
  new Promise((resolve) => setTimeout(resolve, 300))
)
// Return Value
// {
//   set: new Set(['A', 'B', 'C']),
//   date: new Date('2000-01-01')
// }
```
