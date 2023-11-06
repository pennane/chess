import { QUEEN_DIRECTIONS } from '../chess.constants'
import { slidingMovesCreator } from './slidingMovesCreator'

export const generateQueenMoves = slidingMovesCreator(QUEEN_DIRECTIONS)
