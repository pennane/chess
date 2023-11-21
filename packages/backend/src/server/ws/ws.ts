import { Server } from 'http'
import { WebSocketServer } from 'ws'

export function createWsServer({ httpServer }: { httpServer: Server }) {
	const wsServer = new WebSocketServer({
		server: httpServer,
		path: '/graphql',
	})
	return wsServer
}
