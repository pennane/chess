import {
  getPiece,
  parseFile,
  parsePromotionPiece,
  parseRank,
  squareToIndex
} from './chess.lib'
import { Move, Square, SquareIndex, State } from './chess.models'
import { generateMoves, simulateMove } from './moves/moves'

function parseMove(move: string): Move | null {
  const fields = move.split('')

  const fromFile = parseFile(fields[0])
  const fromRank = parseRank(fields[1])
  const toFile = parseFile(fields[2])
  const toRank = parseRank(fields[3])
  const promotion = parsePromotionPiece(fields[4])

  if (!fromFile || !fromRank || !toFile || !toRank) return null

  return {
    from: squareToIndex({ file: fromFile, rank: fromRank }),
    to: squareToIndex({ file: toFile, rank: toRank }),
    promotion
  }
}

/**
 * Uses Pure coordinate notation
 * <from square><to square>[<promoted to>]
 * e.g. b2b4
 *
 * and when promoting
 * b7b8q
 */
export function playMove(playedMove: string | Move, state: State): State {
  const parsedMove =
    typeof playedMove === 'string' ? parseMove(playedMove) : playedMove
  if (!parsedMove) return state
  const generatedMoves = generateMoves(state)
  const matchedMove = generatedMoves.find(
    (move) =>
      move.from === parsedMove.from &&
      move.to === parsedMove.to &&
      move.promotion === parsedMove.promotion
  )

  if (!matchedMove) return state
  const nextState = simulateMove(matchedMove, state)
  return nextState
}
