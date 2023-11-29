import config from '../config'

function debug(...args: any[]): void {
	if (!config.DEBUG) return
	console.info(...args)
}

function info(...args: any[]): void {
	console.info(...args)
}

function error(...args: any[]): void {
	console.error(args)
}

const logger = {
	info,
	debug,
	error,
}

export default logger
