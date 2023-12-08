import { squareToBackendMove } from '../../chess/chess.lib'
import { TChessSquare, TChessSquareWithType } from '../../chess/chess.models'
import {
  usePlayMoveMutation,
  useToggleReadyMutation,
  useJoinGameMutation
} from '../../graphql/Queries.generated'

import { useGameData } from '../useGameData'

export const useGameMutations = (id: string) => {
  const { currentUserPlayer } = useGameData(id)

  const [playMove] = usePlayMoveMutation()
  const [toggleReady] = useToggleReadyMutation()
  const [joinGame] = useJoinGameMutation()

  const handlePlayedMove = ({
    from,
    to
  }: {
    from: TChessSquareWithType
    to: TChessSquare
  }) => {
    playMove({ variables: { id: id!, move: squareToBackendMove(from, to) } })
  }

  const handleToggleReady = () => {
    toggleReady({ variables: { id: id!, ready: !currentUserPlayer?.ready } })
  }

  const handleJoinGame = () => {
    joinGame({ variables: { id: id! } })
  }

  return {
    playMove: handlePlayedMove,
    toggleReady: handleToggleReady,
    joinGame: handleJoinGame
  }
}
