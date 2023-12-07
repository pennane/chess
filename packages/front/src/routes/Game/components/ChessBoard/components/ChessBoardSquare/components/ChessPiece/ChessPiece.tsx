import { FC } from 'react'
import styled from 'styled-components'
import { useDrag } from 'react-dnd'
import { EChessPiece } from '../../../../../../../../chess/chess.models'
import { chessPieceToImageSrc } from './ChessPiece.lib'
import { CHESS_PIECE_ITEM_TYPE } from '../../../../../../../../chess/chess.constants'

const StyledChessPieceImage = styled.img`
  width: 100%;
  height: 100%;
  user-drag: none;
  -webkit-user-drag: none;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  cursor: pointer;
`

export type TChessPieceProps = {
  piece: EChessPiece
  file: number
  rank: number
}

const renderChessPiece = (piece: EChessPiece) => {
  return <StyledChessPieceImage src={chessPieceToImageSrc(piece)} />
}

export const ChessPiece: FC<TChessPieceProps> = ({ piece, file, rank }) => {
  const [{ isDragging }, dragRef] = useDrag(
    () => ({
      type: CHESS_PIECE_ITEM_TYPE,
      item: { file, rank },
      collect: (monitor) => ({
        isDragging: monitor.isDragging()
      })
    }),
    [piece, file, rank]
  )

  if (!piece || isDragging) {
    return null
  }

  return (
    <div
      style={{
        transform: 'translate(0, 0)'
      }}
      ref={dragRef}
    >
      {renderChessPiece(piece)}
    </div>
  )
}
