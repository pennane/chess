import { FC } from 'react'
import styled from 'styled-components'
import { useDrop } from 'react-dnd'

import { ChessPiece as CoreChessPiece, Square } from 'chess-core'
import { THEME } from '../../../../theme'
import { ChessPiece } from './components/ChessPiece'
import {
  CHESS_PIECE_ITEM_TYPE,
  ChessSquareColor,
  DARK
} from '../../../../chess/ui.constants'
import { coordinateToSquareColor } from '../../lib'

const StyledBoardSquare = styled.div<{
  $color: ChessSquareColor
  $isOver: boolean
}>`
  display: block;
  width: clamp(2.75rem, 11vw, 8vmin);
  height: clamp(2.75rem, 11vw, 8vmin);
  background-color: ${({ $color, $isOver }) => {
    if ($isOver) return THEME.background.squareHover

    return $color === DARK
      ? THEME.background.darkSquare
      : THEME.background.lightSquare
  }};
`

type ChessBoardSquareProps = {
  chessPiece: CoreChessPiece | null
  rank: number
  file: number
  onPieceDrop: (item: {
    from: Square & { piece: CoreChessPiece }
    to: Square
  }) => void
}

export const ChessBoardSquare: FC<ChessBoardSquareProps> = ({
  chessPiece,
  rank,
  file,
  onPieceDrop
}) => {
  const [{ isOver }, dropRef] = useDrop(
    () => ({
      accept: CHESS_PIECE_ITEM_TYPE,
      drop: (item: Square & { piece: CoreChessPiece }) => {
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
