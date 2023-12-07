import { pipe } from 'ramda'
import { Move, State } from '../../chess.models'
import {
	updateCastlingAbility,
	incrementFullMoveCounter,
	handleCastling,
	handleMove,
	handlePromotion,
	invertStateSideToMove,
} from './simutate.lib'
import { clone } from '../../../utils/fp'

export const simulateMove = (state: State, move: Move) =>
	pipe(
		clone<State>,
		updateCastlingAbility(move),
		incrementFullMoveCounter,
		handleCastling(move),
		handleMove(move),
		handlePromotion(move),
		invertStateSideToMove,
	)(state)
