import { indexToSquare, squareToIndex } from './chess'
import { CHESS_BOARD_SIZE } from './chess.constants'
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
