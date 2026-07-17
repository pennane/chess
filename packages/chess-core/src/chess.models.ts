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

export type ChessPiece = {
	readonly color: Color
	readonly type: Piece
}

export type Board = Array<ChessPiece | null>

export type State = {
	board: Board
	sideToMove: Color
	castlingAbility: CastlingAbility
	enPassantTargetSquareIndex: SquareIndex | null
	halfmoveClock: number
	fullmoveCounter: number
}

export type PromotablePiece = (typeof PROMOTABLE_PIECES)[number]

type BaseMove = {
	readonly from: SquareIndex
	readonly to: SquareIndex
}

export type NormalMove = BaseMove & { readonly kind: 'normal' }
export type PromotionMove = BaseMove & {
	readonly kind: 'promotion'
	readonly promotion: PromotablePiece
}
export type CastleMove = BaseMove & {
	readonly kind: 'castle'
	readonly castling: Castling
}

export type Move = NormalMove | PromotionMove | CastleMove
