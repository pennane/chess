import { fenToState, stateToFen } from '../../chess/fen/fen'
import { createInitialGame, createPlayer } from './gameEngine.lib'
import { getGameFromStore, getGameStore } from './store/store'
import {
	EngineChessColor,
	EngineChessGame,
	EngineChessGameStatus,
} from './store/store.models'
import { playMove as playChessMove } from '../../chess/moves/moves'

export function getGame(gameId: string) {
	const store = getGameStore()
	return store.get(gameId)
}

export function createGame(playerId: string): EngineChessGame {
	const store = getGameStore()
	const game = createInitialGame(playerId)
	store.set(game.id, game)
	return game
}
export function joinGame(playerId: string, gameId: string): EngineChessGame {
	const game = getGameFromStore(gameId)

	if (game.players.some((p) => p.id === playerId)) {
		throw new Error('You are already part of the game')
	}

	if (game.players.length >= 2) {
		throw new Error('Game is full')
	}

	const newPlayers = game.players.concat(createPlayer(playerId))
	game.players = newPlayers

	return game
}
export function leaveGame(playerId: string, gameId: string): EngineChessGame {
	const game = getGameFromStore(gameId)

	if (game.players.every((p) => p.id !== playerId)) {
		throw new Error('You are not part of the game')
	}

	const newPlayers = game.players.filter((p) => p.id === playerId)
	game.players = newPlayers

	return game
}
export function resign(playerId: string, gameId: string): EngineChessGame {
	const game = getGameFromStore(gameId)

	if (game.players.every((p) => p.id !== playerId)) {
		throw new Error('You are not part of the game')
	}

	game.status = EngineChessGameStatus.ABANDONED

	return game
}
export function toggleReady(
	playerId: string,
	gameId: string,
	ready: boolean,
): EngineChessGame {
	const game = getGameFromStore(gameId)

	if (game.players.every((p) => p.id !== playerId)) {
		throw new Error('You are not part of the game')
	}

	const newPlayers = game.players.map((p) =>
		p.id === playerId ? { ...p, ready } : p,
	)

	if (newPlayers.length === 2 && newPlayers.every((p) => p.ready === true)) {
		game.status = EngineChessGameStatus.IN_PROGRESS
		const firstColor =
			Math.random() > 0.5
				? EngineChessColor.WHITE
				: EngineChessColor.BLACK
		newPlayers[0].color = firstColor
		newPlayers[1].color =
			firstColor === EngineChessColor.WHITE
				? EngineChessColor.BLACK
				: EngineChessColor.WHITE
	}

	game.players = newPlayers

	return game
}
export function toggleDrawDesire(
	playerId: string,
	gameId: string,
	desiresDraw: boolean,
): EngineChessGame {
	const game = getGameFromStore(gameId)

	if (game.players.every((p) => p.id !== playerId)) {
		throw new Error('You are not part of the game')
	}

	const newPlayers = game.players.map((p) =>
		p.id === playerId ? { ...p, desiresDraw } : p,
	)

	if (
		newPlayers.length === 2 &&
		newPlayers.every((p) => p.desiresDraw === true)
	) {
		game.status = EngineChessGameStatus.DRAW
	}

	game.players = newPlayers

	return game
}
export function playMove(
	playerId: string,
	gameId: string,
	move: string,
): EngineChessGame {
	const game = getGameFromStore(gameId)

	if (game.players.every((p) => p.id !== playerId)) {
		throw new Error('You are not part of the game')
	}

	if (game.status !== EngineChessGameStatus.IN_PROGRESS) {
		throw new Error('Game not in progress')
	}

	const state = fenToState(game.fenString)
	const newState = playChessMove(move, state)
	game.fenString = stateToFen(newState)

	return game
}
