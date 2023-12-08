import { FC } from 'react'
import styled from 'styled-components'
import { TChessState } from '../../../../chess/chess.models'
import { GameFragment } from '../../../../graphql/Queries.generated'
import { ChessGameStatus, ChessPieceColor } from '../../../../graphql/types'
import { useCurrentUserId } from '../../../../hooks/useCurrentUserId'

const StyledPlayers = styled.div`
  display: flex;
  width: 25rem;
  flex-wrap: wrap;
`

const StyledPlayer = styled.div`
  display: flex;
  gap: 0.35rem;
  flex-basis: 50%;
`

type TPlayersProps = {
  state: TChessState
  game: GameFragment
}

export const Players: FC<TPlayersProps> = ({ state, game }) => {
  const currentPlayerId = useCurrentUserId()
  return (
    <StyledPlayers>
      {game?.players.map((player, i) => (
        <StyledPlayer key={i}>
          {player.color === state.sideToMove && <span>&gt;</span>}
          <span>Player {i + 1}</span>
          {game?.status === ChessGameStatus.NotStarted && (
            <span>{player.ready ? 'ready' : 'not ready'}</span>
          )}
          {player.color && (
            <span>
              {player.color === ChessPieceColor.White ? 'white' : 'black'}
            </span>
          )}
          {currentPlayerId === player?.id && <span>(you)</span>}
        </StyledPlayer>
      ))}
    </StyledPlayers>
  )
}
