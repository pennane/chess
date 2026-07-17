export const FEN_WHITE_PAWN = 'P'
export const FEN_WHITE_KNIGHT = 'N'
export const FEN_WHITE_BISHOP = 'B'
export const FEN_WHITE_ROOK = 'R'
export const FEN_WHITE_QUEEN = 'Q'
export const FEN_WHITE_KING = 'K'
export const FEN_BLACK_PAWN = 'p'
export const FEN_BLACK_KNIGHT = 'n'
export const FEN_BLACK_BISHOP = 'b'
export const FEN_BLACK_ROOK = 'r'
export const FEN_BLACK_QUEEN = 'q'
export const FEN_BLACK_KING = 'k'

export const FEN_PIECES = [
	FEN_WHITE_PAWN,
	FEN_WHITE_KNIGHT,
	FEN_WHITE_BISHOP,
	FEN_WHITE_ROOK,
	FEN_WHITE_QUEEN,
	FEN_WHITE_KING,
	FEN_BLACK_PAWN,
	FEN_BLACK_KNIGHT,
	FEN_BLACK_BISHOP,
	FEN_BLACK_ROOK,
	FEN_BLACK_QUEEN,
	FEN_BLACK_KING,
] as const

export type FenPiece = (typeof FEN_PIECES)[number]
