import { ChessPiece, Square } from 'chess-core'
import { parseBackendMove } from '../../chess/parseBackendMove'
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
    from: Square & { piece: ChessPiece }
    to: Square
  }) => {
    playMove({ variables: { id: id!, move: parseBackendMove(from, to) } })
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
