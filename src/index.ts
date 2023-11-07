import { fenToState } from './chess/fen/fen'
import { DEFAULT_POSITION } from './chess/fen/fen.constants'
import {
  playTurnInPrompt,
  promptForColor,
  startComputerOnlyGame
} from './ui/prompt/prompt'

export const DEBUG = false
export const FEN_STRING = DEFAULT_POSITION

async function start() {
  const state = fenToState(FEN_STRING)
  console.info('CHESS - da bomb')
  const color = await promptForColor()
  if (color === 'c') {
    return startComputerOnlyGame(state)
  }

  playTurnInPrompt(state, color)
}
start()
