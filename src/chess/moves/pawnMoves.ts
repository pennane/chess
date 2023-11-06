import { indexToSquare, squareToIndex } from '../chess'
import {
  WHITE,
  RANK_2,
  RANK_7,
  CHESS_BOARD_SIZE,
  RANK_1,
  RANK_8,
  PROMOTABLE_PIECES
} from '../chess.constants'
import { getPiece, isOutOfBounds } from '../chess.lib'
import { SquareIndex, State, Move, Square } from '../chess.models'

export function generatePawnMoves(from: SquareIndex, state: State): Move[] {
  const moves: Move[] = []
  const { rank, file } = indexToSquare(from)

  const direction = state.sideToMove === WHITE ? 1 : -1
  const pawnStartingRank = state.sideToMove === WHITE ? RANK_2 : RANK_7
  const pawnEndingRank = state.sideToMove === WHITE ? RANK_8 : RANK_1

  // Move forward by one
  const squareOneForward: Square = { file, rank: rank + 1 * direction }
  const pieceOneForward = getPiece(squareOneForward, state)
  if (
    !pieceOneForward &&
    squareOneForward.rank !== pawnEndingRank &&
    !isOutOfBounds(squareOneForward)
  ) {
    moves.push({
      from: from,
      to: squareToIndex(squareOneForward)
    })
  }

  // Move forward by two
  const squareTwoForward: Square = { file, rank: rank + 2 * direction }
  const pieceTwoForward = getPiece(squareTwoForward, state)
  if (rank === pawnStartingRank && !pieceOneForward && !pieceTwoForward) {
    moves.push({
      from: from,
      to: squareToIndex(squareTwoForward)
    })
  }

  // Capture left
  const squareOneForwardOneLeft: Square = {
    file: squareOneForward.file - 1,
    rank: squareOneForward.rank
  }
  const pieceOneForwardOneLeft = getPiece(squareOneForwardOneLeft, state)
  if (
    pieceOneForwardOneLeft &&
    pieceOneForwardOneLeft.color !== state.sideToMove &&
    !isOutOfBounds(squareOneForward)
  ) {
    moves.push({
      from: from,
      to: squareToIndex(squareOneForwardOneLeft)
    })
  }

  // Capture right
  const squareOneForwardOneRight: Square = {
    file: squareOneForward.file + 1,
    rank: squareOneForward.rank
  }
  const pieceOneForwardOneRight = getPiece(squareOneForwardOneRight, state)
  if (
    pieceOneForwardOneRight &&
    pieceOneForwardOneRight.color !== state.sideToMove &&
    !isOutOfBounds(squareOneForwardOneRight)
  ) {
    moves.push({
      from: from,
      to: squareToIndex(squareOneForwardOneRight)
    })
  }

  // En Passant
  if (state.enPassantTargetSquareIndex) {
    const enPassantPiece = getPiece(state.enPassantTargetSquareIndex, state)
    if (enPassantPiece?.color !== state.sideToMove) {
      moves.push({
        from: from,
        to: state.enPassantTargetSquareIndex
      })
    }
  }

  // Promotion
  if (!pieceOneForward && squareOneForward.rank === pawnEndingRank) {
    for (const promotion of PROMOTABLE_PIECES) {
      moves.push({
        from: from,
        to: squareToIndex(squareOneForward),
        promotion
      })
    }
  }

  return moves
}
