import { CHESS_BOARD_SIZE } from './chess.constants'
import { ChessPiece, Square, SquareIndex, State } from './chess.models'
import { fenToState } from './serialization/fen/fen'
import { INITIAL_CHESS_BOARD_FEN_STRING } from './serialization/fen/fen.constants'

export function getPiece(
	square: Square | SquareIndex,
	state: State,
): ChessPiece | null {
	if (typeof square !== 'number' && isOutOfBounds(square)) {
		return null
	}

	return state.board[
		typeof square === 'number' ? square : squareToIndex(square)
	]
}

export function isOutOfBounds(square: Square) {
	if (square.file < 0 || square.file >= CHESS_BOARD_SIZE) return true
	if (square.rank < 0 || square.rank >= CHESS_BOARD_SIZE) return true
	return false
}

export function indexToSquare(index: number): Square {
	const rank = Math.floor(index / CHESS_BOARD_SIZE)
	const file = index % CHESS_BOARD_SIZE
	return { rank, file }
}

export function squareToIndex(square: Square): SquareIndex {
	return square.rank * CHESS_BOARD_SIZE + square.file
}
