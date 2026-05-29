import { CHESS_BOARD_SIZE, ChessPiece, PAWN, Square } from 'chess-core'

type FromSquare = Square & { piece: ChessPiece }

export function parseBackendMove(from: FromSquare, to: Square): string {
	const move = `${String.fromCharCode(from.file + 'a'.charCodeAt(0))}${
		from.rank + 1
	}${String.fromCharCode(to.file + 'a'.charCodeAt(0))}${to.rank + 1}`

	const isPawn = from.piece.type === PAWN
	const isPromotionEndRank = to.rank === 0 || to.rank === CHESS_BOARD_SIZE - 1
	const shouldPromote = isPawn && isPromotionEndRank

	if (!shouldPromote) return move

	return move.concat('q')
}
