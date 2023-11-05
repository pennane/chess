export type CastlingAbility = {
  whiteKingSide: boolean
  whiteQueenSide: boolean
  blackKingSide: boolean
  blackQueenSide: boolean
}

export type File = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h'

export type Square = {
  rank: number
  file: File
}

export type State = {
  board: Array<ChessPiece | null>
  sideToMove: Color
  castlingAbility: CastlingAbility
  enPassantTargetSquare: Square | null
  halfmoveClock: number
  fullmoveCounter: number
}

export enum Piece {
  Pawn = 'p',
  Knight = 'n',
  Bishop = 'b',
  Rook = 'r',
  Queen = 'q',
  King = 'k'
}

export enum Color {
  White = 'w',
  Black = 'b'
}

export type ChessPiece = {
  color: Color
  piece: Piece
}

export type Board = Array<ChessPiece | null>
