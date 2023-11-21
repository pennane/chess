import { CHESS_BOARD_SIZE, WHITE } from '../../chess/chess.constants'
import { Color, State } from '../../chess/chess.models'
import { stateToFen } from '../../chess/fen/fen'
import logger from '../../utils/logger'
import { pieceToSymbol } from './draw.lib'

export function drawState(state: State, userSide: Color): void {
	logger.info('\n\n\n\n======================================')
	if (userSide === WHITE) {
		for (let rank = CHESS_BOARD_SIZE - 1; rank >= 0; rank--) {
			logger.info('   +---+---+---+---+---+---+---+---+')
			let rankString = `${rank + 1}  | `
			for (let file = 0; file < CHESS_BOARD_SIZE; file++) {
				const piece = state.board[file + rank * CHESS_BOARD_SIZE]
				rankString += pieceToSymbol(piece) + '| '
			}
			logger.info(rankString)
		}
		logger.info('   +---+---+---+---+---+---+---+---+')
		logger.info('     A   B   C   D   E   F   G   H')
	} else {
		for (let rank = 0; rank < CHESS_BOARD_SIZE; rank++) {
			logger.info('   +---+---+---+---+---+---+---+---+')
			let rankString = `${rank + 1}  | `
			for (let file = CHESS_BOARD_SIZE - 1; file >= 0; file--) {
				const piece = state.board[file + rank * CHESS_BOARD_SIZE]
				rankString += pieceToSymbol(piece) + '| '
			}
			logger.info(rankString)
		}
		logger.info('   +---+---+---+---+---+---+---+---+')

		logger.info('     H   G   F   E   D   C   B   A')
	}

	logger.info('======================================')
	logger.info(stateToFen(state))
	logger.info('\n')
}
