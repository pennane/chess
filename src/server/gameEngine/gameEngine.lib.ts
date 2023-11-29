import { INITIAL_CHESS_BOARD_FEN_STRING } from '../../chess/serialization/fen/fen.constants'
import { createId } from '../../utils/uuid'
import {
	EngineChessColor,
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

export function assignRandomColorsForPlayers(players: EngineChessPlayer[]) {
	const firstColor =
		Math.random() > 0.5 ? EngineChessColor.WHITE : EngineChessColor.BLACK

	players[0].color = firstColor

	players[1].color =
		firstColor === EngineChessColor.WHITE
			? EngineChessColor.BLACK
			: EngineChessColor.WHITE
}

export function validateGameExists(
	game: EngineChessGame | undefined,
): asserts game is EngineChessGame {
	if (!game) throw new Error('No game with that id')
}

export function validateUserInGame(playerId: string, game: EngineChessGame) {
	if (game.players.every((p) => p.id !== playerId)) {
		throw new Error('You are not part of the game')
	}
}

export function validateCanJoinGame(playerId: string, game: EngineChessGame) {
	if (game.players.some((p) => p.id === playerId)) {
		throw new Error('You are already part of the game')
	}

	if (game.players.length >= 2) {
		throw new Error('Game is full')
	}
}

export function validateGameIsInSpecificState(
	status: EngineChessGameStatus,
	game: EngineChessGame,
) {
	if (game.status !== status) {
		throw new Error(`Game not in ${status}`)
	}
}
