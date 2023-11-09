export const unfurlSettled = async <
  T extends Record<string | number | symbol, unknown>
>(
  data: T,
  ...optional: unknown[]
): Promise<{
  [P in keyof T]: PromiseSettledResult<Awaited<T[P]>>
}> => {
  const entries = Object.entries(data)

  const keys = entries.map(([key]) => key)
  const values = entries.map(([, value]) => value)

  const [result] = await Promise.allSettled([
    Promise.allSettled(values.map(async (x) => await x)),
    ...optional.map(async (x) => await x)
  ])

  if (result.status === 'rejected') {
    throw result.reason
  }

  return Object.fromEntries(
    keys.map((key, index) => [key, result.value[index]])
  ) as {
    [P in keyof T]: PromiseSettledResult<Awaited<T[P]>>
  }
}
