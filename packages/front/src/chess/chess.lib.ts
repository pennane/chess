import { BLACK, CHESS_BOARD_SIZE, WHITE } from './chess.constants'
import {
  EChessPiece,
  TChessBoard,
  TChessCastlingAbility,
  TChessPieceColor,
  TChessSquare,
  TChessSquareWithType,
  TChessState
} from './chess.models'

function fenToChessPiece(fenPiece: EChessPiece): EChessPiece {
  return fenPiece
}

function fenToCastlingAbility(fenCastling: string): TChessCastlingAbility {
  return {
    WHITE: {
      kingSide: fenCastling.includes(EChessPiece.WhiteKing),
      queenSide: fenCastling.includes(EChessPiece.WhiteQueen)
    },
    BLACK: {
      kingSide: fenCastling.includes(EChessPiece.BlackKing),
      queenSide: fenCastling.includes(EChessPiece.BlackQueen)
    }
  }
}

function fenToEnPassantTargetSquare(fen: string): TChessSquare | null {
  if (fen === '-') return null
  const [file, rank, ...rest] = fen.split('')
  const parsedFile = parseFile(file)
  const parsedRank = parseRank(rank)
  if (rest.length > 1 || !parsedFile || !parsedRank) return null
  return { file: parsedFile, rank: parsedRank }
}

function fenToSideToMove(fen: string): TChessPieceColor {
  if (fen === 'w') return WHITE
  if (fen === 'b') return BLACK
  throw new Error('Invalid color in fenToSideToMove')
}

function fenToBoard(fen: string): TChessBoard {
  const ranks = fen.split('/')

  let board: TChessBoard = []

  for (let rankIndex = CHESS_BOARD_SIZE - 1; rankIndex >= 0; rankIndex--) {
    const rank = ranks[rankIndex]
    for (const symbol of rank.split('')) {
      if (!isNaN(parseInt(symbol))) {
        board = board.concat(
          Array.from({ length: parseInt(symbol) }, () => null)
        )
        continue
      }
      board.push(fenToChessPiece(symbol as EChessPiece))
    }
  }

  return board
}

function fenToFullmoveCounter(counter: string): number {
  return parseFloat(counter)
}

function fenToHalfmoveClock(counter: string): number {
  return parseFloat(counter)
}

function parseFile(file: string): number | null {
  const fileNumber = file.charCodeAt(0) - 'a'.charCodeAt(0)
  if (fileNumber < 0 || fileNumber > 7) return null
  return fileNumber
}

function parseRank(rank: string): number | null {
  const parsedRank = parseInt(rank) - 1

  if (parsedRank < 0 || parsedRank > 7) return null
  return parsedRank
}

export function fenStringToState(fenString: string): TChessState {
  const [
    board,
    sideToMove,
    castlingAbility,
    enPassantTargetSquareIndex,
    halfmoveClock,
    fullmoveCounter
  ] = fenString.split(' ')

  return {
    board: fenToBoard(board),
    sideToMove: fenToSideToMove(sideToMove),
    castlingAbility: fenToCastlingAbility(castlingAbility),
    enPassantTargetSquare: fenToEnPassantTargetSquare(
      enPassantTargetSquareIndex
    ),
    halfmoveClock: fenToHalfmoveClock(halfmoveClock),
    fullmoveCounter: fenToFullmoveCounter(fullmoveCounter)
  }
}

export function parseBackendMove(
  from: TChessSquareWithType,
  to: TChessSquare
): string {
  const move = `${String.fromCharCode(from.file + 'a'.charCodeAt(0))}${
    from.rank + 1
  }${String.fromCharCode(to.file + 'a'.charCodeAt(0))}${to.rank + 1}`

  const isPawn =
    from.piece === EChessPiece.BlackPawn || from.piece === EChessPiece.WhitePawn
  const isPromotionEndRank = to.rank === 0 || to.rank === CHESS_BOARD_SIZE - 1
  const shouldPromote = isPawn && isPromotionEndRank

  if (!shouldPromote) {
    return move
  }

  // Always promote to queen when possible
  return move.concat('q')
}
