import { createInitialChessState } from './chess/chess.lib'
import { computerVsComputerGameLoop, gameLoop } from './chess/gameLoop/gameLoop'
import { promptForGameType } from './ui/prompt/prompt'
import logger from './utils/logger'

async function start() {
	const state = createInitialChessState()

	logger.info('CHESS - da bomb')

	const gameType = await promptForGameType()

	if (gameType === 'c') {
		return computerVsComputerGameLoop(state)
	}

	gameLoop(state, gameType)
}

start()
