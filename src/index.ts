import { DEFAULT_POSITION } from './chess/chess.constants'
import { State } from './chess/chess.models'
import { generateMoves, simulateMove } from './chess/moves/moves'
import { drawState } from './draw/draw'

import { fenToState } from './fen/fen'
import { sample } from './utils/array'

const state = fenToState(DEFAULT_POSITION)

const wait = async (ms: number) =>
  new Promise((resolve) => setTimeout(() => resolve(true), ms))

const dumbGeneration = async (currentState: State) => {
  const moves = generateMoves(currentState)
  drawState(currentState)
  if (moves.length === 0) return console.log('no legal moves')
  await wait(500)
  const move = sample(moves)
  const newState = simulateMove(move, currentState)

  await dumbGeneration(newState)
}

dumbGeneration(state)
