import { BLACK, CHESS_BOARD_SIZE, COLORS, WHITE } from '../chess.constants'
import {
	indexToSquare,
	parseFile,
	parseRank,
	squareToIndex,
} from '../chess.lib'
import {
	ChessPiece,
	Color,
	Piece,
	CastlingAbility,
	SquareIndex,
	Board,
} from '../chess.models'
import { splitIntoChunks } from '../../utils/array'
import { isNil } from '../../utils/fp'
import { FenPiece } from './fen.models'

export function fenToChessPiece(fenPiece: FenPiece): ChessPiece {
	return {
		color: fenPiece === fenPiece.toLowerCase() ? BLACK : WHITE,
		type: fenPiece.toLowerCase() as Piece,
	}
}

export function chessPieceToFen(chessPiece: ChessPiece): FenPiece {
	const fenChar = chessPiece.type
	return (
		chessPiece.color === WHITE ? fenChar.toUpperCase() : fenChar
	) as FenPiece
}

export function fenToCastlingAbility(fenCastling: string): CastlingAbility {
	return {
		[WHITE]: {
			kingSide: fenCastling.includes(FenPiece.WhiteKing),
			queenSide: fenCastling.includes(FenPiece.WhiteQueen),
		},
		[BLACK]: {
			kingSide: fenCastling.includes(FenPiece.BlackKing),
			queenSide: fenCastling.includes(FenPiece.BlackQueen),
		},
	}
}

export function castlingAbilityToFen(castlingAbility: CastlingAbility): string {
	const fenCastling = []
	if (castlingAbility[WHITE].kingSide) fenCastling.push(FenPiece.WhiteKing)
	if (castlingAbility[WHITE].queenSide) fenCastling.push(FenPiece.WhiteQueen)
	if (castlingAbility[BLACK].kingSide) fenCastling.push(FenPiece.BlackKing)
	if (castlingAbility[BLACK].queenSide) fenCastling.push(FenPiece.BlackQueen)
	return fenCastling.length > 0 ? fenCastling.join('') : '-'
}

export function fenToEnPassantTargetSquareIndex(
	fen: string,
): SquareIndex | null {
	if (fen === '-') return null
	const [file, rank, ...rest] = fen.split('')
	const parsedFile = parseFile(file)
	const parsedRank = parseRank(rank)
	if (rest.length > 1 || !parsedFile || !parsedRank) return null
	return squareToIndex({ file: parsedFile, rank: parsedRank })
}

export function enPassantTargetSquareIndexToFen(
	squareIndex: SquareIndex | null,
): string {
	if (isNil(squareIndex)) return '-'
	const square = indexToSquare(squareIndex)
	return `${square.file}${square.rank}`
}

export function fenToSideToMove(fen: string): Color {
	if (COLORS.includes(fen as Color)) {
		return fen as Color
	}
	throw new Error('Invalid color in fenToSideToMove')
}

export function sideToMoveToFen(sideToMove: Color) {
	return sideToMove
}

export function fenToBoard(fen: string): Board {
	const ranks = fen.split('/')

	let board: Array<ChessPiece | null> = []

	for (let rankIndex = CHESS_BOARD_SIZE - 1; rankIndex >= 0; rankIndex--) {
		const rank = ranks[rankIndex]
		for (const symbol of rank.split('')) {
			if (!isNaN(parseInt(symbol))) {
				board = board.concat(
					Array.from({ length: parseInt(symbol) }, () => null),
				)
				continue
			}
			board.push(fenToChessPiece(symbol as FenPiece))
		}
	}

	return board
}

export function boardToFen(board: Board): string {
	const ranks = splitIntoChunks(board, CHESS_BOARD_SIZE)

	let fenRanks: string[] = []

	for (const rank of ranks) {
		let fenRank = ''
		let encounteredEmpties = 0
		for (const piece of rank) {
			if (!piece) {
				encounteredEmpties += 1
				continue
			}
			if (encounteredEmpties > 0) {
				fenRank += String(encounteredEmpties)
				encounteredEmpties = 0
			}
			fenRank += chessPieceToFen(piece)
		}
		if (encounteredEmpties > 0) {
			fenRank += String(encounteredEmpties)
		}
		fenRanks = [fenRank].concat(fenRanks)
	}
	return fenRanks.join('/')
}

export function fenToFullmoveCounter(counter: string): number {
	return parseFloat(counter)
}

export function fullmoveCounterToFen(counter: number): string {
	return String(counter)
}

export function fenToHalfmoveClock(counter: string): number {
	return parseFloat(counter)
}

export function halfmoveClockToFen(counter: number): string {
	return String(counter)
}
