export const KNIGHT_MOVES = [
	[2, 1],
	[1, 2],
	[-1, 2],
	[-2, 1],
	[-2, -1],
	[-1, -2],
	[1, -2],
	[2, -1],
]

export const KING_MOVES = [
	[1, 0],
	[1, 1],
	[0, 1],
	[-1, 1],
	[-1, 0],
	[-1, -1],
	[0, -1],
	[1, -1],
]

export const ROOK_DIRECTIONS = [
	[1, 0],
	[0, 1],
	[-1, 0],
	[0, -1],
]

export const BISHOP_DIRECTIONS = [
	[1, 1],
	[-1, 1],
	[-1, -1],
	[1, -1],
]

export const QUEEN_DIRECTIONS = ROOK_DIRECTIONS.concat(BISHOP_DIRECTIONS)
