import { FC } from 'react'
import styled from 'styled-components'
import {
  CHESS_BOARD_SIZE,
  ChessPiece,
  Color,
  Square,
  WHITE
} from 'chess-core'
import { ChessBoardSquare } from './components/ChessBoardSquare/ChessBoardSquare'
import { parseRanks } from './lib'

const StyledChessBoard = styled.div`
  display: flex;
  flex-direction: column;
`

const StyledRank = styled.div`
  display: flex;
`

type ChessBoardProps = {
  board: Array<ChessPiece | null>
  sidePlaying: Color
  onPieceDrop: (item: {
    from: Square & { piece: ChessPiece }
    to: Square
  }) => void
}

export const ChessBoard: FC<ChessBoardProps> = ({
  board,
  sidePlaying,
  onPieceDrop
}) => {
  const ranks = parseRanks(board, sidePlaying)

  return (
    <StyledChessBoard>
      {ranks.map((rank, rankIndex) => (
        <StyledRank key={rankIndex}>
          {rank.map((piece, fileIndex) => (
            <ChessBoardSquare
              key={fileIndex}
              chessPiece={piece}
              rank={
                sidePlaying === WHITE
                  ? CHESS_BOARD_SIZE - rankIndex - 1
                  : rankIndex
              }
              file={
                sidePlaying === WHITE
                  ? fileIndex
                  : CHESS_BOARD_SIZE - fileIndex - 1
              }
              onPieceDrop={onPieceDrop}
            />
          ))}
        </StyledRank>
      ))}
    </StyledChessBoard>
  )
}
