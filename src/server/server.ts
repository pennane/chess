import { json } from 'body-parser'
import session from 'express-session'
import { expressMiddleware } from '@apollo/server/express4'
import cors from 'cors'
import { createExpressApp } from './express/express'
import { createApolloServer } from './graphql/graphql'
import { createHttpServer } from './http/http'
import { createWsServer } from './ws/ws'
import config from '../config'

const corsOptions = {
	origin: config.CLIENT_URL,
	credentials: true,
	optionsSuccessStatus: 204,
}

export async function startChessServer() {
	const app = createExpressApp()
	const httpServer = createHttpServer({ app })
	const wsServer = createWsServer({ httpServer })
	const apolloServer = createApolloServer({ httpServer, wsServer })

	await apolloServer.start()

	app.use(cors(corsOptions))
	app.use(
		session({
			secret: config.SESSION_SECRET,
			resave: false,
			saveUninitialized: true,
		}),
	)
	app.use(
		'/graphql',
		json(),
		expressMiddleware(apolloServer, {
			context: async (data: any) => {
				return { sessionId: data.req.sessionID }
			},
		}),
	)

	return new Promise((resolve) =>
		httpServer.listen(config.PORT, () => resolve(true)),
	)
}
