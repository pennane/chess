import {
	assignRandomColorsForPlayers,
	createInitialGame,
	createPlayer,
	validateCanJoinGame,
	validateGameExists,
	validateGameIsInSpecificState,
	validatePlayerOwnsMovedPiece,
	validateUserInGame,
} from './gameEngine.lib'
import { getGameFromStore, getGameStore } from './store/store'
import { EngineChessGame, EngineChessGameStatus } from './store/store.models'
import {
	generateMoves,
	playMove as playChessMove,
} from '../../chess/moves/moves'
import { fenToState, stateToFen } from '../../chess/serialization/fen/fen'
import { parseMove } from '../../chess/serialization/pureCoordinateNotation/pureCoordinateNotation'
import { isEmpty } from '../../utils/fp'
import { isInCheck } from '../../chess/moves/moves.lib'

export function getGame(gameId: string) {
	return getGameFromStore(gameId)
}

export function createGame(playerId: string): EngineChessGame {
	const store = getGameStore()
	const game = createInitialGame(playerId)
	store.set(game.id, game)
	return game
}
export function joinGame(playerId: string, gameId: string): EngineChessGame {
	const game = getGameFromStore(gameId)
	validateGameExists(game)
	validateCanJoinGame(playerId, game)

	const newPlayers = game.players.concat(createPlayer(playerId))
	game.players = newPlayers

	return game
}
export function leaveGame(playerId: string, gameId: string): EngineChessGame {
	const game = getGameFromStore(gameId)

	validateGameExists(game)
	validateUserInGame(playerId, game)

	const newPlayers = game.players.filter((p) => p.id === playerId)
	game.players = newPlayers

	return game
}
export function resign(playerId: string, gameId: string): EngineChessGame {
	const game = getGameFromStore(gameId)
	validateGameExists(game)
	validateUserInGame(playerId, game)

	game.status = EngineChessGameStatus.RESIGNED

	return game
}
export function toggleReady(
	playerId: string,
	gameId: string,
	ready: boolean,
): EngineChessGame {
	const game = getGameFromStore(gameId)

	validateGameExists(game)
	validateUserInGame(playerId, game)

	const playersAfterToggledReady = game.players.map((p) =>
		p.id === playerId ? { ...p, ready } : p,
	)
	game.players = playersAfterToggledReady

	if (
		playersAfterToggledReady.length !== 2 ||
		playersAfterToggledReady.some((p) => p.ready === false)
	) {
		return game
	}

	game.status = EngineChessGameStatus.IN_PROGRESS

	assignRandomColorsForPlayers(playersAfterToggledReady)

	return game
}
export function toggleDrawDesire(
	playerId: string,
	gameId: string,
	desiresDraw: boolean,
): EngineChessGame {
	const game = getGameFromStore(gameId)

	validateGameExists(game)
	validateUserInGame(playerId, game)

	const playersAfterToggledDraw = game.players.map((p) =>
		p.id === playerId ? { ...p, desiresDraw } : p,
	)
	game.players = playersAfterToggledDraw

	if (
		playersAfterToggledDraw.length !== 2 ||
		!playersAfterToggledDraw.every((p) => p.desiresDraw === true)
	) {
		return game
	}

	game.status = EngineChessGameStatus.DRAW

	return game
}
export function playMove(
	playerId: string,
	gameId: string,
	move: string,
): EngineChessGame {
	const game = getGameFromStore(gameId)

	validateGameExists(game)
	validateUserInGame(playerId, game)
	validateGameIsInSpecificState(EngineChessGameStatus.IN_PROGRESS, game)

	const state = fenToState(game.fenString)
	const parsedMove = parseMove(move)

	validatePlayerOwnsMovedPiece(playerId, game, state, parsedMove)

	const newState = playChessMove(move, state)
	game.fenString = stateToFen(newState)

	const possibleMoves = generateMoves(newState)

	if (isEmpty(possibleMoves)) {
		const inCheck = isInCheck(newState)
		if (inCheck) {
			game.status = EngineChessGameStatus.CHECKMATE
		} else {
			game.status = EngineChessGameStatus.STALEMATE
		}
	}

	return game
}
