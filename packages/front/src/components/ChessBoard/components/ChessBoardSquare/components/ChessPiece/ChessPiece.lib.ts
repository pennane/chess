import blackKnight from '../../../../../../assets/pieces/SHAKKI_MUSTA_RATSU.svg'
import blackKing from '../../../../../../assets/pieces/SHAKKI_MUSTA_KUNINGAS.svg'
import blackQueen from '../../../../../../assets/pieces/SHAKKI_MUSTA_KUNINGATAR.svg'
import blackRook from '../../../../../../assets/pieces/SHAKKI_MUSTA_TORNI.svg'
import blackBishop from '../../../../../../assets/pieces/SHAKKI_MUSTA_LAHETTI.svg'
import blackPawn from '../../../../../../assets/pieces/SHAKKI_MUSTA_SOTILAS.svg'
import whiteKnight from '../../../../../../assets/pieces/SHAKKI_VALKONE_RATSU.svg'
import whiteKing from '../../../../../../assets/pieces/SHAKKI_VALKONE_KUNINGAS.svg'
import whiteQueen from '../../../../../../assets/pieces/SHAKKI_VALKONE_KUNINGATAR.svg'
import whiteRook from '../../../../../../assets/pieces/SHAKKI_VALKONE_TORNI.svg'
import whiteBishop from '../../../../../../assets/pieces/SHAKKI_VALKONE_LAHETTI.svg'
import whitePawn from '../../../../../../assets/pieces/SHAKKI_VALKONE_SOTILAS.svg'

import { EChessPiece } from '../../../../../../models'

const PIECE_TO_IMAGE_MAP: Record<EChessPiece, string> = {
	[EChessPiece.WhitePawn]: whitePawn,
	[EChessPiece.WhiteKnight]: whiteKnight,
	[EChessPiece.WhiteBishop]: whiteBishop,
	[EChessPiece.WhiteRook]: whiteRook,
	[EChessPiece.WhiteQueen]: whiteQueen,
	[EChessPiece.WhiteKing]: whiteKing,
	[EChessPiece.BlackPawn]: blackPawn,
	[EChessPiece.BlackKnight]: blackKnight,
	[EChessPiece.BlackBishop]: blackBishop,
	[EChessPiece.BlackRook]: blackRook,
	[EChessPiece.BlackQueen]: blackQueen,
	[EChessPiece.BlackKing]: blackKing,
}

export function chessPieceToImageSrc(piece: EChessPiece): string {
	return PIECE_TO_IMAGE_MAP[piece]
}
