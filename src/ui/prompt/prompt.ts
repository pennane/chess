import * as readline from 'readline'
import { State, Color } from '../../chess/chess.models'
import { sample } from '../../utils/array'
import { drawState } from '../draw/draw'
import { COLORS, WHITE } from '../../chess/chess.constants'
import { isEmpty } from '../../utils/fp'
import { generateMoves, playMove } from '../../chess/moves/moves'
import { isInCheck } from '../../chess/moves/moves.lib'
import { moveToReadable } from '../draw/draw.lib'
import { DEBUG } from '../..'

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
  const possibleMoves = generateMoves(state)
  DEBUG && console.log(possibleMoves.map((move) => moveToReadable(state, move)))
  if (isEmpty(possibleMoves)) {
    const inCheck = isInCheck(state)
    if (inCheck) {
      console.info(
        state.sideToMove === WHITE
          ? 'Black won with checkmate'
          : 'White won with checkmate'
      )
      return
    }
    console.info('Stalemate.')
    return
  }

  if (state.sideToMove === userSide) {
    console.info('Your turn.')
    const playedMove = await getInput('Enter move: (e.g. a3a5)')
    const newState = playMove(playedMove, state)
    return playTurnInPrompt(newState, userSide)
  }

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

export async function startComputerOnlyGame(state: State) {
  drawState(state, WHITE)
  const possibleMoves = generateMoves(state)
  const move = sample(possibleMoves)
  const newState = playMove(move, state)
  setTimeout(() => startComputerOnlyGame(newState), 250)
}
