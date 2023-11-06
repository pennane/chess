import { DEFAULT_POSITION } from './chess/chess.constants'

import { fenToState } from './fen/fen'
import { playTurnInPrompt, promptForColor } from './ui/prompt/prompt'
import { wait } from './utils/promise'

async function start() {
  await wait(500)
  console.log('CHESS - da bomb')
  await wait(500)
  const color = await promptForColor()
  const state = fenToState(DEFAULT_POSITION)
  playTurnInPrompt(state, color)
}
start()
