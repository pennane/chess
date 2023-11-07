import {
  CASTLE_KING_SIDE,
  CASTLE_QUEEN_SIDE,
  KING_MOVES,
  WHITE
} from '../../chess.constants'
import { indexToSquare, isOutOfBounds, squareToIndex } from '../../chess.lib'
import { SquareIndex, State, Move } from '../../chess.models'
import { isUnderAttack } from '../moves.lib'

export function generateKingMoves(from: SquareIndex, state: State): Move[] {
  const moves: Move[] = []
  const { rank, file } = indexToSquare(from)

  for (const [dr, df] of KING_MOVES) {
    const newRank = rank + dr
    const newFile = file + df

    if (isOutOfBounds({ file: newFile, rank: newRank })) continue

    const destinationIndex = squareToIndex({ rank: newRank, file: newFile })

    const destinationPiece = state.board[destinationIndex]
    if (destinationPiece && destinationPiece.color === state.sideToMove)
      continue

    moves.push({
      from: from,
      to: destinationIndex
    })

    if (isUnderAttack(from, state, state.sideToMove, true)) continue

    const canCastleQueenSide = state.castlingAbility[state.sideToMove].queenSide
    const canCastleKingSide = state.castlingAbility[state.sideToMove].kingSide

    if (!canCastleKingSide && !canCastleQueenSide) {
      continue
    }

    if (canCastleKingSide) {
      const kingSideSquares = [
        squareToIndex({ rank, file: file + 1 }),
        squareToIndex({ rank, file: file + 2 })
      ]
      const everyIsClear = kingSideSquares.every(
        (index) => state.board[index] === null
      )
      const everyIsUnContested = kingSideSquares.every(
        (index) => !isUnderAttack(index, state, state.sideToMove, true)
      )

      if (everyIsClear && everyIsUnContested) {
        moves.push({
          from,
          to: squareToIndex({ rank, file: file + 2 }),
          castling: CASTLE_KING_SIDE
        })
      }
    }

    if (canCastleQueenSide) {
      const queenSideSquares = [
        squareToIndex({ rank, file: file - 1 }),
        squareToIndex({ rank, file: file - 2 }),
        squareToIndex({ rank, file: file - 3 })
      ]
      const everyIsClear = queenSideSquares.every(
        (squareIndex) => state.board[squareIndex] === null
      )
      const everyIsUnContested = queenSideSquares
        .slice(0, 2)
        .every((index) => !isUnderAttack(index, state, state.sideToMove, true))

      if (everyIsClear && everyIsUnContested) {
        moves.push({
          from,
          to: squareToIndex({ rank, file: file - 2 }),
          castling: CASTLE_QUEEN_SIDE
        })
      }
    }
  }

  return moves
}
