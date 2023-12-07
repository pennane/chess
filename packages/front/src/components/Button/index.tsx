import styled from 'styled-components'
import { THEME } from '../../theme'

export const Button = styled.button`
  border-radius: 0.5rem;
  color: ${THEME.text.good};
  background: transparent;
  border: 1px solid ${THEME.foreground.good};
  padding: 0.25rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  transition: border-color 0.1s ease 0s;
`
