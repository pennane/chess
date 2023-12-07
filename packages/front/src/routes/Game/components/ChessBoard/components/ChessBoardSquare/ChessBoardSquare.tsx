import { FC } from 'react'
import styled from 'styled-components'
import { useDrop } from 'react-dnd'

import {
  EChessPiece,
  TChessSquare,
  TChessSquareColor
} from '../../../../../../chess/chess.models'
import { THEME } from '../../../../../../theme'
import { ChessPiece } from './components/ChessPiece/ChessPiece'
import {
  CHESS_PIECE_ITEM_TYPE,
  DARK
} from '../../../../../../chess/chess.constants'
import { coordinateToSquareColor } from '../../ChessBoard.lib'

const StyledBoardSquare = styled.div<{
  $color: TChessSquareColor
  $isOver: boolean
}>`
  display: block;
  width: clamp(3rem, 11vw, 8vmin);
  height: clamp(3rem, 11vw, 8vmin);
  background-color: ${({ $color, $isOver }) => {
    if ($isOver) return THEME.colors.hover

    return $color === DARK ? THEME.colors.darkSquare : THEME.colors.lightSquare
  }};
`

export type TChessBoardSquareProps = {
  chessPiece: EChessPiece | null
  rank: number
  file: number
  onPieceDrop: (item: { from: TChessSquare; to: TChessSquare }) => void
}

export const ChessBoardSquare: FC<TChessBoardSquareProps> = ({
  chessPiece,
  rank,
  file,
  onPieceDrop
}) => {
  const [{ isOver }, dropRef] = useDrop(
    () => ({
      accept: CHESS_PIECE_ITEM_TYPE,
      drop: (item: TChessSquare) => {
        return onPieceDrop({ from: item, to: { rank, file } })
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver()
      })
    }),
    [rank, file]
  )

  return (
    <StyledBoardSquare
      $color={coordinateToSquareColor(rank, file)}
      $isOver={isOver}
      ref={dropRef}
    >
      {chessPiece && <ChessPiece piece={chessPiece} rank={rank} file={file} />}
    </StyledBoardSquare>
  )
}
