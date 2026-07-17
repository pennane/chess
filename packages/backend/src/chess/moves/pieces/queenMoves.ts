import { QUEEN_DIRECTIONS } from 'chess-core/internal'
import { slidingMovesCreator } from '../slidingMovesCreator'

export const generateQueenMoves = slidingMovesCreator(QUEEN_DIRECTIONS)
