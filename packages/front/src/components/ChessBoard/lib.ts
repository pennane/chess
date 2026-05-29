import { splitEvery } from 'ramda'
import { BLACK, CHESS_BOARD_SIZE, ChessPiece, Color } from 'chess-core'
import { ChessSquareColor, DARK, LIGHT } from '../../chess/ui.constants'

export function coordinateToSquareColor(
  x: number,
  y: number
): ChessSquareColor {
  return (x + y) % 2 === 0 ? LIGHT : DARK
}

export function parseRanks(
  board: Array<ChessPiece | null>,
  sidePlaying: Color
) {
  const ranks = splitEvery(CHESS_BOARD_SIZE, board)

  if (sidePlaying === BLACK) {
    return ranks.map((rank) => [...rank].reverse())
  }

  return [...ranks].reverse()
}
