import fs from 'fs'
import { Server } from 'http'
import { WebSocketServer } from 'ws'
import { ApolloServer } from '@apollo/server'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { useServer } from 'graphql-ws/lib/use/ws'

import { makeExecutableSchema } from '@graphql-tools/schema'
import { getGraphqlResolvers } from './resolvers/root'
import { GraphqlPubSubKey, GraphqlRequestContext } from './graphql.models'
import { PubSub } from 'graphql-subscriptions'
import { EngineChessGame } from '../gameEngine/store/store.models'

export function createApolloServer({
	httpServer,
	wsServer,
}: {
	wsServer: WebSocketServer
	httpServer: Server
}) {
	const typeDefs = fs.readFileSync(`${__dirname}/schema.graphql`, {
		encoding: 'utf-8',
	})

	const resolvers = getGraphqlResolvers()
	const schema = makeExecutableSchema({ typeDefs, resolvers })

	const serverCleanup = useServer({ schema }, wsServer)

	const apolloServer = new ApolloServer<GraphqlRequestContext>({
		schema,
		plugins: [
			ApolloServerPluginDrainHttpServer({ httpServer }),
			{
				async serverWillStart() {
					return {
						async drainServer() {
							await serverCleanup.dispose()
						},
					}
				},
			},
		],
		allowBatchedHttpRequests: true,
	})

	return apolloServer
}

export const pubsub = new PubSub()

export function publishGameStateChange(id: string, state: EngineChessGame) {
	pubsub.publish(`${GraphqlPubSubKey.CHESSS_STATE_CHANGE}:${id}`, {
		chessGameStateChanged: state,
	})
}
