import { fenToState } from './chess/fen/fen'
import { DEFAULT_POSITION } from './chess/fen/fen.constants'
import { playTurnInPrompt, promptForColor } from './ui/prompt/prompt'

export const DEBUG = false
export const FEN_STRING = DEFAULT_POSITION

async function start() {
  console.info('CHESS - da bomb')
  const color = await promptForColor()
  const state = fenToState(FEN_STRING)
  playTurnInPrompt(state, color)
}
start()

// startComputerOnlyGame(
//   fenToState(
//     DEFAULT_POSITION
//   )
// )
