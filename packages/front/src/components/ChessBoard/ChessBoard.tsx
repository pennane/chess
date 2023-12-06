import { FC } from 'react'
import { TChessBoard, TChessPieceColor } from '../../chess/chess.models'
import styled from 'styled-components'
import { ChessBoardSquare } from './components/ChessBoardSquare/ChessBoardSquare'
import { parseRanks } from './ChessBoard.lib'

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
  const onPieceDrop = (...args: unknown[]) => console.log(...args)

  return (
    <StyledChessBoard>
      {ranks.map((rank, rankIndex) => (
        <StyledRank key={rankIndex}>
          {rank.map((piece, fileIndex) => (
            <ChessBoardSquare
              key={fileIndex}
              chessPiece={piece}
              rank={rankIndex}
              file={fileIndex}
              onPieceDrop={onPieceDrop}
            />
          ))}
        </StyledRank>
      ))}
    </StyledChessBoard>
  )
}
