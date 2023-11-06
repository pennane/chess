import { assertNever } from '../utils/assert'
import {
  BISHOP,
  CHESS_BOARD_SIZE,
  KING,
  KNIGHT,
  PAWN,
  QUEEN,
  ROOK
} from './chess.constants'

import { getPiece, parseFile, parseRank } from './chess.lib'
import { Move, Square, SquareIndex, State } from './chess.models'

export function indexToSquare(index: number): Square {
  const rank = Math.floor(index / CHESS_BOARD_SIZE)
  const file = index % CHESS_BOARD_SIZE
  return { rank, file }
}

export function squareToIndex(square: Square): SquareIndex {
  return square.rank * CHESS_BOARD_SIZE + square.file
}

function parseMove(move: string): Move | null {
  const fields = move.split('')
  const fromFile = parseFile(fields[0])
  const fromRank = parseRank(fields[1])
  const toFile = parseFile(fields[2])
  const toRank = parseRank(fields[3])

  if (!fromFile || !fromRank || !toFile || !toRank) return null

  return {
    from: squareToIndex({ file: fromFile, rank: fromRank }),
    to: squareToIndex({ file: toFile, rank: toRank })
  }
}

function move(move: Move, state: State): State {
  const piece = getPiece(move.from, state)
  if (!piece) return state
  switch (piece.type) {
    case BISHOP: {
      return state
    }
    case ROOK: {
      return state
    }
    case KNIGHT: {
      return state
    }
    case KING: {
      return state
    }
    case PAWN: {
      return state
    }
    case QUEEN: {
      return state
    }
    default: {
      assertNever(piece.type)
      return state
    }
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
export function playMove(notation: string, state: State): State {
  const parsedMove = parseMove(notation)
  if (!parsedMove) return state
  return move(parsedMove, state)
}
