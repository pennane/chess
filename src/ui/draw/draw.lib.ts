import {
  BISHOP,
  BLACK,
  KING,
  KNIGHT,
  PAWN,
  QUEEN,
  ROOK,
  WHITE
} from '../../chess/chess.constants'
import { ChessPiece, Color, Piece } from '../../chess/chess.models'

const PIECE_TO_SYMBOL_MAP: Record<Color, Record<Piece, string>> = {
  [BLACK]: {
    [BISHOP]: '♗',
    [KNIGHT]: '♘',
    [ROOK]: '♖',
    [QUEEN]: '♕',
    [KING]: '♔',
    [PAWN]: '♙'
  },
  [WHITE]: {
    [BISHOP]: '♝',
    [KNIGHT]: '♞',
    [ROOK]: '♜',
    [QUEEN]: '♛',
    [KING]: '♚',
    [PAWN]: '♟'
  }
}

export function pieceToSymbol(piece: ChessPiece | null) {
  return piece ? PIECE_TO_SYMBOL_MAP[piece.color][piece.type] + ' ' : '  '
}
