import { assertNever } from '../../utils/assert'
import { PAWN, KNIGHT, BISHOP, ROOK, QUEEN, KING } from '../chess.constants'
import { getPiece, squareToIndex } from '../chess.lib'
import { State, Move, SquareIndex, Square } from '../chess.models'
import { generateBishopMoves } from './pieces/bishopMoves'
import { generateKingMoves } from './pieces/kingMoves'
import { generateKnightMoves } from './pieces/knightMoves'
import { isLegalMove, parseMove, validateMove } from './moves.lib'
import { generatePawnMoves } from './pieces/pawnMoves'
import { generateQueenMoves } from './pieces/queenMoves'
import { generateRookMoves } from './pieces/rookMoves'
import { simulateMove } from './simulate/simulate'

export function generateMovesForSquare(
  state: State,
  square: SquareIndex | Square,
  ignoreKing: boolean = false
): Move[] {
  const squareIndex =
    typeof square === 'number' ? square : squareToIndex(square)

  const piece = getPiece(squareIndex, state)

  if (!piece) return []

  switch (piece.type) {
    case PAWN:
      return generatePawnMoves(squareIndex, state)
    case KNIGHT:
      return generateKnightMoves(squareIndex, state)
    case BISHOP:
      return generateBishopMoves(squareIndex, state)
    case ROOK:
      return generateRookMoves(squareIndex, state)
    case QUEEN:
      return generateQueenMoves(squareIndex, state)
    case KING:
      return ignoreKing ? [] : generateKingMoves(squareIndex, state)
    default:
      assertNever(piece.type)
      return []
  }
}

export function generateMoves(state: State): Move[] {
  const moves: Move[] = []

  for (let squareIndex = 0; squareIndex < state.board.length; squareIndex++) {
    const piece = state.board[squareIndex]
    if (!piece || piece.color !== state.sideToMove) continue
    const newMoves = generateMovesForSquare(state, squareIndex)
    moves.push(...newMoves)
  }

  const legalMoves = moves.filter((move) => isLegalMove(state, move))
  return legalMoves
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
  const validatedMove = validateMove(state, parsedMove)
  if (!validatedMove) return state
  const nextState = simulateMove(state, validatedMove)
  return nextState
}
