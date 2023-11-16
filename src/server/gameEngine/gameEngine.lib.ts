import { INITIAL_CHESS_BOARD_FEN_STRING } from '../../chess/fen/fen.constants'
import { createId } from '../../utils/uuid'
import {
	EngineChessGame,
	EngineChessGameStatus,
	EngineChessPlayer,
} from './store/store.models'

export function createPlayer(playerId: string): EngineChessPlayer {
	return {
		color: null,
		desiresDraw: false,
		id: playerId,
		ready: false,
	}
}

export function createInitialGame(playerId: string): EngineChessGame {
	return {
		fenString: INITIAL_CHESS_BOARD_FEN_STRING,
		id: createId(),
		moveHistory: [],
		players: [createPlayer(playerId)],
		status: EngineChessGameStatus.NOT_STARTED,
	}
}
