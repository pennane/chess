import { ROOK_DIRECTIONS } from '../chess.constants'
import { slidingMovesCreator } from './slidingMovesCreator'

export const generateRookMoves = slidingMovesCreator(ROOK_DIRECTIONS)
