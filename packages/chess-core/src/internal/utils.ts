export function isNil<T>(v: T | null | undefined): v is null | undefined {
	return v === null || v === undefined
}

export function splitIntoChunks<T>(array: T[], chunkSize: number): T[][] {
	return array.flatMap((_, i) =>
		i % chunkSize === 0 ? [array.slice(i, i + chunkSize)] : [],
	)
}
