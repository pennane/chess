import {
	createGame,
	getGame,
	joinGame,
	leaveGame,
	playMove,
	resign,
	toggleDrawDesire,
	toggleReady,
} from '../../gameEngine/gameEngine'
import { EngineChessGame } from '../../gameEngine/store/store.models'
import { publishGameStateChange, pubsub } from '../graphql'
import { GraphqlPubSubKey, GraphqlRequestContext } from '../graphql.models'

const root = {
	Query: {
		gameById: (
			_root: any,
			args: { gameId: string },
			_ctx: GraphqlRequestContext,
		) => {
			const game = getGame(args.gameId)
			return game
		},
	},
	Mutation: {
		createGame(
			_root: any,
			_args: any,
			ctx: GraphqlRequestContext,
		): EngineChessGame {
			const game = createGame(ctx.sessionId)
			return game
		},
		joinGame(
			_root: any,
			args: { gameId: string },
			ctx: GraphqlRequestContext,
		): EngineChessGame {
			const game = joinGame(ctx.sessionId, args.gameId)
			publishGameStateChange(game.id, game)
			return game
		},
		leaveGame(
			_root: any,
			args: { gameId: string },
			ctx: GraphqlRequestContext,
		): EngineChessGame {
			const game = leaveGame(ctx.sessionId, args.gameId)
			publishGameStateChange(game.id, game)
			return game
		},
		resign(
			_root: any,
			args: { gameId: string },
			ctx: GraphqlRequestContext,
		): EngineChessGame {
			const game = resign(ctx.sessionId, args.gameId)
			publishGameStateChange(game.id, game)
			return game
		},
		toggleReady(
			_root: any,
			args: { gameId: string; ready: boolean },
			ctx: GraphqlRequestContext,
		): EngineChessGame {
			const game = toggleReady(ctx.sessionId, args.gameId, args.ready)
			publishGameStateChange(game.id, game)
			return game
		},
		toggleDrawDesire(
			_root: any,
			args: { gameId: string; desireDraw: boolean },
			ctx: GraphqlRequestContext,
		): EngineChessGame {
			const game = toggleDrawDesire(
				ctx.sessionId,
				args.gameId,
				args.desireDraw,
			)
			publishGameStateChange(game.id, game)
			return game
		},
		playMove(
			_root: any,
			args: { gameId: string; move: string },
			ctx: GraphqlRequestContext,
		): EngineChessGame {
			const game = playMove(ctx.sessionId, args.gameId, args.move)
			publishGameStateChange(game.id, game)
			return game
		},
	},
	Subscription: {
		chessGameStateChanged: {
			subscribe: (
				_root: any,
				args: { gameId: string },
				_ctx: GraphqlRequestContext,
			) =>
				pubsub.asyncIterator([
					`${GraphqlPubSubKey.CHESSS_STATE_CHANGE}:${args.gameId}`,
				]),
		},
	},
}

export function getGraphqlResolvers() {
	return root
}
