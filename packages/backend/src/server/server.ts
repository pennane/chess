import { createExpressApp, registerMiddleware } from './express/express'
import { createApolloServer } from './graphql/graphql'
import { createHttpServer } from './http/http'
import { createWsServer } from './ws/ws'
import config from '../config'

export async function startChessServer() {
	const app = createExpressApp()
	const httpServer = createHttpServer({ app })
	const wsServer = createWsServer({ httpServer })
	const apolloServer = createApolloServer({ httpServer, wsServer })

	await apolloServer.start()

	registerMiddleware({ expressApp: app, apolloServer })

	return new Promise((resolve) =>
		httpServer.listen(config.PORT, () => resolve(true)),
	)
}
