import { indexToSquare, squareToIndex } from '../chess'
import { KING_MOVES, KNIGHT_MOVES } from '../chess.constants'
import { isOutOfBounds } from '../chess.lib'
import { SquareIndex, State, Move } from '../chess.models'

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
      to: destinationIndex,
      note: 'k'
    })

    // castling
  }

  return moves
}
