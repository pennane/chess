import { Move, State } from '../chess.models'
import {
	updateCastlingAbility,
	incrementFullMoveCounter,
	handleCastling,
	handleMove,
	handlePromotion,
	invertStateSideToMove,
} from './simulate.lib'

export const simulateMove = (state: State, move: Move): State => {
	let s = structuredClone(state)
	s = updateCastlingAbility(move)(s)
	s = incrementFullMoveCounter(s)
	s = handleCastling(move)(s)
	s = handleMove(move)(s)
	s = handlePromotion(move)(s)
	s = invertStateSideToMove(s)
	return s
}
