import { CHESS_BOARD_SIZE, WHITE } from '../../chess/chess.constants'
import { Color, State } from '../../chess/chess.models'
import { stateToFen } from '../../fen/fen'
import { pieceToSymbol } from './draw.lib'

export function drawState(state: State, userSide: Color): void {
  console.clear()
  console.log(`\n\n===================`)
  if (userSide === WHITE) {
    for (let rank = CHESS_BOARD_SIZE - 1; rank >= 0; rank--) {
      let rankString = `${rank + 1}  `
      for (let file = 0; file < CHESS_BOARD_SIZE; file++) {
        const piece = state.board[file + rank * CHESS_BOARD_SIZE]
        rankString += pieceToSymbol(piece)
      }
      console.log(rankString)
    }
    console.log('   A B C D E F G H')
  } else {
    for (let rank = 0; rank < CHESS_BOARD_SIZE; rank++) {
      let rankString = `${rank + 1}  `
      for (let file = 0; file < CHESS_BOARD_SIZE; file++) {
        const piece = state.board[file + rank * CHESS_BOARD_SIZE]
        rankString += pieceToSymbol(piece)
      }
      console.log(rankString)
    }
    console.log('   H G F E D C B A')
  }

  console.log(`===================`)
  console.log(stateToFen(state))
  console.log(`\n`)
}
