import { BISHOP_DIRECTIONS } from '../../internal/moveTables'
import { slidingMovesCreator } from '../slidingMovesCreator'

export const generateBishopMoves = slidingMovesCreator(BISHOP_DIRECTIONS)
