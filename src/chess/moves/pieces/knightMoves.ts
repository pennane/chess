import { KNIGHT_MOVES } from '../../chess.constants'
import { indexToSquare, isOutOfBounds, squareToIndex } from '../../chess.lib'
import { SquareIndex, State, Move } from '../../chess.models'

export function generateKnightMoves(from: SquareIndex, state: State): Move[] {
	const moves: Move[] = []
	const { rank, file } = indexToSquare(from)

	for (const [deltaRank, deltaFile] of KNIGHT_MOVES) {
		const newRank = rank + deltaRank
		const newFile = file + deltaFile

		if (isOutOfBounds({ file: newFile, rank: newRank })) continue

		const destinationIndex = squareToIndex({ rank: newRank, file: newFile })

		const destinationPiece = state.board[destinationIndex]
		if (destinationPiece?.color === state.sideToMove) continue

		moves.push({
			from: from,
			to: destinationIndex,
		})
	}

	return moves
}
