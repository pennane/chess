import { useRouteError } from 'react-router-dom'
import styled from 'styled-components'

type RouteError = {
  statusText?: string
  message?: string
}

const isRouteError = (e: unknown): e is RouteError => {
  if (typeof e !== 'object' || e === null) return false
  if ('statusText' in e && typeof e.statusText === 'string') return true
  if ('message' in e && typeof e.message === 'string') return true
  return false
}

const StyledErrorPage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 8vw;
`

export const Error = () => {
  const error = useRouteError()

  const errorMessage = isRouteError(error)
    ? error.statusText || error.message || ''
    : null

  console.error(error)

  return (
    <StyledErrorPage>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      {errorMessage && (
        <p>
          <i>{errorMessage}</i>
        </p>
      )}
    </StyledErrorPage>
  )
}
