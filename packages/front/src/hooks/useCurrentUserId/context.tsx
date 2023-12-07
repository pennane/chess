import { FC, ReactNode, createContext } from 'react'
import { useCurrentUserIdQuery } from '../../graphql/Queries.generated'

export const CurrentUserIdContext = createContext<string>('')

type CurrentUserIdContextProviderProps = { children?: ReactNode }

export const CurrentUserIdContextProvider: FC<
  CurrentUserIdContextProviderProps
> = ({ children }) => {
  const { data, loading } = useCurrentUserIdQuery()

  const currentUserId = data?.currentUserId || null

  if (loading) return null
  if (!currentUserId) alert('backend offline :(')

  return (
    <CurrentUserIdContext.Provider value={currentUserId!}>
      {children}
    </CurrentUserIdContext.Provider>
  )
}
