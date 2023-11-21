import express, { Express } from 'express'
import config from '../../config'
import { ApolloServer } from '@apollo/server'
import session from 'express-session'
import { expressMiddleware } from '@apollo/server/express4'
import { json } from 'body-parser'
import cors from 'cors'

export function createExpressApp() {
	const app = express()

	return app
}

const corsOptions = {
	origin: config.CLIENT_URL,
	credentials: true,
	optionsSuccessStatus: 204,
}

export function registerMiddleware({
	expressApp,
	apolloServer,
}: {
	expressApp: Express
	apolloServer: ApolloServer<any>
}) {
	expressApp.use(cors(corsOptions))
	expressApp.use(
		session({
			secret: config.SESSION_SECRET,
			resave: false,
			saveUninitialized: true,
		}),
	)
	expressApp.use(
		config.GRAPHQL_API_ENDPOINT,
		json(),
		expressMiddleware(apolloServer, {
			context: async (data: any) => {
				return { sessionId: data.req.sessionID }
			},
		}),
	)
}
