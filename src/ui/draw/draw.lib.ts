import {
	BISHOP,
	BLACK,
	KING,
	KNIGHT,
	PAWN,
	QUEEN,
	ROOK,
	WHITE,
} from '../../chess/chess.constants'
import { getPiece, indexToSquare } from '../../chess/chess.lib'
import { ChessPiece, Color, Move, Piece, State } from '../../chess/chess.models'

const PIECE_TO_SYMBOL_MAP: Record<Color, Record<Piece, string>> = {
	[BLACK]: {
		[BISHOP]: '♗',
		[KNIGHT]: '♘',
		[ROOK]: '♖',
		[QUEEN]: '♕',
		[KING]: '♔',
		[PAWN]: '♙',
	},
	[WHITE]: {
		[BISHOP]: '♝',
		[KNIGHT]: '♞',
		[ROOK]: '♜',
		[QUEEN]: '♛',
		[KING]: '♚',
		[PAWN]: '♟',
	},
}

export function pieceToSymbol(piece: ChessPiece | null) {
	return piece ? PIECE_TO_SYMBOL_MAP[piece.color][piece.type] + ' ' : '  '
}

function mapNumberToLetter(num: number): string {
	if (num < 0 || num > 7) {
		throw new Error('Number must be between 0 and 7.')
	}
	return String.fromCharCode(65 + num)
}

export function moveToReadable(state: State, move: Move) {
	const piece = getPiece(move.from, state)
	const from = indexToSquare(move.from)
	const to = indexToSquare(move.to)
	return `${piece?.type}:${mapNumberToLetter(from.file)}${
		from.rank + 1
	}->${mapNumberToLetter(to.file)}${to.rank + 1}${
		move.promotion ? ' (' + move.promotion + ')' : ''
	}`
}
