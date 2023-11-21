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
import { pubsub } from '../graphql'
import { GraphqlPubSubKey, GraphqlRequestContext } from '../graphql.models'

const root = {
	Query: {
		gameById: (
			_root: any,
			args: { gameId: string },
			_ctx: GraphqlRequestContext,
		) => {
			return getGame(args.gameId)
		},
		currentUserId: (_root: any, _args: any, ctx: GraphqlRequestContext) => {
			return ctx.sessionId
		},
	},
	Mutation: {
		createGame(
			_root: any,
			_args: any,
			ctx: GraphqlRequestContext,
		): EngineChessGame {
			return createGame(ctx.sessionId)
		},
		joinGame(
			_root: any,
			args: { gameId: string },
			ctx: GraphqlRequestContext,
		): EngineChessGame {
			return joinGame(ctx.sessionId, args.gameId)
		},
		leaveGame(
			_root: any,
			args: { gameId: string },
			ctx: GraphqlRequestContext,
		): EngineChessGame {
			return leaveGame(ctx.sessionId, args.gameId)
		},
		resign(
			_root: any,
			args: { gameId: string },
			ctx: GraphqlRequestContext,
		): EngineChessGame {
			return resign(ctx.sessionId, args.gameId)
		},
		toggleReady(
			_root: any,
			args: { gameId: string; ready: boolean },
			ctx: GraphqlRequestContext,
		): EngineChessGame {
			return toggleReady(ctx.sessionId, args.gameId, args.ready)
		},
		toggleDrawDesire(
			_root: any,
			args: { gameId: string; desireDraw: boolean },
			ctx: GraphqlRequestContext,
		): EngineChessGame {
			return toggleDrawDesire(ctx.sessionId, args.gameId, args.desireDraw)
		},
		playMove(
			_root: any,
			args: { gameId: string; move: string },
			ctx: GraphqlRequestContext,
		): EngineChessGame {
			return playMove(ctx.sessionId, args.gameId, args.move)
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
