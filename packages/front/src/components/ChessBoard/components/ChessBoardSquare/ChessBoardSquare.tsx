import { FC } from 'react'
import styled from 'styled-components'

import { EChessPiece, TChessSquareColor } from '../../../../chess/chess.models'
import { THEME } from '../../../../theme'
import { ChessPiece } from './components/ChessPiece/ChessPiece'
import { DARK } from '../../../../chess/chess.constants'

const StyledBoardSquare = styled.div<{ $color: TChessSquareColor }>`
  display: block;
  width: 2rem;
  height: 2rem;
  background-color: ${({ $color }) =>
    $color === DARK ? THEME.colors.darkSquare : THEME.colors.lightSquare};
`

export type TChessBoardSquareProps = {
  squareColor: TChessSquareColor
  chessPiece: EChessPiece | null
}

export const ChessBoardSquare: FC<TChessBoardSquareProps> = ({
  chessPiece,
  squareColor
}) => {
  return (
    <StyledBoardSquare $color={squareColor}>
      {chessPiece && <ChessPiece piece={chessPiece} />}
    </StyledBoardSquare>
  )
}
