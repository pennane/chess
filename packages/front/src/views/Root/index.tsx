import styled from 'styled-components'
import { NavLink, Outlet } from 'react-router-dom'
import { THEME } from '../../theme'

const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const StyledNavbar = styled.nav`
  display: flex;
  gap: 1rem;
  margin: 1rem;
`

const StyledNavlink = styled(NavLink)`
  color: ${THEME.text.info};
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  &:hover {
    text-decoration: underline;
  }
`

const StyledContentWrapper = styled.div`
  margin: 0 0.5rem;
  margin-bottom: 10rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`

const StyledContent = styled.div`
  max-width: 770px;
  width: 100%;
`

export const Root = () => {
  return (
    <StyledRoot>
      <StyledNavbar>
        <StyledNavlink to="/">Chess</StyledNavlink>
      </StyledNavbar>
      <StyledContentWrapper>
        <StyledContent>
          <Outlet />
        </StyledContent>
      </StyledContentWrapper>
    </StyledRoot>
  )
}
