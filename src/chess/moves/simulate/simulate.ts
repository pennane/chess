import { pipe } from 'ramda'
import { Move, State } from '../../chess.models'
import {
  updateCastlingAbility,
  incrementFullMoveCounter,
  handleCastling,
  handleMove,
  handlePromotion,
  invertStateSideToMove
} from './simutate.lib'

export const simulateMove = (state: State, move: Move) =>
  pipe(
    updateCastlingAbility(move),
    incrementFullMoveCounter,
    handleCastling(move),
    handleMove(move),
    handlePromotion(move),
    invertStateSideToMove
  )(state)
