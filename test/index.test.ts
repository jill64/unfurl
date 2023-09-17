import { expect, test } from 'vitest'
import { unfurl } from '../src/index'

test('Without Optional', async () => {
  const result = await unfurl({
    number: Promise.resolve(1),
    string: Promise.resolve('Test'),
    boolean: true,
    object: Promise.resolve({
      key: 'value'
    })
  })

  expect(result).toEqual({
    number: 1,
    string: 'Test',
    boolean: true,
    object: {
      key: 'value'
    }
  })
})

test('With Optional', async () => {
  const result = await unfurl(
    {
      set: Promise.resolve(new Set(['A', 'B', 'C'])),
      date: Promise.resolve(new Date('2000-01-01'))
    },
    new Promise((resolve) => setTimeout(resolve, 100)),
    new Promise((resolve) => setTimeout(resolve, 200)),
    new Promise((resolve) => setTimeout(resolve, 300))
  )

  expect(result).toStrictEqual({
    set: new Set(['A', 'B', 'C']),
    date: new Date('2000-01-01')
  })
})
