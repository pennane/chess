import { assertNever } from '../../utils/assert'
import { indexToSquare, squareToIndex } from '../chess'
import {
  WHITE,
  PAWN,
  KNIGHT,
  BISHOP,
  ROOK,
  QUEEN,
  KING,
  BLACK,
  FILE_A,
  FILE_H,
  CASTLE_KING_SIDE,
  CASTLE_QUEEN_SIDE,
  CASTLING_SQUARES
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
  return !isSquareUnderAttack(kingSquare, nextState)
}

export function simulateMove(move: Move, state: State): State {
  const clonedState = structuredClone(state)

  const sideToMove = clonedState.sideToMove
  const opponentSide = sideToMove === WHITE ? BLACK : WHITE

  const fromSquare = indexToSquare(move.from)
  const toSquare = indexToSquare(move.to)

  const movedPiece = getPiece(move.from, clonedState)!
  const targetPiece = getPiece(move.to, clonedState)

  if (movedPiece.type === KING) {
    clonedState.castlingAbility[sideToMove].kingSide = false
    clonedState.castlingAbility[sideToMove].queenSide = false
  }

  if (movedPiece.type === ROOK && fromSquare.file === FILE_A) {
    clonedState.castlingAbility[sideToMove].queenSide = false
  }

  if (movedPiece.type === ROOK && fromSquare.file === FILE_H) {
    clonedState.castlingAbility[sideToMove].kingSide = false
  }

  const opponentCanCastleKingSide =
    clonedState.castlingAbility[opponentSide].kingSide
  const opponentCanCastleQueenSide =
    clonedState.castlingAbility[opponentSide].queenSide

  if (
    opponentCanCastleQueenSide &&
    targetPiece?.type === ROOK &&
    toSquare.file === FILE_A
  ) {
    clonedState.castlingAbility[opponentSide].queenSide = false
  }

  if (
    opponentCanCastleKingSide &&
    targetPiece?.type === ROOK &&
    toSquare.file === FILE_H
  ) {
    clonedState.castlingAbility[opponentSide].kingSide = false
  }

  clonedState.sideToMove = clonedState.sideToMove === WHITE ? BLACK : WHITE
  clonedState.fullmoveCounter += 1

  if (move.castling === CASTLE_KING_SIDE) {
    const temp =
      clonedState.board[
        squareToIndex(CASTLING_SQUARES[sideToMove].kingSide[KING])
      ]
    clonedState.board[
      squareToIndex(CASTLING_SQUARES[sideToMove].kingSide[KING])
    ] =
      clonedState.board[
        squareToIndex(CASTLING_SQUARES[sideToMove].kingSide[ROOK])
      ]
    clonedState.board[
      squareToIndex(CASTLING_SQUARES[sideToMove].kingSide[ROOK])
    ] = temp
    return clonedState
  }

  if (move.castling === CASTLE_QUEEN_SIDE) {
    const temp =
      clonedState.board[
        squareToIndex(CASTLING_SQUARES[sideToMove].queenSide[KING])
      ]
    clonedState.board[
      squareToIndex(CASTLING_SQUARES[sideToMove].queenSide[KING])
    ] =
      clonedState.board[
        squareToIndex(CASTLING_SQUARES[sideToMove].queenSide[ROOK])
      ]
    clonedState.board[
      squareToIndex(CASTLING_SQUARES[sideToMove].queenSide[ROOK])
    ] = temp
    return clonedState
  }

  clonedState.board[move.to] = clonedState.board[move.from]
  clonedState.board[move.from] = null

  if (move.promotion) {
    clonedState.board[move.to] = { color: sideToMove, type: move.promotion }
  }

  return clonedState
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
  squareIndex: SquareIndex,
  ignoreKing: boolean = false
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
    const newMoves = generateMovesForSquareIndex(state, squareIndex)
    moves.push(...newMoves)
  }

  const legalMoves = moves.filter((move) => isLegal(state, move))
  return legalMoves
}

export function isSquareUnderAttack(
  square: SquareIndex,
  state: State
): boolean {
  const targetPiece = getPiece(square, state)
  const isKingTargeted = targetPiece?.type === KING

  for (let squareIndex = 0; squareIndex < state.board.length; squareIndex++) {
    const piece = getPiece(squareIndex, state)

    if (!piece || piece.color !== state.sideToMove) continue

    const moves = generateMovesForSquareIndex(
      state,
      squareIndex,
      isKingTargeted
    )

    if (moves.some((move) => move.to === square)) {
      return true
    }
  }

  return false
}
