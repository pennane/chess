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

const StyledGame = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const StyledGameInfo = styled.div``

const StyledGameId = styled.div`
  display: flex;
  gap: 0.5rem;
  & > * {
    display: inline-block;
  }
  align-items: center;
`

const StyledPlayer = styled.div`
  display: flex;
  gap: 0.5rem;
`

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
    toggleReady({ variables: { id: id!, ready: !player?.ready } })
  }

  const [joinGame] = useJoinGameMutation()

  const handleJoinGame = () => {
    joinGame({ variables: { id: id! } })
  }

  if (loading) return <p>loading...</p>
  if (!game) return <p>no game found</p>
  if (!state) return <p>invalid game state</p>

  const player = game.players.find((p) => p.id === currentUserId)

  const sidePlaying = player?.color || WHITE

  return (
    <StyledGame>
      <StyledGameInfo>
        <p>{game.status}</p>
        <StyledGameId>
          <span>game id</span>
          <pre>{id}</pre>
        </StyledGameId>
      </StyledGameInfo>

      {game.players.map((p, i) => (
        <StyledPlayer>
          {p.color === state.sideToMove && <span>&gt;</span>}
          <span>Player {i + 1}</span>
          {game.status === ChessGameStatus.NotStarted && (
            <span>{p.ready ? 'ready' : 'not ready'}</span>
          )}
          {p.color && (
            <span>{p.color === ChessPieceColor.White ? 'white' : 'black'}</span>
          )}
          {p.id === player?.id && <span>(you)</span>}
        </StyledPlayer>
      ))}
      <ChessBoard
        board={state.board}
        sidePlaying={sidePlaying}
        onPieceDrop={handlePlayedMove}
      />
      {game.status === ChessGameStatus.NotStarted && player && (
        <button onClick={handleToggleReady}>toggle ready</button>
      )}
      {game.status === ChessGameStatus.NotStarted &&
        !player &&
        game.players.length < 2 && (
          <button onClick={handleJoinGame}>join game</button>
        )}
    </StyledGame>
  )
}
