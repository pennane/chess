import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { ApolloProvider } from '@apollo/client'
import { DndProvider as DragAndDropProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import './index.css'
import { router } from './router.tsx'
import { apolloClient } from './graphql/client.ts'
import { CurrentUserIdContextProvider } from './hooks/useCurrentUserId/context.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <DragAndDropProvider backend={HTML5Backend}>
        <CurrentUserIdContextProvider>
          <RouterProvider router={router} />
        </CurrentUserIdContextProvider>
      </DragAndDropProvider>
    </ApolloProvider>
  </React.StrictMode>
)
