import { EngineChessGame } from './store.models'

const gameStore = new Map<string, EngineChessGame>()

export function getGameStore() {
	return gameStore
}

export function getGameFromStore(gameId: string) {
	const store = getGameStore()
	const game = store.get(gameId)

	return game
}
