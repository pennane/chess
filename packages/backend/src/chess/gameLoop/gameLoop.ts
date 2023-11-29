import { drawState } from '../../ui/draw/draw'
import { moveToReadable } from '../../ui/draw/draw.lib'
import { getInput } from '../../ui/prompt/prompt'
import { sample } from '../../utils/array'
import { isEmpty } from '../../utils/fp'
import logger from '../../utils/logger'
import { WHITE } from '../chess.constants'
import { State, Color } from '../chess.models'
import { generateMoves, playMove } from '../moves/moves'
import { isInCheck } from '../moves/moves.lib'

export async function gameLoop(state: State, userSide: Color) {
	drawState(state, userSide)
	const possibleMoves = generateMoves(state)

	logger.debug(
		'turn',
		state.sideToMove === WHITE ? 'White' : 'Black',
		'legal moves',
		possibleMoves.map((move) => moveToReadable(state, move)),
		'in check',
		isInCheck(state),
	)

	if (isEmpty(possibleMoves)) {
		const inCheck = isInCheck(state)
		if (inCheck) {
			logger.info(
				state.sideToMove === WHITE
					? 'Black won with checkmate'
					: 'White won with checkmate',
			)
			return
		}
		logger.info('Stalemate.')
		return
	}

	if (state.sideToMove === userSide) {
		logger.info('Your turn.')
		const playedMove = await getInput('Enter move: (e.g. a3a5)')
		const newState = playMove(playedMove, state)
		return gameLoop(newState, userSide)
	}

	const moves = generateMoves(state)
	const playedMove = sample(moves)
	const newState = playMove(playedMove, state, true)
	return gameLoop(newState, userSide)
}

export async function computerVsComputerGameLoop(state: State) {
	drawState(state, WHITE)

	const possibleMoves = generateMoves(state)

	logger.debug(
		'turn',
		state.sideToMove === WHITE ? 'White' : 'Black',
		'legal moves',
		possibleMoves.map((move) => moveToReadable(state, move)),
		'in check',
		isInCheck(state),
	)

	if (isEmpty(possibleMoves)) {
		const inCheck = isInCheck(state)
		if (inCheck) {
			console.info(
				state.sideToMove === WHITE
					? 'Black won with checkmate'
					: 'White won with checkmate',
			)
			return
		}
		console.info('Stalemate.')
		return
	}

	const move = sample(possibleMoves)
	const newState = playMove(move, state, true)
	setTimeout(() => computerVsComputerGameLoop(newState), 250)
}
