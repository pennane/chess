import { FC } from 'react'
import styled from 'styled-components'
import { Pill } from '../../../../components/Pill'
import { GameFragment } from '../../../../graphql/Queries.generated'

const StyledInfo = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`

const StyledId = styled.pre`
  margin: 0;
`

type TInfoBoxProps = {
  game: GameFragment
}

export const InfoBox: FC<TInfoBoxProps> = ({ game }) => {
  return (
    <StyledInfo>
      <Pill color="info">{game?.status}</Pill>
      <Pill color="info">
        <StyledId>{game?.id}</StyledId>
      </Pill>
    </StyledInfo>
  )
}
