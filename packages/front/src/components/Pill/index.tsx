import { FC } from 'react'
import styled from 'styled-components'
import { THEME } from '../../theme'

type PillProps = {
  color: keyof typeof THEME.foreground
  onlyBorder?: boolean
  children: React.ReactNode
} & React.HTMLAttributes<HTMLDivElement>

const StyledPill = styled.div<{
  $color: keyof typeof THEME.foreground
  $onlyBorder?: boolean
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ $color }) => THEME.foreground[$color]};
  border: 1px solid ${({ $color }) => THEME.foreground[$color]};
  color: white;
  width: fit-content;
  padding: 0.1rem 0.25rem;
  font-size: 0.75rem;
  border-radius: 0.5rem;
`

export const Pill: FC<PillProps> = ({
  color,
  children,
  onlyBorder,
  ...rest
}) => {
  return (
    <StyledPill $color={color} $onlyBorder={onlyBorder} {...rest}>
      {children}
    </StyledPill>
  )
}
