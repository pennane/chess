import { QUEEN_DIRECTIONS } from '../../internal/moveTables'
import { slidingMovesCreator } from '../slidingMovesCreator'

export const generateQueenMoves = slidingMovesCreator(QUEEN_DIRECTIONS)
