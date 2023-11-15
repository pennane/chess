import fs from 'fs'
import { Server } from 'http'
import { WebSocketServer } from 'ws'
import { ApolloServer } from '@apollo/server'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { useServer } from 'graphql-ws/lib/use/ws'

import { makeExecutableSchema } from '@graphql-tools/schema'
import { getGraphqlResolvers } from './resolvers/root'
import { GraphlRequestContext } from './graphql.models'

export function createApolloServer({
	httpServer,
	wsServer,
}: {
	wsServer: WebSocketServer
	httpServer: Server
}) {
	const typeDefs = fs.readFileSync('./src/server/graphql/schema.graphql', {
		encoding: 'utf-8',
	})
	const resolvers = getGraphqlResolvers()
	const schema = makeExecutableSchema({ typeDefs, resolvers })

	const serverCleanup = useServer({ schema }, wsServer)

	const apolloServer = new ApolloServer<GraphlRequestContext>({
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