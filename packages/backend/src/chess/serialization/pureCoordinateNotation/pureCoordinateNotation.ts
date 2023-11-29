import { isNil } from 'ramda'
import { Move } from '../../chess.models'
import { squareToIndex } from '../../chess.lib'
import {
	parseFile,
	parseRank,
	parsePromotionPiece,
} from './pureCoordinateNotation.lib'

/**
 * Uses Pure coordinate notation
 *
 * https://www.chessprogramming.org/Algebraic_Chess_Notation
 *
 * <from square><to square>[<promoted to>]
 * e.g. b2b4
 *
 * and when promoting
 * b7b8q
 */
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
		promotion,
	}
}
