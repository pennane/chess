import {
	KING,
	ROOK,
	FILE_A,
	FILE_H,
	CASTLE_KING_SIDE,
	CASTLING_SQUARES,
	CASTLE_QUEEN_SIDE,
} from '../../chess.constants'
import { indexToSquare, getPiece, squareToIndex } from '../../chess.lib'
import { State, Move } from '../../chess.models'
import { invertColor } from '../moves.lib'

export const clone = <T>(v: T) => structuredClone(v)

export const updateCastlingAbility =
	(move: Move) =>
	(state: State): State => {
		const sideToMove = state.sideToMove
		const opponentSide = invertColor(sideToMove)
		const fromSquare = indexToSquare(move.from)
		const toSquare = indexToSquare(move.to)

		const movedPiece = getPiece(move.from, state)
		const targetPiece = getPiece(move.to, state)

		if (movedPiece?.type === KING) {
			state.castlingAbility[state.sideToMove].kingSide = false
			state.castlingAbility[state.sideToMove].queenSide = false
		}

		if (movedPiece?.type === ROOK && fromSquare.file === FILE_A) {
			state.castlingAbility[state.sideToMove].queenSide = false
		}

		if (movedPiece?.type === ROOK && fromSquare.file === FILE_H) {
			state.castlingAbility[sideToMove].kingSide = false
		}

		const opponentCanCastleKingSide =
			state.castlingAbility[opponentSide].kingSide
		const opponentCanCastleQueenSide =
			state.castlingAbility[opponentSide].queenSide

		if (
			opponentCanCastleQueenSide &&
			targetPiece?.type === ROOK &&
			toSquare.file === FILE_A
		) {
			state.castlingAbility[opponentSide].queenSide = false
		}

		if (
			opponentCanCastleKingSide &&
			targetPiece?.type === ROOK &&
			toSquare.file === FILE_H
		) {
			state.castlingAbility[opponentSide].kingSide = false
		}

		return state
	}
export const incrementFullMoveCounter = (state: State): State => {
	state.fullmoveCounter += 1
	return state
}
export const handleCastling =
	(move: Move) =>
	(state: State): State => {
		const sideToMove = state.sideToMove

		if (move.castling === CASTLE_KING_SIDE) {
			const oldKingSquare = squareToIndex(
				CASTLING_SQUARES[sideToMove].kingSide.oldKingSquare,
			)
			const newKingSquare = squareToIndex(
				CASTLING_SQUARES[sideToMove].kingSide.newKingSquare,
			)
			const oldRookSquare = squareToIndex(
				CASTLING_SQUARES[sideToMove].kingSide.oldRookSquare,
			)
			const newRookSquare = squareToIndex(
				CASTLING_SQUARES[sideToMove].kingSide.newRookSquare,
			)
			const king = state.board[oldKingSquare]
			const rook = state.board[oldRookSquare]

			state.board[oldKingSquare] = null
			state.board[oldRookSquare] = null
			state.board[newKingSquare] = king
			state.board[newRookSquare] = rook

			return state
		}

		if (move.castling === CASTLE_QUEEN_SIDE) {
			const oldKingSquare = squareToIndex(
				CASTLING_SQUARES[sideToMove].queenSide.oldKingSquare,
			)
			const newKingSquare = squareToIndex(
				CASTLING_SQUARES[sideToMove].queenSide.newKingSquare,
			)
			const oldRookSquare = squareToIndex(
				CASTLING_SQUARES[sideToMove].queenSide.oldRookSquare,
			)
			const newRookSquare = squareToIndex(
				CASTLING_SQUARES[sideToMove].queenSide.newRookSquare,
			)
			const king = state.board[oldKingSquare]
			const rook = state.board[oldRookSquare]
			state.board[oldKingSquare] = null
			state.board[oldRookSquare] = null
			state.board[newKingSquare] = king
			state.board[newRookSquare] = rook

			return state
		}

		return state
	}
export const invertStateSideToMove = (state: State): State => {
	state.sideToMove = invertColor(state.sideToMove)
	return state
}
export const handleMove =
	(move: Move) =>
	(state: State): State => {
		if (move.castling) return state
		state.board[move.to] = state.board[move.from]
		state.board[move.from] = null
		return state
	}
export const handlePromotion =
	(move: Move) =>
	(state: State): State => {
		if (!move.promotion) return state
		state.board[move.to] = {
			color: state.sideToMove,
			type: move.promotion,
		}
		return state
	}
