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

function isLegal(state: State, move: Move): boolean {
  const nextState = simulateMove(move, state)
  const kingSquare = findPiecePosition(nextState.board, {
    type: KING,
    color: state.sideToMove
  })
  if (!kingSquare) throw new Error('lol king missing')
  return !isInCheck(kingSquare, nextState)
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
  state: State,
  squareIndex: SquareIndex
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
    const newMoves = generateMovesForSquareIndex(state, squareIndex)
    moves.push(...newMoves)
  }

  const legalMoves = moves.filter((move) => isLegal(state, move))
  return legalMoves
}

export function isInCheck(kingSquare: SquareIndex, state: State): boolean {
  for (let squareIndex = 0; squareIndex < state.board.length; squareIndex++) {
    const piece = getPiece(squareIndex, state)
    if (!piece || piece.color !== state.sideToMove) continue
    const moves = generateMovesForSquareIndex(state, squareIndex)

    if (moves.some((move) => move.to === kingSquare)) {
      return true
    }
  }

  return false
}
