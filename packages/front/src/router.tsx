import { createBrowserRouter } from 'react-router-dom'
import { ErrorView } from './views/ErrorView'
import { GameView } from './views/GameView'
import { HomeView } from './views/HomeView'
import { RootView } from './views/RootView'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootView />,
    errorElement: <ErrorView />,
    children: [
      { path: '', element: <HomeView /> },
      { path: ':id', element: <GameView /> }
    ]
  }
])
