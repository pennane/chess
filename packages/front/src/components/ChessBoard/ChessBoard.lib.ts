import { splitEvery } from 'ramda'
import {
  BLACK,
  CHESS_BOARD_SIZE,
  DARK,
  LIGHT
} from '../../chess/chess.constants'
import {
  TChessBoard,
  TChessPieceColor,
  TChessSquareColor
} from '../../chess/chess.models'

export function coordinateToSquareColor(
  x: number,
  y: number
): TChessSquareColor {
  return (x + y) % 2 === 0 ? LIGHT : DARK
}

export function parseRanks(board: TChessBoard, sidePlaying: TChessPieceColor) {
  const ranks = splitEvery(CHESS_BOARD_SIZE, board)

  if (sidePlaying === BLACK) {
    return ranks.map((rank) => [...rank].reverse())
  }

  return [...ranks].reverse()
}
