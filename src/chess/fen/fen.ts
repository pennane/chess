import { State } from '../chess.models'
import {
  boardToFen,
  castlingAbilityToFen,
  enPassantTargetSquareIndexToFen,
  fenToBoard,
  fenToCastlingAbility,
  fenToEnPassantTargetSquareIndex,
  fenToSideToMove,
  fenToFullmoveCounter,
  sideToMoveToFen,
  fenToHalfmoveClock,
  halfmoveClockToFen,
  fullmoveCounterToFen
} from './fen.lib'

/**
 * Takes in a standard FEN string and converts it into a custom State object
 * https://www.chessprogramming.org/Forsyth-Edwards_Notation
 */
export function fenToState(fen: string): State {
  const [
    board,
    sideToMove,
    castlingAbility,
    enPassantTargetSquareIndex,
    halfmoveClock,
    fullmoveCounter
  ] = fen.split(' ')

  return {
    board: fenToBoard(board),
    sideToMove: fenToSideToMove(sideToMove),
    castlingAbility: fenToCastlingAbility(castlingAbility),
    enPassantTargetSquareIndex: fenToEnPassantTargetSquareIndex(
      enPassantTargetSquareIndex
    ),
    halfmoveClock: fenToHalfmoveClock(halfmoveClock),
    fullmoveCounter: fenToFullmoveCounter(fullmoveCounter)
  }
}

/**
 * Converts a custom State object into a standard FEN string
 * https://www.chessprogramming.org/Forsyth-Edwards_Notation
 */
export function stateToFen(state: State): string {
  const fields = [
    boardToFen(state.board),
    sideToMoveToFen(state.sideToMove),
    castlingAbilityToFen(state.castlingAbility),
    enPassantTargetSquareIndexToFen(state.enPassantTargetSquareIndex),
    halfmoveClockToFen(state.halfmoveClock),
    fullmoveCounterToFen(state.fullmoveCounter)
  ]
  return fields.join(' ')
}
