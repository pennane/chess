import { BISHOP_DIRECTIONS } from '../chess.constants'
import { slidingMovesCreator } from './slidingMovesCreator'

export const generateBishopMoves = slidingMovesCreator(BISHOP_DIRECTIONS)
