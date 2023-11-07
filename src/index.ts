import { DEFAULT_POSITION } from './chess/chess.constants'

import { fenToState } from './fen/fen'
import { playTurnInPrompt, promptForColor } from './ui/prompt/prompt'

async function start() {
  console.info('CHESS - da bomb')
  const color = await promptForColor()
  const state = fenToState(DEFAULT_POSITION)
  playTurnInPrompt(state, color)
}
start()
