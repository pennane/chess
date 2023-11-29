import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'

import { createClient } from 'graphql-ws'
import { OperationTypeNode } from 'graphql'

if (!import.meta.env.VITE_SERVER_BASE_URL) {
	throw new Error('Missing VITE_SERVER_BASE_URL from the environment')
}

if (!import.meta.env.VITE_WS_BASE_URL) {
	throw new Error('Missing VITE_WS_BASE_URL from the environment')
}

const httpLink = new HttpLink({
	uri: `${import.meta.env.VITE_SERVER_BASE_URL}/graphql`,
	credentials: 'include',
})

const wsLink = new GraphQLWsLink(
	createClient({
		url: `${import.meta.env.VITE_WS_BASE_URL}/graphql`,
	}),
)

const splitLink = split(
	({ query }) => {
		const definition = getMainDefinition(query)
		return (
			definition.kind === 'OperationDefinition' &&
			definition.operation === OperationTypeNode.SUBSCRIPTION
		)
	},
	wsLink,
	httpLink,
)

export const apolloClient = new ApolloClient({
	cache: new InMemoryCache(),
	link: splitLink,
})
