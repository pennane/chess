import { assertNever } from '../../utils/assert'
import {
  WHITE,
  PAWN,
  KNIGHT,
  BISHOP,
  ROOK,
  QUEEN,
  KING,
  BLACK
} from '../chess.constants'
import { getPiece } from '../chess.lib'
import {
  State,
  Move,
  SquareIndex,
  ChessPiece,
  Board,
  Color
} from '../chess.models'
import { generateBishopMoves } from './bishopMoves'
import { generateKingMoves } from './kingMoves'
import { generateKnightMoves } from './knightMoves'
import { generatePawnMoves } from './pawnMoves'
import { generateQueenMoves } from './queenMoves'
import { generateRookMoves } from './rookMoves'

function resultsInCheck(
  kingSquare: SquareIndex,
  move: Move,
  state: State
): boolean {
  const nextState = simulateMove(move, state)

  return isInCheck(kingSquare, nextState)
}

function filterOutIllegalMoves(
  kingSquare: SquareIndex,
  moves: Move[],
  state: State
): Move[] {
  return moves.filter((move) => !resultsInCheck(kingSquare, move, state))
}

export function simulateMove(move: Move, state: State): State {
  const newState = structuredClone(state)
  newState.board[move.to] = newState.board[move.from]
  newState.board[move.from] = null

  newState.sideToMove = newState.sideToMove === WHITE ? BLACK : WHITE

  return newState
}

function findPiecePosition(
  board: Board,
  targetPiece: ChessPiece
): SquareIndex | null {
  for (let i = 0; i < board.length; i++) {
    const piece = board[i]
    if (
      piece &&
      piece.type === targetPiece.type &&
      piece.color === targetPiece.color
    ) {
      return i
    }
  }
  return null
}

export function generateMovesForSquareIndex(
  squareIndex: SquareIndex,
  state: State
): Move[] {
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
      return generateKingMoves(squareIndex, state)
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
    const newMoves = generateMovesForSquareIndex(squareIndex, state)
    moves.push(...newMoves)
  }

  const kingPosition = findPiecePosition(state.board, {
    type: KING,
    color: state.sideToMove
  })
  if (!kingPosition) throw new Error('Lol king is missing?')
  // const legalMoves = filterOutIllegalMoves(kingPosition, moves, state)

  return moves
}

export function isInCheck(kingSquare: SquareIndex, state: State): boolean {
  for (let squareIndex = 0; squareIndex < state.board.length; squareIndex++) {
    const piece = getPiece(squareIndex, state)
    if (!piece || piece.color === state.sideToMove) continue
    const moves = generateMovesForSquareIndex(squareIndex, state)

    if (moves.some((move) => move.to === kingSquare)) {
      return true
    }
  }

  return false
}
