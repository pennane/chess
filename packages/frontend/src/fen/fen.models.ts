export enum FenPiece {
  WhitePawn = 'P',
  WhiteKnight = 'N',
  WhiteBishop = 'B',
  WhiteRook = 'R',
  WhiteQueen = 'Q',
  WhiteKing = 'K',
  BlackPawn = 'p',
  BlackKnight = 'n',
  BlackBishop = 'b',
  BlackRook = 'r',
  BlackQueen = 'q',
  BlackKing = 'k'
}

export type Color = 'WHITE' | 'BLACK'
export type CastlingAbility = Record<
  Color,
  Record<'kingSide' | 'queenSide', boolean>
>

export type State = {
  board: Array<FenPiece | null>
  sideToMove: Color
  castlingAbility: CastlingAbility
  enPassantTargetSquareIndex: SquareIndex | null
  halfmoveClock: number
  fullmoveCounter: number
}
export type SquareIndex = number

export type Square = {
  file: number
  rank: number
}
