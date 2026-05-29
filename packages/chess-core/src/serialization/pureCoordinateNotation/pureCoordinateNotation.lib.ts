import { PROMOTABLE_PIECES } from '../../chess.constants'

export function parseFile(file: string): number | null {
	const fileNumber = file.charCodeAt(0) - 'a'.charCodeAt(0)
	if (fileNumber < 0 || fileNumber > 7) return null
	return fileNumber
}

export function parseRank(rank: string): number | null {
	const parsedRank = parseInt(rank) - 1

	if (parsedRank < 0 || parsedRank > 7) return null
	return parsedRank
}

export function parsePromotionPiece(
	piece: string,
): (typeof PROMOTABLE_PIECES)[number] | undefined {
	if (!piece) return undefined
	if (PROMOTABLE_PIECES.includes(piece.toLowerCase() as any)) {
		return piece.toLowerCase() as any
	}
	return undefined
}
