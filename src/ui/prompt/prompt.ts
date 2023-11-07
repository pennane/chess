import * as readline from 'readline'
import { playMove } from '../../chess/chess'
import { State, Color } from '../../chess/chess.models'
import { generateMoves } from '../../chess/moves/moves'
import { sample } from '../../utils/array'
import { drawState } from '../draw/draw'
import { wait } from '../../utils/promise'
import { COLORS } from '../../chess/chess.constants'

export async function getInput(prompt: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  return new Promise<string>((resolve) => {
    rl.question(prompt, (input) => {
      rl.close()
      resolve(input)
    })
  })
}

export async function playTurnInPrompt(state: State, userSide: Color) {
  drawState(state, userSide)
  if (state.sideToMove === userSide) {
    console.info('Your turn.')
    const playedMove = await getInput('Enter move: (e.g. a3a5)')
    const newState = playMove(playedMove, state)
    await wait(300)
    return playTurnInPrompt(newState, userSide)
  }

  await wait(600)
  const moves = generateMoves(state)
  const playedMove = sample(moves)
  const newState = playMove(playedMove, state)
  return playTurnInPrompt(newState, userSide)
}

export async function promptForColor(): Promise<Color> {
  const selectedColor = await getInput(
    'Choose what you want to play as: (w/b) '
  )
  if (selectedColor && COLORS.includes(selectedColor.toLowerCase() as Color)) {
    return selectedColor.toLowerCase() as Color
  }
  console.info('Invalid color.')
  return promptForColor()
}
