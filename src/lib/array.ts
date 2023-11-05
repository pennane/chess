export function splitIntoChunks<T>(array: T[], chunkSize: number) {
  return array.flatMap((x, i) =>
    i % chunkSize === 0 ? [array.slice(i, i + chunkSize)] : []
  )
}
