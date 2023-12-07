import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import {
  useJoinGameMutation,
  usePlayMoveMutation,
  useToggleReadyMutation
} from '../../graphql/Queries.generated'
import { fenStringToState, squareToBackendMove } from '../../chess/chess.lib'
import { useMemo } from 'react'
import { ChessBoard } from './components/ChessBoard/ChessBoard'
import { useCurrentUserId } from '../../hooks/useCurrentUserId'
import { WHITE } from '../../chess/chess.constants'
import { useGame } from '../../hooks/useGameChanges'
import { TChessSquare } from '../../chess/chess.models'
import { ChessGameStatus, ChessPieceColor } from '../../graphql/types'
import { Button } from '../../components/Button'
import { Pill } from '../../components/Pill'

const StyledGame = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 0.5rem;
`

const StyledGameInfo = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`

const StyledId = styled.pre`
  margin: 0;
`

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

const StyledGameWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`
const StyledGameSidebar = styled.aside`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const StyledGameActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const StyledPreviousMoves = styled.div``

const StyledPlayedMove = styled.div``

export const Game = () => {
  const { id } = useParams()
  const currentUserId = useCurrentUserId()

  const { game, loading } = useGame(id)

  const state = useMemo(() => {
    if (!game?.fenString) return null
    return fenStringToState(game.fenString)
  }, [game?.fenString])

  const [playMove] = usePlayMoveMutation()

  const handlePlayedMove = ({
    from,
    to
  }: {
    from: TChessSquare
    to: TChessSquare
  }) => {
    const move = squareToBackendMove(from, to)
    console.log(from, to, move)
    playMove({ variables: { id: id!, move } })
  }

  const [toggleReady] = useToggleReadyMutation()

  const handleToggleReady = () => {
    toggleReady({ variables: { id: id!, ready: !currentPlayer?.ready } })
  }

  const [joinGame] = useJoinGameMutation()

  const handleJoinGame = () => {
    joinGame({ variables: { id: id! } })
  }

  if (loading) return <p>loading...</p>
  if (!game) return <p>no game found</p>
  if (!state) return <p>invalid game state</p>

  const currentPlayer = game.players.find((p) => p.id === currentUserId)

  const sidePlaying = currentPlayer?.color || WHITE

  return (
    <StyledGame>
      <StyledGameInfo>
        <Pill color="info">{game.status}</Pill>
        <Pill color="info">
          <StyledId>{id}</StyledId>
        </Pill>
      </StyledGameInfo>

      <StyledPlayers>
        {game.players.map((player, i) => (
          <StyledPlayer key={i}>
            {player.color === state.sideToMove && <span>&gt;</span>}
            <span>Player {i + 1}</span>
            {game.status === ChessGameStatus.NotStarted && (
              <span>{player.ready ? 'ready' : 'not ready'}</span>
            )}
            {player.color && (
              <span>
                {player.color === ChessPieceColor.White ? 'white' : 'black'}
              </span>
            )}
            {currentPlayer?.id === player?.id && <span>(you)</span>}
          </StyledPlayer>
        ))}
      </StyledPlayers>
      <StyledGameWrapper>
        <ChessBoard
          board={state.board}
          sidePlaying={sidePlaying}
          onPieceDrop={handlePlayedMove}
        />
        <StyledGameSidebar>
          <StyledPreviousMoves>
            {game.moveHistory.map((move, i) => (
              <StyledPlayedMove key={i}>{move}</StyledPlayedMove>
            ))}
          </StyledPreviousMoves>
          <StyledGameActions>
            {game.status === ChessGameStatus.NotStarted && currentPlayer && (
              <Button onClick={handleToggleReady}>toggle ready</Button>
            )}
            {game.status === ChessGameStatus.NotStarted &&
              !currentPlayer &&
              game.players.length < 2 && (
                <Button onClick={handleJoinGame}>join game</Button>
              )}
          </StyledGameActions>
        </StyledGameSidebar>
      </StyledGameWrapper>
    </StyledGame>
  )
}
