import { FC } from 'react'
import styled from 'styled-components'
import { EChessPiece } from '../../../../../../models'
import { chessPieceToImageSrc } from './ChessPiece.lib'

const StyledChessPiece = styled.img`
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
}

export const ChessPiece: FC<TChessPieceProps> = ({ piece }) => {
	return <StyledChessPiece src={chessPieceToImageSrc(piece)} />
}
