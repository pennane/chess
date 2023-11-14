import { CASTLINGS, COLORS, PIECES, PROMOTABLE_PIECES } from './chess.constants'

export type Castling = (typeof CASTLINGS)[number]

export type CastlingAbility = Record<Color, Record<Castling, boolean>>

export type SquareIndex = number
export type Square = {
	file: number
	rank: number
}

export type Color = (typeof COLORS)[number]
export type Piece = (typeof PIECES)[number]

export type State = {
	board: Array<ChessPiece | null>
	sideToMove: Color
	castlingAbility: CastlingAbility
	enPassantTargetSquareIndex: SquareIndex | null
	halfmoveClock: number
	fullmoveCounter: number
}

export type ChessPiece = {
	color: Color
	type: Piece
}

export type Board = Array<ChessPiece | null>

export type Move = {
	from: SquareIndex
	to: SquareIndex
	promotion?: (typeof PROMOTABLE_PIECES)[number]
	castling?: Castling
}
