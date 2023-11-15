import { startPublishingTestPings } from './server/graphql/graphql'
import { startChessServer } from './server/server'
import logger from './utils/logger'

startChessServer()
	.then(() => {
		logger.info('server started')
		startPublishingTestPings()
	})
	.catch(logger.error)
