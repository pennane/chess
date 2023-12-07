import { createBrowserRouter } from 'react-router-dom'
import { Root } from './routes/Root'
import { Error } from './routes/Error/Error'
import { Home } from './routes/Home'
import { Game } from './routes/Game'

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
