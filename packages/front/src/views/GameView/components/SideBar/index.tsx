import { FC } from 'react'
import styled from 'styled-components'
import { PreviousMoves } from './components/PreviousMoves'
import {
  GameFragment,
  PlayerFragment
} from '../../../../graphql/Queries.generated'
import { Button } from '../../../../components/Button'
import { ChessGameStatus } from '../../../../graphql/types'

const StyledSidebar = styled.aside`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const StyledActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

type TSideBarProps = {
  game: GameFragment
  currentPlayer: PlayerFragment | null | undefined
  handleJoinGame: () => void
  handleToggleReady: () => void
}

export const SideBar: FC<TSideBarProps> = ({
  game,
  currentPlayer,
  handleJoinGame,
  handleToggleReady
}) => {
  return (
    <StyledSidebar>
      <PreviousMoves moveHistory={game?.moveHistory || []} />
      <StyledActions>
        {game?.status === ChessGameStatus.NotStarted && currentPlayer && (
          <Button onClick={handleToggleReady}>toggle ready</Button>
        )}
        {game.status === ChessGameStatus.NotStarted &&
          !currentPlayer &&
          game.players.length < 2 && (
            <Button onClick={handleJoinGame}>join game</Button>
          )}
      </StyledActions>
    </StyledSidebar>
  )
}
