export const unfurl = async <
  T extends Record<string | number | symbol, unknown>
>(
  data: T,
  ...optional: unknown[]
): Promise<{
  [P in keyof T]: Awaited<T[P]>
}> => {
  const [result] = await Promise.all([
    Promise.all(
      Object.entries(data).map(async ([key, value]) => [key, await value])
    ),
    ...optional.map(async (value) => await value)
  ])

  return Object.fromEntries(result)
}
