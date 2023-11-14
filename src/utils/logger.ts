import config from '../config'

function debug(...args: any[]): void {
	if (!config.DEBUG) return
	console.info(...args)
}

function info(...args: any[]): void {
	console.info(...args)
}

const logger = {
	info,
	debug,
}

export default logger
