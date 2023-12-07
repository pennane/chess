import { FC } from 'react'
import { TChessBoard, TChessPieceColor } from '../../chess/chess.models'
import styled from 'styled-components'
import { ChessBoardSquare } from './components/ChessBoardSquare/ChessBoardSquare'
import { coordinateToSquareColor, parseRanks } from './ChessBoard.lib'

const StyledChessBoard = styled.div`
  display: flex;
  flex-direction: column;
`

const StyledRank = styled.div`
  display: flex;
`

export type TChessBoardProps = {
  board: TChessBoard
  sidePlaying: TChessPieceColor
}

export const ChessBoard: FC<TChessBoardProps> = ({ board, sidePlaying }) => {
  const ranks = parseRanks(board, sidePlaying)

  return (
    <StyledChessBoard>
      {ranks.map((rank, y) => (
        <StyledRank key={y}>
          {rank.map((piece, x) => (
            <ChessBoardSquare
              key={x}
              chessPiece={piece}
              squareColor={coordinateToSquareColor(x, y)}
            />
          ))}
        </StyledRank>
      ))}
    </StyledChessBoard>
  )
}
