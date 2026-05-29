import { useMemo } from 'react'
import {
  useChessGameStateChangedSubscription,
  useGetGameQuery
} from '../../graphql/Queries.generated'
import { fenToState } from 'chess-core'
import { useCurrentUserId } from '../useCurrentUserId'

export const useGameData = (id: string | null | undefined) => {
  const currentUserId = useCurrentUserId()

  const { data, loading } = useGetGameQuery({
    variables: { id: id! },
    skip: !id
  })

  useChessGameStateChangedSubscription({
    variables: { id: id! },
    skip: !id
  })

  const game = data?.gameById

  const state = useMemo(() => {
    if (!game?.fenString) return null
    return fenToState(game.fenString)
  }, [game?.fenString])

  const currentUserPlayer = game?.players.find((p) => p.id === currentUserId)

  return { game, state, currentUserPlayer, loading }
}
