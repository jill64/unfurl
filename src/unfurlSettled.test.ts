import { expect, test } from 'vitest'
import { unfurlSettled } from './unfurlSettled.js'

test('Without Optional', async () => {
  const result = await unfurlSettled({
    number: Promise.resolve(1),
    string: Promise.resolve('Test'),
    boolean: true,
    object: Promise.resolve({
      key: 'value'
    })
  })

  expect(result).toEqual({
    number: {
      status: 'fulfilled',
      value: 1
    },
    string: {
      status: 'fulfilled',
      value: 'Test'
    },
    boolean: {
      status: 'fulfilled',
      value: true
    },
    object: {
      status: 'fulfilled',
      value: {
        key: 'value'
      }
    }
  })
})

test('With Optional', async () => {
  const result = await unfurlSettled(
    {
      set: Promise.resolve(new Set(['A', 'B', 'C'])),
      date: Promise.resolve(new Date('2000-01-01'))
    },
    new Promise((resolve) => setTimeout(resolve, 100)),
    new Promise((resolve) => setTimeout(resolve, 200)),
    new Promise((resolve) => setTimeout(resolve, 300))
  )

  expect(result).toStrictEqual({
    set: {
      status: 'fulfilled',
      value: new Set(['A', 'B', 'C'])
    },
    date: {
      status: 'fulfilled',
      value: new Date('2000-01-01')
    }
  })
})
