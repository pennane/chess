export function isNil<T>(v: T | null | undefined): v is null | undefined {
  return v === null || v === undefined
}

export function isNotNil<T>(v: T): v is Extract<T, null | undefined> {
  return !isNil(v)
}
