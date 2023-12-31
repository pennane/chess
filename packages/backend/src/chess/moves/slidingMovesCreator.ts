import {
	getPiece,
	indexToSquare,
	isOutOfBounds,
	squareToIndex,
} from '../chess.lib'
import { SquareIndex, State, Move } from '../chess.models'

export const slidingMovesCreator =
	(directions: number[][]) =>
	(from: SquareIndex, state: State): Move[] => {
		const moves: Move[] = []
		const { rank, file } = indexToSquare(from)

		for (const [deltaRank, deltaFile] of directions) {
			let currentRank = rank
			let currentFile = file
			while (true) {
				currentRank += deltaRank
				currentFile += deltaFile

				if (isOutOfBounds({ file: currentFile, rank: currentRank })) {
					break
				}

				const destination = squareToIndex({
					rank: currentRank,
					file: currentFile,
				})

				const destinationPiece = getPiece(destination, state)

				if (!destinationPiece) {
					moves.push({ from: from, to: destination })
					continue
				}

				if (destinationPiece.color === state.sideToMove) break

				moves.push({ from: from, to: destination })
				break
			}
		}

		return moves
	}
