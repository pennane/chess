export enum EngineChessColor {
	WHITE = 'WHITE',
	BLACK = 'BLACK',
}
export enum EngineChessGameStatus {
	NOT_STARTED = 'NOT_STARTED',
	IN_PROGRESS = 'IN_PROGRESS',
	DRAW = 'DRAW',
	RESIGNED = 'RESIGNED',
	STALEMATE = 'STALEMATE',
	CHECKMATE = 'CHECKMATE',
	ABANDONED = 'ABANDONED',
}

export type EngineChessPlayer = {
	id: string
	color: EngineChessColor | null
	ready: boolean
	desiresDraw: boolean
}

export type EngineChessGame = {
	id: string
	fenString: string
	players: EngineChessPlayer[]
	status: EngineChessGameStatus
	moveHistory: string[]
}
