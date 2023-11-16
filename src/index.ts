import { startChessServer } from './server/server'
import logger from './utils/logger'

startChessServer()
	.then(() => {
		logger.info('server started')
	})
	.catch(logger.error)
