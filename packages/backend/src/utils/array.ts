export function splitIntoChunks<T>(array: T[], chunkSize: number) {
	return array.flatMap((_, i) =>
		i % chunkSize === 0 ? [array.slice(i, i + chunkSize)] : [],
	)
}

export function sample<T>(arr: T[]) {
	return arr[Math.floor(Math.random() * arr.length)]
}
