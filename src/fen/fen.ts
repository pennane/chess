import { State } from '../chess/chess.models'
import {
  boardToFen,
  castlingAbilityToFen,
  enPassantTargetSquareToFen,
  fenToBoard,
  fenToCastlingAbility,
  fenToEnPassantTargetSquare,
  fenToSideToMove,
  fenToFullmoveCounter,
  sideToMoveToFen,
  fenToHalfmoveClock,
  halfmoveClockToFen,
  fullmoveCounterToFen
} from './fen.lib'

export function fenToState(fen: string): State {
  const [
    board,
    sideToMove,
    castlingAbility,
    enPassantTargetSquare,
    halfmoveClock,
    fullmoveCounter
  ] = fen.split(' ')

  return {
    board: fenToBoard(board),
    sideToMove: fenToSideToMove(sideToMove),
    castlingAbility: fenToCastlingAbility(castlingAbility),
    enPassantTargetSquare: fenToEnPassantTargetSquare(enPassantTargetSquare),
    halfmoveClock: fenToHalfmoveClock(halfmoveClock),
    fullmoveCounter: fenToFullmoveCounter(fullmoveCounter)
  }
}

export function stateToFen(state: State): string {
  const fields = [
    boardToFen(state.board),
    sideToMoveToFen(state.sideToMove),
    castlingAbilityToFen(state.castlingAbility),
    enPassantTargetSquareToFen(state.enPassantTargetSquare),
    halfmoveClockToFen(state.halfmoveClock),
    fullmoveCounterToFen(state.fullmoveCounter)
  ]
  return fields.join(' ')
}
