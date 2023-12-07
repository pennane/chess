import { BLACK, CHESS_BOARD_SIZE, WHITE } from './chess.constants'
import {
  EChessPiece,
  TChessBoard,
  TChessCastlingAbility,
  TChessPieceColor,
  TChessSquare,
  TChessSquareIndex,
  TChessState
} from './chess.models'

export function fenToChessPiece(fenPiece: EChessPiece): EChessPiece {
  return fenPiece
}

export function fenToCastlingAbility(
  fenCastling: string
): TChessCastlingAbility {
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

export function fenToEnPassantTargetSquare(fen: string): TChessSquare | null {
  if (fen === '-') return null
  const [file, rank, ...rest] = fen.split('')
  const parsedFile = parseFile(file)
  const parsedRank = parseRank(rank)
  if (rest.length > 1 || !parsedFile || !parsedRank) return null
  return { file: parsedFile, rank: parsedRank }
}

export function fenToSideToMove(fen: string): TChessPieceColor {
  if (fen === 'w') return WHITE
  if (fen === 'b') return BLACK
  throw new Error('Invalid color in fenToSideToMove')
}

export function fenToBoard(fen: string): TChessBoard {
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

export function fenToFullmoveCounter(counter: string): number {
  return parseFloat(counter)
}

export function fenToHalfmoveClock(counter: string): number {
  return parseFloat(counter)
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

export function parseFile(file: string): number | null {
  const fileNumber = file.charCodeAt(0) - 'a'.charCodeAt(0)
  if (fileNumber < 0 || fileNumber > 7) return null
  return fileNumber
}

export function parseRank(rank: string): number | null {
  const parsedRank = parseInt(rank) - 1

  if (parsedRank < 0 || parsedRank > 7) return null
  return parsedRank
}

export function squareToIndex(square: TChessSquare): TChessSquareIndex {
  return square.rank * 8 + square.file
}

export function squareToBackendMove(
  from: TChessSquare,
  to: TChessSquare
): string {
  return `${String.fromCharCode(from.file + 'a'.charCodeAt(0))}${
    from.rank + 1
  }${String.fromCharCode(to.file + 'a'.charCodeAt(0))}${to.rank + 1}`
}
