import {
  KING,
  ROOK,
  FILE_A,
  FILE_H,
  CASTLE_KING_SIDE,
  CASTLING_SQUARES,
  CASTLE_QUEEN_SIDE
} from '../../chess.constants'
import { indexToSquare, getPiece, squareToIndex } from '../../chess.lib'
import { State, Move } from '../../chess.models'
import { invertColor } from '../moves.lib'

export const updateCastlingAbility =
  (move: Move) =>
  (state: State): State => {
    const clonedState = structuredClone(state)

    const sideToMove = clonedState.sideToMove
    const opponentSide = invertColor(sideToMove)
    const fromSquare = indexToSquare(move.from)
    const toSquare = indexToSquare(move.to)

    const movedPiece = getPiece(move.from, clonedState)!
    const targetPiece = getPiece(move.to, clonedState)

    if (movedPiece.type === KING) {
      clonedState.castlingAbility[clonedState.sideToMove].kingSide = false
      clonedState.castlingAbility[clonedState.sideToMove].queenSide = false
    }

    if (movedPiece.type === ROOK && fromSquare.file === FILE_A) {
      clonedState.castlingAbility[clonedState.sideToMove].queenSide = false
    }

    if (movedPiece.type === ROOK && fromSquare.file === FILE_H) {
      clonedState.castlingAbility[sideToMove].kingSide = false
    }

    const opponentCanCastleKingSide =
      clonedState.castlingAbility[opponentSide].kingSide
    const opponentCanCastleQueenSide =
      clonedState.castlingAbility[opponentSide].queenSide

    if (
      opponentCanCastleQueenSide &&
      targetPiece?.type === ROOK &&
      toSquare.file === FILE_A
    ) {
      clonedState.castlingAbility[opponentSide].queenSide = false
    }

    if (
      opponentCanCastleKingSide &&
      targetPiece?.type === ROOK &&
      toSquare.file === FILE_H
    ) {
      clonedState.castlingAbility[opponentSide].kingSide = false
    }

    return clonedState
  }
export const incrementFullMoveCounter = (state: State): State => {
  return { ...state, fullmoveCounter: state.fullmoveCounter + 1 }
}
export const handleCastling =
  (move: Move) =>
  (state: State): State => {
    const clonedState = structuredClone(state)

    const sideToMove = clonedState.sideToMove

    if (move.castling === CASTLE_KING_SIDE) {
      const oldKingSquare = squareToIndex(
        CASTLING_SQUARES[sideToMove].kingSide.oldKingSquare
      )
      const newKingSquare = squareToIndex(
        CASTLING_SQUARES[sideToMove].kingSide.newKingSquare
      )
      const oldRookSquare = squareToIndex(
        CASTLING_SQUARES[sideToMove].kingSide.oldRookSquare
      )
      const newRookSquare = squareToIndex(
        CASTLING_SQUARES[sideToMove].kingSide.newRookSquare
      )
      const king = clonedState.board[oldKingSquare]
      const rook = clonedState.board[oldRookSquare]

      clonedState.board[oldKingSquare] = null
      clonedState.board[oldRookSquare] = null
      clonedState.board[newKingSquare] = king
      clonedState.board[newRookSquare] = rook

      return clonedState
    }

    if (move.castling === CASTLE_QUEEN_SIDE) {
      const oldKingSquare = squareToIndex(
        CASTLING_SQUARES[sideToMove].queenSide.oldKingSquare
      )
      const newKingSquare = squareToIndex(
        CASTLING_SQUARES[sideToMove].queenSide.newKingSquare
      )
      const oldRookSquare = squareToIndex(
        CASTLING_SQUARES[sideToMove].queenSide.oldRookSquare
      )
      const newRookSquare = squareToIndex(
        CASTLING_SQUARES[sideToMove].queenSide.newRookSquare
      )
      const king = clonedState.board[oldKingSquare]
      const rook = clonedState.board[oldRookSquare]
      clonedState.board[oldKingSquare] = null
      clonedState.board[oldRookSquare] = null
      clonedState.board[newKingSquare] = king
      clonedState.board[newRookSquare] = rook

      return clonedState
    }

    return state
  }
export const invertStateSideToMove = (state: State): State => {
  return { ...state, sideToMove: invertColor(state.sideToMove) }
}
export const handleMove =
  (move: Move) =>
  (state: State): State => {
    if (move.castling) return state
    const clonedState = structuredClone(state)
    clonedState.board[move.to] = clonedState.board[move.from]
    clonedState.board[move.from] = null
    return clonedState
  }
export const handlePromotion =
  (move: Move) =>
  (state: State): State => {
    if (!move.promotion) return state
    const clonedState = structuredClone(state)
    clonedState.board[move.to] = {
      color: state.sideToMove,
      type: move.promotion
    }
    return clonedState
  }
