import { FC } from 'react'
import {
  TChessBoard,
  TChessPieceColor,
  TChessSquare,
  TChessSquareWithType
} from '../../chess/chess.models'
import styled from 'styled-components'
import { ChessBoardSquare } from './components/ChessBoardSquare/ChessBoardSquare'
import { parseRanks } from './lib'
import { CHESS_BOARD_SIZE, WHITE } from '../../chess/chess.constants'

const StyledChessBoard = styled.div`
  display: flex;
  flex-direction: column;
`

const StyledRank = styled.div`
  display: flex;
`

type TChessBoardProps = {
  board: TChessBoard
  sidePlaying: TChessPieceColor
  onPieceDrop: (item: { from: TChessSquareWithType; to: TChessSquare }) => void
}

export const ChessBoard: FC<TChessBoardProps> = ({
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
