import { pubsub } from '../graphql'
import { GraphqlRequestContext, GraphqlPubSubKey } from '../graphql.models'

const root = {
	Query: {
		sessionId: (_root: any, _args: any, ctx: GraphqlRequestContext) =>
			ctx.sessionId,
	},
	Subscription: {
		ping: {
			subscribe: () => pubsub.asyncIterator([GraphqlPubSubKey.TEST_PING]),
		},
	},
}

export function getGraphqlResolvers() {
	return root
}
