export function assertNever(value: never) {
  throw new Error('Expected to never come here, but got', value)
}
