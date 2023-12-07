import { createBrowserRouter } from 'react-router-dom'
import { Root } from './views/Root'
import { Error } from './views/Error/Error'
import { Home } from './views/Home'
import { Game } from './views/Game'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <Error />,
    children: [
      { path: '', element: <Home /> },
      { path: ':id', element: <Game /> }
    ]
  }
])
