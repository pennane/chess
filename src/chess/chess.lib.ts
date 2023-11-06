import { CHESS_BOARD_SIZE, PROMOTABLE_PIECES } from './chess.constants'
import { ChessPiece, Square, SquareIndex, State } from './chess.models'

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

export function parsePromotionPiece(
  piece: string
): (typeof PROMOTABLE_PIECES)[number] | undefined {
  if (!piece) return undefined
  if (PROMOTABLE_PIECES.includes(piece.toLowerCase() as any)) {
    return piece.toLowerCase() as any
  }
  return undefined
}

export function getPiece(
  square: Square | SquareIndex,
  state: State
): ChessPiece | null {
  if (
    isOutOfBounds(typeof square === 'number' ? indexToSquare(square) : square)
  ) {
    return null
  }

  return state.board[
    typeof square === 'number' ? square : squareToIndex(square)
  ]
}

export function getPieceFromSquare(
  square: Square,
  state: State
): ChessPiece | null {
  return getPiece(squareToIndex(square), state)
}

export function isOutOfBounds(square: Square) {
  if (square.file < 0 || square.file >= CHESS_BOARD_SIZE) return true
  if (square.rank < 0 || square.rank >= CHESS_BOARD_SIZE) return true
  return false
}

export function indexToSquare(index: number): Square {
  const rank = Math.floor(index / CHESS_BOARD_SIZE)
  const file = index % CHESS_BOARD_SIZE
  return { rank, file }
}

export function squareToIndex(square: Square): SquareIndex {
  return square.rank * CHESS_BOARD_SIZE + square.file
}
