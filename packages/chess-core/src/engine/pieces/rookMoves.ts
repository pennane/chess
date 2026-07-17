import { ROOK_DIRECTIONS } from '../../internal/moveTables'
import { slidingMovesCreator } from '../slidingMovesCreator'

export const generateRookMoves = slidingMovesCreator(ROOK_DIRECTIONS)
