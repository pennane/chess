import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import {
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
import { ChessGameStatus } from '../../types'

const StyledGame = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
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

  if (loading) return <p>loading...</p>
  if (!game) return <p>no game found</p>
  if (!state) return <p>invalid game state</p>

  const player = game.players.find((p) => p.id === currentUserId)

  const sidePlaying = player?.color || WHITE

  return (
    <StyledGame>
      <h3>player</h3>
      {game.players.map((p) => (
        <div>
          {p.id}
          ready: {p.ready ? 'true' : 'false'}
        </div>
      ))}
      <ChessBoard
        board={state.board}
        sidePlaying={sidePlaying}
        onPieceDrop={handlePlayedMove}
      />
      {game.status === ChessGameStatus.NotStarted && player && (
        <button onClick={handleToggleReady}>toggle ready</button>
      )}
    </StyledGame>
  )
}
