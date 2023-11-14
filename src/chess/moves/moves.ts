import { assertNever } from '../../utils/assert'
import { PAWN, KNIGHT, BISHOP, ROOK, QUEEN, KING } from '../chess.constants'
import { getPiece } from '../chess.lib'
import { State, Move, SquareIndex } from '../chess.models'
import { generateBishopMoves } from './pieces/bishopMoves'
import { generateKingMoves } from './pieces/kingMoves'
import { generateKnightMoves } from './pieces/knightMoves'
import { findPiecePosition, isLegalMove, validateMove } from './moves.lib'
import { generatePawnMoves } from './pieces/pawnMoves'
import { generateQueenMoves } from './pieces/queenMoves'
import { generateRookMoves } from './pieces/rookMoves'
import { simulateMove } from './simulate/simulate'
import { parseMove } from '../serialization/pureCoordinateNotation/pureCoordinateNotation'

export function generateMovesForSquareIndex(
	state: State,
	squareIndex: SquareIndex,
	ignoreKing: boolean = false,
): Move[] {
	const piece = getPiece(squareIndex, state)

	if (!piece) return []

	switch (piece.type) {
		case PAWN:
			return generatePawnMoves(squareIndex, state)
		case KNIGHT:
			return generateKnightMoves(squareIndex, state)
		case BISHOP:
			return generateBishopMoves(squareIndex, state)
		case ROOK:
			return generateRookMoves(squareIndex, state)
		case QUEEN:
			return generateQueenMoves(squareIndex, state)
		case KING:
			return ignoreKing ? [] : generateKingMoves(squareIndex, state)
		default:
			assertNever(piece.type)
			return []
	}
}

export function generateMoves(state: State): Move[] {
	const moves: Move[] = []

	for (let squareIndex = 0; squareIndex < state.board.length; squareIndex++) {
		const piece = state.board[squareIndex]
		if (!piece || piece.color !== state.sideToMove) continue
		const newMoves = generateMovesForSquareIndex(state, squareIndex)
		moves.push(...newMoves)
	}

	const kingPosition = findPiecePosition(state.board, {
		color: state.sideToMove,
		type: KING,
	})!

	const legalMoves = moves.filter((move) =>
		isLegalMove(state, move, kingPosition),
	)
	return legalMoves
}

export function playMove(
	playedMove: Move,
	state: State,
	noValidation: boolean,
): State
export function playMove(playedMove: Move | string, state: State): State
export function playMove(
	playedMove: string | Move,
	state: State,
	noValidation: boolean = false,
): State {
	if (noValidation) {
		return simulateMove(state, playedMove as Move)
	}

	const parsedMove =
		typeof playedMove === 'string' ? parseMove(playedMove) : playedMove

	if (!parsedMove) return state
	const validatedMove = validateMove(state, parsedMove)
	if (!validatedMove) return state
	const nextState = simulateMove(state, validatedMove)
	return nextState
}
