import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { ChessBoard } from '../../components/ChessBoard'
import { WHITE } from '../../chess/chess.constants'
import { useGameData } from '../../hooks/useGameData'
import { Players } from './components/Players'
import { InfoBox } from './components/InfoBox'
import { SideBar } from './components/SideBar'
import { useGameMutations } from '../../hooks/useGameMutations'

const StyledGame = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 0.5rem;
`

const StyledGameWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`

export const GameView = () => {
  const params = useParams()
  const id = params.id!

  const { game, state, currentUserPlayer, loading } = useGameData(id)

  const { playMove, joinGame, toggleReady } = useGameMutations(id)

  if (loading) return <p>loading...</p>
  if (!game) return <p>no game found</p>
  if (!state) return <p>invalid game state</p>

  const sidePlaying = currentUserPlayer?.color || WHITE

  return (
    <StyledGame>
      <InfoBox game={game} />
      <Players game={game} state={state} />

      <StyledGameWrapper>
        <ChessBoard
          board={state.board}
          sidePlaying={sidePlaying}
          onPieceDrop={playMove}
        />
        <SideBar
          currentPlayer={currentUserPlayer}
          game={game}
          handleJoinGame={joinGame}
          handleToggleReady={toggleReady}
        />
      </StyledGameWrapper>
    </StyledGame>
  )
}
