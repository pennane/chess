import { BLACK, KING, WHITE } from '../chess.constants'
import { getPiece } from '../chess.lib'
import {
	Board,
	ChessPiece,
	Color,
	Move,
	SquareIndex,
	State,
} from '../chess.models'
import { generateMovesForSquareIndex } from './moves'
import { simulateMove } from './simulate/simulate'

export function isLegalMove(
	state: State,
	move: Move,
	originalKingSquare: SquareIndex,
): boolean {
	const nextState = simulateMove(state, move)
	const movedPiece = getPiece(move.from, state)
	const kingSquare = movedPiece?.type === 'k' ? move.to : originalKingSquare
	if (!kingSquare) return false
	return !isUnderAttack(kingSquare, nextState, state.sideToMove)
}

export function findPiecePosition(
	board: Board,
	targetPiece: ChessPiece,
): SquareIndex | null {
	for (let i = 0; i < board.length; i++) {
		const piece = board[i]
		if (
			piece &&
			piece.type === targetPiece.type &&
			piece.color === targetPiece.color
		) {
			return i
		}
	}
	return null
}

export function isInCheck(state: State) {
	const kingSquare = findPiecePosition(state.board, {
		type: KING,
		color: state.sideToMove,
	})
	if (!kingSquare) return true
	const inCheck = isUnderAttack(kingSquare, state, state.sideToMove)
	return inCheck
}

export function validateMove(state: State, move: Move) {
	const generatedMoves = generateMovesForSquareIndex(state, move.from)
	const validatedMove = generatedMoves.find(
		(m) =>
			move.from === m.from &&
			move.to === m.to &&
			move.promotion === m.promotion,
	)
	return validatedMove
}

export function isUnderAttack(
	square: SquareIndex,
	state: State,
	attackedColor: Color,
	ignoreKing: boolean = false,
): boolean {
	for (let squareIndex = 0; squareIndex < state.board.length; squareIndex++) {
		const piece = getPiece(squareIndex, state)

		if (!piece || piece.color === attackedColor) continue

		const moves = generateMovesForSquareIndex(
			{ ...state, sideToMove: invertColor(attackedColor) },
			squareIndex,
			ignoreKing,
		)

		if (moves.some((move) => move.to === square)) {
			return true
		}
	}

	return false
}

export function invertColor(color: Color) {
	return color === WHITE ? BLACK : WHITE
}
