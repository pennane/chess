import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ApolloProvider } from '@apollo/client'
import './index.css'
import { apolloClient } from './graphql/client.ts'
import { DndProvider as DragAndDropProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <DragAndDropProvider backend={HTML5Backend}>
        <App />
      </DragAndDropProvider>
    </ApolloProvider>
  </React.StrictMode>
)
