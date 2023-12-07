import { EngineChessGameStatus } from './store.models'

export const MAX_DURATION_FROM_LAST_UPDATE_MS = 1000 * 60 * 15
export const MAX_DURATION_FROM_CREATED_AT_MS = 1000 * 60 * 45
export const GAME_STATES_TO_ALWAYS_PRUNE: EngineChessGameStatus[] = [
	EngineChessGameStatus.ABANDONED,
	EngineChessGameStatus.CHECKMATE,
	EngineChessGameStatus.DRAW,
	EngineChessGameStatus.RESIGNED,
	EngineChessGameStatus.STALEMATE,
]

export const PRUNE_INTERVAL_MS = 1000 * 60

export const MAX_GAMES_IN_STORE = 500
