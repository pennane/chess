import {
	GAME_STATES_TO_ALWAYS_PRUNE,
	MAX_DURATION_FROM_CREATED_AT_MS,
	MAX_DURATION_FROM_LAST_UPDATE_MS,
	MAX_GAMES_IN_STORE,
	PRUNE_INTERVAL_MS,
} from './store.constants'
import { EngineChessGame } from './store.models'

const gameStore = new Map<string, EngineChessGame>()

export function storeHasSpaceForNewGame() {
	return gameStore.size < MAX_GAMES_IN_STORE
}

export function getGameStore() {
	return gameStore
}

export function getGameFromStore(gameId: string) {
	const store = getGameStore()
	const game = store.get(gameId)

	return game
}

export function refreshGameUpdatedAt(gameId: string) {
	const store = getGameStore()
	const game = store.get(gameId)
	if (!game) return
	game.updatedAt = new Date()
}

function pruneOldGames() {
	const now = Date.now()
	const store = getGameStore()
	for (const [id, game] of store.entries()) {
		if (GAME_STATES_TO_ALWAYS_PRUNE.includes(game.status)) {
			return store.delete(id)
		}
		if (now - game.createdAt.getTime() > MAX_DURATION_FROM_CREATED_AT_MS) {
			return store.delete(id)
		}
		if (now - game.updatedAt.getTime() > MAX_DURATION_FROM_LAST_UPDATE_MS) {
			return store.delete(id)
		}
	}
}

setInterval(pruneOldGames, PRUNE_INTERVAL_MS)
