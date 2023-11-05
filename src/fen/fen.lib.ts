import { CHESS_BOARD_SIZE } from '../chess/chess.constants'
import {
  ChessPiece,
  Color,
  Piece,
  CastlingAbility,
  Square,
  File,
  Board
} from '../chess/chess.models'
import { splitIntoChunks } from '../lib/array'
import { FenPiece } from './fen.models'

export function fenToChessPiece(fenPiece: FenPiece): ChessPiece {
  return {
    color: fenPiece === fenPiece.toLowerCase() ? Color.Black : Color.White,
    piece: fenPiece.toLowerCase() as Piece
  }
}

export function chessPieceToFen(chessPiece: ChessPiece): FenPiece {
  const fenChar = chessPiece.piece
  return (
    chessPiece.color === Color.White ? fenChar.toUpperCase() : fenChar
  ) as FenPiece
}

export function fenToCastlingAbility(fenCastling: string): CastlingAbility {
  return {
    whiteKingSide: fenCastling.includes(FenPiece.WhiteKing),
    whiteQueenSide: fenCastling.includes(FenPiece.WhiteQueen),
    blackKingSide: fenCastling.includes(FenPiece.BlackKing),
    blackQueenSide: fenCastling.includes(FenPiece.BlackQueen)
  }
}

export function castlingAbilityToFen(castlingAbility: CastlingAbility): string {
  const fenCastling = []
  if (castlingAbility.whiteKingSide) fenCastling.push(FenPiece.WhiteKing)
  if (castlingAbility.whiteQueenSide) fenCastling.push(FenPiece.WhiteQueen)
  if (castlingAbility.blackKingSide) fenCastling.push(FenPiece.BlackKing)
  if (castlingAbility.blackQueenSide) fenCastling.push(FenPiece.BlackQueen)
  return fenCastling.length > 0 ? fenCastling.join('') : '-'
}

export function fenToEnPassantTargetSquare(fen: string): Square | null {
  if (fen === '-') return null
  const [file, rank, ...rest] = fen.split('')
  if (rest.length > 1 || !file || !rank) return null
  return { file: file as File, rank: parseInt(rank) }
}

export function enPassantTargetSquareToFen(square: Square | null): string {
  if (!square) return '-'
  return `${square.file}${square.rank}`
}

export function fenToSideToMove(fen: string): Color {
  if (Object.values(Color).includes(fen as Color)) {
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

  for (const rank of ranks) {
    for (const symbol of rank.split('')) {
      if (!isNaN(parseInt(symbol))) {
        board = board.concat(
          Array.from({ length: parseInt(symbol) }, () => null)
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
    fenRanks.push(fenRank)
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
