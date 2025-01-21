<!----- BEGIN GHOST DOCS HEADER ----->

# @jill64/unfurl

<!----- BEGIN GHOST DOCS BADGES ----->

<a href="https://npmjs.com/package/@jill64/unfurl"><img src="https://img.shields.io/npm/v/@jill64/unfurl" alt="npm-version" /></a> <a href="https://npmjs.com/package/@jill64/unfurl"><img src="https://img.shields.io/npm/l/@jill64/unfurl" alt="npm-license" /></a> <a href="https://npmjs.com/package/@jill64/unfurl"><img src="https://img.shields.io/npm/dm/@jill64/unfurl" alt="npm-download-month" /></a> <a href="https://npmjs.com/package/@jill64/unfurl"><img src="https://img.shields.io/bundlephobia/min/@jill64/unfurl" alt="npm-min-size" /></a> <a href="https://github.com/jill64/unfurl/actions/workflows/ci.yml"><img src="https://github.com/jill64/unfurl/actions/workflows/ci.yml/badge.svg" alt="ci.yml" /></a>

<!----- END GHOST DOCS BADGES ----->

💠 Concurrently wait for a Promise mapped to an object while preserving the type

<!----- END GHOST DOCS HEADER ----->

## Install

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

## unfurlSettled

The settled version uses `Promise.allSettled` internally and waits until all Promises have completed. Also, the return value type will be the value wrapped in `PromiseSettledResult`.

```js
import { unfurlSettled } from '@jill64/unfurl'

const result = await unfurlSettled({
  number: Promise.resolve(1),
  string: Promise.resolve('Test'),
  boolean: true,
  object: Promise.resolve({
    key: 'value'
  })
})
// Return Value
// {
//   number: {
//     status: 'fulfilled',
//     value: 1
//   },
//   string: {
//     status: 'fulfilled',
//     value: 'Test'
//   },
//   boolean: {
//     status: 'fulfilled',
//     value: true
//   },
//   object: {
//     status: 'fulfilled',
//     value: {
//       key: 'value'
//     }
//   }
// }
```

<!----- BEGIN GHOST DOCS FOOTER ----->

## License

[MIT](LICENSE)

<!----- END GHOST DOCS FOOTER ----->
