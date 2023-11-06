import { CHESS_BOARD_SIZE, WHITE } from '../chess/chess.constants'
import { State } from '../chess/chess.models'
import { stateToFen } from '../fen/fen'
import { pieceToSymbol } from './draw.lib'

export function drawState(state: State): void {
  console.log(`\n\n===================`)
  if (state.sideToMove === WHITE) {
    for (let rank = CHESS_BOARD_SIZE; rank >= 0; rank--) {
      let rankString = ''
      for (let file = 0; file < CHESS_BOARD_SIZE; file++) {
        const piece = state.board[file + rank * CHESS_BOARD_SIZE]
        rankString += pieceToSymbol(piece)
      }
      console.log(rankString)
    }
  } else {
    for (let rank = CHESS_BOARD_SIZE; rank >= 0; rank--) {
      let rankString = ''
      for (let file = 0; file < CHESS_BOARD_SIZE; file++) {
        const piece = state.board[file + rank * CHESS_BOARD_SIZE]
        rankString += pieceToSymbol(piece)
      }
      console.log(rankString)
    }
  }
  console.log(`===================`)
  console.log(stateToFen(state))
  console.log(`\n\n`)
}
