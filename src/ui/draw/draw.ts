import { CHESS_BOARD_SIZE, WHITE } from '../../chess/chess.constants'
import { Color, State } from '../../chess/chess.models'
import { stateToFen } from '../../fen/fen'
import { pieceToSymbol } from './draw.lib'

export function drawState(state: State, userSide: Color): void {
  console.info(`\n\n======================================`)
  if (userSide === WHITE) {
    for (let rank = CHESS_BOARD_SIZE - 1; rank >= 0; rank--) {
      console.info('   +---+---+---+---+---+---+---+---+')
      let rankString = `${rank + 1}  | `
      for (let file = 0; file < CHESS_BOARD_SIZE; file++) {
        const piece = state.board[file + rank * CHESS_BOARD_SIZE]
        rankString += pieceToSymbol(piece) + '| '
      }
      console.info(rankString)
    }
    console.info('   +---+---+---+---+---+---+---+---+')
    console.info('     A   B   C   D   E   F   G   H')
  } else {
    for (let rank = 0; rank < CHESS_BOARD_SIZE; rank++) {
      console.info('   +---+---+---+---+---+---+---+---+')
      let rankString = `${rank + 1}  | `
      for (let file = CHESS_BOARD_SIZE - 1; file >= 0; file--) {
        const piece = state.board[file + rank * CHESS_BOARD_SIZE]
        rankString += pieceToSymbol(piece) + '| '
      }
      console.info(rankString)
    }
    console.info('   +---+---+---+---+---+---+---+---+')

    console.info('     H   G   F   E   D   C   B   A')
  }

  console.info(`======================================`)
  console.info(stateToFen(state))
  console.info(`\n`)
}
