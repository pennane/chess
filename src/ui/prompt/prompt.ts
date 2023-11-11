import * as readline from 'readline'
import { State, Color } from '../../chess/chess.models'
import { sample } from '../../utils/array'
import { drawState } from '../draw/draw'
import { WHITE } from '../../chess/chess.constants'
import { isEmpty } from '../../utils/fp'
import { generateMoves, playMove } from '../../chess/moves/moves'
import { isInCheck } from '../../chess/moves/moves.lib'
import { moveToReadable } from '../draw/draw.lib'
import logger from '../../utils/logger'

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

export async function playTurnInConsole(state: State, userSide: Color) {
  drawState(state, userSide)
  const possibleMoves = generateMoves(state)

  logger.debug(
    'turn',
    state.sideToMove === WHITE ? 'White' : 'Black',
    'legal moves',
    possibleMoves.map((move) => moveToReadable(state, move)),
    'in check',
    isInCheck(state)
  )

  if (isEmpty(possibleMoves)) {
    const inCheck = isInCheck(state)
    if (inCheck) {
      logger.info(
        state.sideToMove === WHITE
          ? 'Black won with checkmate'
          : 'White won with checkmate'
      )
      return
    }
    logger.info('Stalemate.')
    return
  }

  if (state.sideToMove === userSide) {
    logger.info('Your turn.')
    const playedMove = await getInput('Enter move: (e.g. a3a5)')
    const newState = playMove(playedMove, state)
    return playTurnInConsole(newState, userSide)
  }

  const moves = generateMoves(state)
  const playedMove = sample(moves)
  const newState = playMove(playedMove, state, true)
  return playTurnInConsole(newState, userSide)
}

export async function promptForGameType(): Promise<'w' | 'b' | 'c'> {
  const selectedColor = await getInput(
    'Choose side: (w / b / c) (c for computer vs computer) '
  )

  if (!selectedColor) return promptForGameType()

  const color = selectedColor.toLowerCase()

  if (color === 'w' || color === 'b' || color === 'c') {
    return color
  }

  console.info('Invalid color.')
  return promptForGameType()
}

export async function startComputerOnlyGame(state: State) {
  drawState(state, WHITE)

  const possibleMoves = generateMoves(state)

  logger.debug(
    'turn',
    state.sideToMove === WHITE ? 'White' : 'Black',
    'legal moves',
    possibleMoves.map((move) => moveToReadable(state, move)),
    'in check',
    isInCheck(state)
  )

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

  const move = sample(possibleMoves)
  const newState = playMove(move, state, true)
  setTimeout(() => startComputerOnlyGame(newState), 250)
}
