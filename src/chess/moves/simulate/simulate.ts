import { pipe } from 'ramda'
import { Move, State } from '../../chess.models'
import {
  updateCastlingAbility,
  incrementFullMoveCounter,
  handleCastling,
  handleMove,
  handlePromotion,
  invertStateSideToMove,
  clone
} from './simutate.lib'

export const simulateMove = (state: State, move: Move) =>
  pipe(
    clone<State>,
    updateCastlingAbility(move),
    incrementFullMoveCounter,
    handleCastling(move),
    handleMove(move),
    handlePromotion(move),
    invertStateSideToMove
  )(state)
