import { GraphlRequestContext } from '../graphql.models'

const root = {
	Query: {
		sessionId: (_root: any, _args: any, ctx: GraphlRequestContext) =>
			ctx.sessionId,
	},
}

export function getGraphqlResolvers() {
	return root
}
