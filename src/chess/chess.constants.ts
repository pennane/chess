export const CHESS_BOARD_SIZE = 8

export const DEFAULT_POSITION =
  'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'

export const EN_PASSANT_POSITION =
  'rnbqkbnr/ppp1pppp/8/3pP3/8/8/PPPP1PPP/RNBQKBNR w KQkq d3 0 1'

export const ROOK_POSITION = '6k1/8/8/3R4/8/8/8/3K4 w - - 0 1'

export const RANK_1 = 0
export const RANK_2 = 1
export const RANK_3 = 2
export const RANK_4 = 3
export const RANK_5 = 4
export const RANK_6 = 5
export const RANK_7 = 6
export const RANK_8 = 7

export const RANKS = [
  RANK_1,
  RANK_2,
  RANK_3,
  RANK_4,
  RANK_5,
  RANK_6,
  RANK_7,
  RANK_8
] as const

export const FILE_A = 0
export const FILE_B = 1
export const FILE_C = 2
export const FILE_D = 3
export const FILE_E = 4
export const FILE_F = 5
export const FILE_G = 6
export const FILE_H = 7

export const FILES = [
  FILE_A,
  FILE_B,
  FILE_C,
  FILE_D,
  FILE_E,
  FILE_F,
  FILE_G,
  FILE_H
] as const

export const QUEEN = 'q'
export const KING = 'k'
export const PAWN = 'p'
export const KNIGHT = 'n'
export const BISHOP = 'b'
export const ROOK = 'r'

export const PIECES = [QUEEN, KING, PAWN, KNIGHT, BISHOP, ROOK] as const

export const WHITE = 'w'
export const BLACK = 'b'

export const COLORS = [WHITE, BLACK] as const

export const PROMOTABLE_PIECES = [QUEEN, KNIGHT, BISHOP, ROOK] as const

export const KNIGHT_MOVES = [
  [2, 1],
  [1, 2],
  [-1, 2],
  [-2, 1],
  [-2, -1],
  [-1, -2],
  [1, -2],
  [2, -1]
]

export const KING_MOVES = [
  [1, 0],
  [1, 1],
  [0, 1],
  [-1, 1],
  [-1, 0],
  [-1, -1],
  [0, -1],
  [1, -1]
]

export const ROOK_DIRECTIONS = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1]
]

export const BISHOP_DIRECTIONS = [
  [1, 1],
  [-1, 1],
  [-1, -1],
  [1, -1]
]

export const QUEEN_DIRECTIONS = ROOK_DIRECTIONS.concat(BISHOP_DIRECTIONS)
