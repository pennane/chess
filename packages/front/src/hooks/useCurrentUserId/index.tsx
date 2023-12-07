import { useContext } from 'react'
import { CurrentUserIdContext } from './context'

export const useCurrentUserId = () => {
  const currentUser = useContext(CurrentUserIdContext)

  return currentUser
}
