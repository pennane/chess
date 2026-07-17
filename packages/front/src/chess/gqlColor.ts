import { BLACK, Color, WHITE } from 'chess-core'
import { ChessPieceColor } from '../graphql/types'

export function gqlColorToCoreColor(c: ChessPieceColor): Color {
	return c === ChessPieceColor.White ? WHITE : BLACK
}

export function coreColorToGqlColor(c: Color): ChessPieceColor {
	return c === WHITE ? ChessPieceColor.White : ChessPieceColor.Black
}
