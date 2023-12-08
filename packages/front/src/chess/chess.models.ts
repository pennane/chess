export enum EChessPiece {
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

export type TChessPieceColor = 'WHITE' | 'BLACK'
export type TChessCastlingAbility = Record<
  TChessPieceColor,
  Record<'kingSide' | 'queenSide', boolean>
>

export type TChessBoard = Array<EChessPiece | null>

export type TChessState = {
  board: TChessBoard
  sideToMove: TChessPieceColor
  castlingAbility: TChessCastlingAbility
  enPassantTargetSquare: TChessSquare | null
  halfmoveClock: number
  fullmoveCounter: number
}
export type TChessSquareIndex = number

export type TChessSquare = {
  file: number
  rank: number
}

export type TChessSquareWithType = TChessSquare & { piece: EChessPiece }

export type TChessSquareColor = 'LIGHT' | 'DARK'
