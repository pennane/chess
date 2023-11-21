import { Server } from 'http'
import { WebSocketServer } from 'ws'
import config from '../../config'

export function createWsServer({ httpServer }: { httpServer: Server }) {
	const wsServer = new WebSocketServer({
		server: httpServer,
		path: config.GRAPHQL_API_ENDPOINT,
	})
	return wsServer
}
