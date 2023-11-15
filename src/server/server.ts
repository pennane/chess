import { json } from 'body-parser'
import session from 'express-session'
import { expressMiddleware } from '@apollo/server/express4'
import cors from 'cors'
import { createExpressApp } from './express/express'
import { createApolloServer } from './graphql/graphql'
import { createHttpServer } from './http/http'
import { createWsServer } from './ws/ws'

const corsOptions = {
	origin: 'http://localhost:5173',
	credentials: true,
	optionsSuccessStatus: 204,
}

export async function startChessServer() {
	const app = createExpressApp()
	const httpServer = createHttpServer({ app })
	const wsServer = createWsServer({ httpServer })
	const apolloServer = createApolloServer({ httpServer, wsServer })

	await apolloServer.start()

	// ehkä pitää lisää app.set('trust proxy', 1) ennenku tän siirtää frankfurttii

	app.use(
		session({
			secret: 'keyboard cat',
			resave: false,
			saveUninitialized: true,
			cookie: { secure: true },
		}),
	)
	app.use(
		'/graphql',
		cors<cors.CorsRequest>(corsOptions),
		json(),
		expressMiddleware(apolloServer),
	)

	return new Promise((resolve) =>
		httpServer.listen(3000, () => resolve(true)),
	)
}
