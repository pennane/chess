import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import {
  useCreateGameMutation,
  useJoinGameMutation
} from '../../graphql/Queries.generated'
import { useState } from 'react'

const StyledHomePage = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const Home = () => {
  const navigate = useNavigate()

  const [createGame] = useCreateGameMutation()
  const [joinGame] = useJoinGameMutation()

  const [gameId, setGameId] = useState('')

  const handleCreateGame = async () => {
    const createdGameResult = await createGame({})
    const createdGameId = createdGameResult.data?.createGame.id

    if (!createdGameId) return alert('Failed to create a game')

    navigate(`/${createdGameId}`)
  }

  const handleJoinGame = async () => {
    const joinGameResult = await joinGame({ variables: { id: gameId } })
    const joinedGameId = joinGameResult.data?.joinGame.id

    if (!joinGameResult) return alert('Failed to join the game')

    navigate(`/${joinedGameId}`)
  }

  return (
    <StyledHomePage>
      <h1>chess</h1>
      <p>Create game</p>
      <button onClick={handleCreateGame}>create</button>
      <p>Join game</p>
      <div>
        <span>id:</span>
        <input
          value={gameId}
          onChange={(e) => setGameId(e.target.value)}
        ></input>
        <button disabled={gameId?.length < 10} onClick={handleJoinGame}>
          join
        </button>
      </div>
    </StyledHomePage>
  )
}
