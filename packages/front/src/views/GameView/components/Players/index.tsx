import { FC } from 'react'
import styled from 'styled-components'
import { State } from 'chess-core'
import { GameFragment } from '../../../../graphql/Queries.generated'
import { ChessGameStatus, ChessPieceColor } from '../../../../graphql/types'
import { useCurrentUserId } from '../../../../hooks/useCurrentUserId'
import { coreColorToGqlColor } from '../../../../chess/gqlColor'

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

type PlayersProps = {
  state: State
  game: GameFragment
}

export const Players: FC<PlayersProps> = ({ state, game }) => {
  const currentPlayerId = useCurrentUserId()
  const sideToMoveGql = coreColorToGqlColor(state.sideToMove)
  return (
    <StyledPlayers>
      {game?.players.map((player, i) => (
        <StyledPlayer key={i}>
          {player.color === sideToMoveGql && <span>&gt;</span>}
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
