import { BISHOP_DIRECTIONS } from 'chess-core/internal'
import { slidingMovesCreator } from '../slidingMovesCreator'

export const generateBishopMoves = slidingMovesCreator(BISHOP_DIRECTIONS)
