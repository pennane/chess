import { computerVsComputerGameLoop, gameLoop } from './chess/gameLoop/gameLoop'
import { fenToState } from './chess/serialization/fen/fen'
import { INITIAL_CHESS_BOARD_FEN_STRING } from './chess/serialization/fen/fen.constants'
import { promptForGameType } from './ui/prompt/prompt'
import logger from './utils/logger'

async function start() {
	const state = fenToState(INITIAL_CHESS_BOARD_FEN_STRING)

	logger.info('CHESS - da bomb')

	const gameType = await promptForGameType()

	if (gameType === 'c') {
		return computerVsComputerGameLoop(state)
	}

	gameLoop(state, gameType)
}

start()
