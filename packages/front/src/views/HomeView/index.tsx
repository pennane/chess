import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useCreateGameMutation } from '../../graphql/Queries.generated'
import { Button } from '../../components/Button'

const StyledHomePage = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

const StyledInfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

export const HomeView = () => {
  const navigate = useNavigate()

  const [createGame] = useCreateGameMutation()

  const handleCreateGame = async () => {
    const createdGameResult = await createGame({})
    const createdGameId = createdGameResult.data?.createGame.id

    if (!createdGameId) return alert('Failed to create a game')

    navigate(`/${createdGameId}`)
  }

  return (
    <StyledHomePage>
      <Button onClick={handleCreateGame}>create new chess game</Button>
      <StyledInfoSection>
        <h3>Getting started</h3>
        <ul>
          <li>create a game and share the link</li>
          <li>after both players are ready the game starts</li>
          <li>others can spectate the game through the link</li>
          <li>moving is done by dragging the pieces</li>
        </ul>
        <h3>Games are ephemeral</h3>
        <ul>
          <li>games are always deleted after 45 minutes of creation</li>
          <li>games are deleted after 15 minutes of inactivity</li>
          <li>games are deleted after they are finished</li>
          <li>
            there is a limit on how many games can be ongoing at once, if it is
            reached you must wait before creating a new one
          </li>
        </ul>
      </StyledInfoSection>
    </StyledHomePage>
  )
}
