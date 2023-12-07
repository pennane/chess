import {
  useChessGameStateChangedSubscription,
  useGetGameQuery
} from '../../graphql/Queries.generated'

export const useGame = (id: string | null | undefined) => {
  const { data, loading } = useGetGameQuery({
    variables: { id: id! },
    skip: !id
  })

  useChessGameStateChangedSubscription({
    variables: { id: id! },
    skip: !id
  })

  return { game: data?.gameById, loading }
}
