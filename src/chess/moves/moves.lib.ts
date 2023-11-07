import { isNil } from '../../utils/fp'
import { BLACK, KING, WHITE } from '../chess.constants'
import {
  parseFile,
  parseRank,
  parsePromotionPiece,
  squareToIndex,
  getPiece
} from '../chess.lib'
import {
  Board,
  ChessPiece,
  Color,
  Move,
  SquareIndex,
  State
} from '../chess.models'
import { generateMovesForSquare } from './moves'
import { simulateMove } from './simulate/simulate'

export function parseMove(move: string): Move | null {
  const fields = move.split('')

  const fromFile = parseFile(fields[0])
  const fromRank = parseRank(fields[1])
  const toFile = parseFile(fields[2])
  const toRank = parseRank(fields[3])
  const promotion = parsePromotionPiece(fields[4])

  if (isNil(fromFile) || isNil(fromRank) || isNil(toFile) || isNil(toRank)) {
    return null
  }

  return {
    from: squareToIndex({ file: fromFile, rank: fromRank }),
    to: squareToIndex({ file: toFile, rank: toRank }),
    promotion
  }
}

export function isLegalMove(state: State, move: Move): boolean {
  const nextState = simulateMove(state, move)
  const kingSquare = findPiecePosition(nextState.board, {
    type: KING,
    color: state.sideToMove
  })
  if (!kingSquare) return false
  return !isUnderAttack(kingSquare, nextState, state.sideToMove)
}

export function findPiecePosition(
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

export function isInCheck(state: State) {
  const kingSquare = findPiecePosition(state.board, {
    type: KING,
    color: state.sideToMove
  })
  if (!kingSquare) return true
  const inCheck = isUnderAttack(kingSquare, state, state.sideToMove)
  return inCheck
}

export function validateMove(state: State, move: Move) {
  const generatedMoves = generateMovesForSquare(state, move.from)
  const validatedMove = generatedMoves.find(
    (m) =>
      move.from === m.from && move.to === m.to && move.promotion === m.promotion
  )
  return validatedMove
}

export function isUnderAttack(
  square: SquareIndex,
  state: State,
  attackedColor: Color,
  ignoreKing: boolean = false
): boolean {
  for (let squareIndex = 0; squareIndex < state.board.length; squareIndex++) {
    const piece = getPiece(squareIndex, state)

    if (!piece || piece.color === attackedColor) continue

    const moves = generateMovesForSquare(
      { ...state, sideToMove: invertColor(attackedColor) },
      squareIndex,
      ignoreKing
    )

    if (moves.some((move) => move.to === square)) {
      return true
    }
  }

  return false
}

export function invertColor(color: Color) {
  return color === WHITE ? BLACK : WHITE
}
