import { ROOK_DIRECTIONS } from 'chess-core/internal'
import { slidingMovesCreator } from '../slidingMovesCreator'

export const generateRookMoves = slidingMovesCreator(ROOK_DIRECTIONS)
