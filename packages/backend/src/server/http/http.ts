import { createServer } from 'http'
import { Express } from 'express'

export function createHttpServer({ app }: { app: Express }) {
	const httpServer = createServer(app)
	return httpServer
}
