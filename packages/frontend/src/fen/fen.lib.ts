import { isNil, splitEvery } from 'ramda'
import {
  CastlingAbility,
  Color,
  FenPiece,
  Square,
  SquareIndex
} from './fen.models'
import blackKnight from '../assets/pieces/SHAKKI_MUSTA_RATSU.svg'
import blackKing from '../assets/pieces/SHAKKI_MUSTA_KUNINGAS.svg'
import blackQueen from '../assets/pieces/SHAKKI_MUSTA_KUNINGATAR.svg'
import blackRook from '../assets/pieces/SHAKKI_MUSTA_TORNI.svg'
import blackBishop from '../assets/pieces/SHAKKI_MUSTA_LAHETTI.svg'
import blackPawn from '../assets/pieces/SHAKKI_MUSTA_SOTILAS.svg'
import whiteKnight from '../assets/pieces/SHAKKI_VALKONE_RATSU.svg'
import whiteKing from '../assets/pieces/SHAKKI_VALKONE_KUNINGAS.svg'
import whiteQueen from '../assets/pieces/SHAKKI_VALKONE_KUNINGATAR.svg'
import whiteRook from '../assets/pieces/SHAKKI_VALKONE_TORNI.svg'
import whiteBishop from '../assets/pieces/SHAKKI_VALKONE_LAHETTI.svg'
import whitePawn from '../assets/pieces/SHAKKI_VALKONE_SOTILAS.svg'

const PIECE_TO_IMAGE_MAP: Record<FenPiece, string> = {
  [FenPiece.WhitePawn]: whitePawn,
  [FenPiece.WhiteKnight]: whiteKnight,
  [FenPiece.WhiteBishop]: whiteBishop,
  [FenPiece.WhiteRook]: whiteRook,
  [FenPiece.WhiteQueen]: whiteQueen,
  [FenPiece.WhiteKing]: whiteKing,
  [FenPiece.BlackPawn]: blackPawn,
  [FenPiece.BlackKnight]: blackKnight,
  [FenPiece.BlackBishop]: blackBishop,
  [FenPiece.BlackRook]: blackRook,
  [FenPiece.BlackQueen]: blackQueen,
  [FenPiece.BlackKing]: blackKing
}

export function fenPieceToImageSrc(fenPiece: FenPiece): string {
  return PIECE_TO_IMAGE_MAP[fenPiece]
}

export function fenToChessPiece(fenPiece: FenPiece): FenPiece {
  return fenPiece
}

export function chessPieceToFen(chessPiece: FenPiece): FenPiece {
  return chessPiece
}

export function fenToCastlingAbility(fenCastling: string): CastlingAbility {
  return {
    ['WHITE']: {
      kingSide: fenCastling.includes(FenPiece.WhiteKing),
      queenSide: fenCastling.includes(FenPiece.WhiteQueen)
    },
    ['BLACK']: {
      kingSide: fenCastling.includes(FenPiece.BlackKing),
      queenSide: fenCastling.includes(FenPiece.BlackQueen)
    }
  }
}

export function castlingAbilityToFen(castlingAbility: CastlingAbility): string {
  const fenCastling = []
  if (castlingAbility['WHITE'].kingSide) fenCastling.push(FenPiece.WhiteKing)
  if (castlingAbility['WHITE'].queenSide) fenCastling.push(FenPiece.WhiteQueen)
  if (castlingAbility['BLACK'].kingSide) fenCastling.push(FenPiece.BlackKing)
  if (castlingAbility['BLACK'].queenSide) fenCastling.push(FenPiece.BlackQueen)
  return fenCastling.length > 0 ? fenCastling.join('') : '-'
}

export function fenToEnPassantTargetSquareIndex(fen: string): number | null {
  if (fen === '-') return null
  const [file, rank, ...rest] = fen.split('')
  const parsedFile = parseFile(file)
  const parsedRank = parseRank(rank)
  if (rest.length > 1 || !parsedFile || !parsedRank) return null
  return squareToIndex({ file: parsedFile, rank: parsedRank })
}

export function enPassantTargetSquareIndexToFen(
  squareIndex: number | null
): string {
  if (isNil(squareIndex)) return '-'
  const square = indexToSquare(squareIndex)
  return `${square.file}${square.rank}`
}

export function fenToSideToMove(fen: string): Color {
  if (fen === 'w') return 'WHITE'
  if (fen === 'b') return 'BLACK'

  throw new Error('Invalid color in fenToSideToMove')
}

export function sideToMoveToFen(sideToMove: Color) {
  return sideToMove
}

export function fenToBoard(fen: string): Array<FenPiece | null> {
  const ranks = fen.split('/')

  let board: Array<FenPiece | null> = []

  for (let rankIndex = 8 - 1; rankIndex >= 0; rankIndex--) {
    const rank = ranks[rankIndex]
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

export function boardToFen(board: Array<FenPiece | null>): string {
  const ranks = splitEvery(8, board)

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

export function indexToSquare(index: number): Square {
  const rank = Math.floor(index / 8)
  const file = index % 8
  return { rank, file }
}

export function squareToIndex(square: Square): SquareIndex {
  return square.rank * 8 + square.file
}

export function parseFile(file: string): number | null {
  const fileNumber = file.charCodeAt(0) - 'a'.charCodeAt(0)
  if (fileNumber < 0 || fileNumber > 7) return null
  return fileNumber
}

export function parseRank(rank: string): number | null {
  const parsedRank = parseInt(rank) - 1

  if (parsedRank < 0 || parsedRank > 7) return null
  return parsedRank
}
