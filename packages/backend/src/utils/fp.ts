export function isNil<T>(v: T | null | undefined): v is null | undefined {
	return v === null || v === undefined
}

export function isNotNil<T>(v: T): v is Extract<T, null | undefined> {
	return !isNil(v)
}

export function isEmpty<T>(v: T[]): boolean {
	return v.length === 0
}

export function isNotEmpty<T>(v: T[]): boolean {
	return !isEmpty(v)
}

export function clone<T>(v: T) {
	return structuredClone(v)
}
