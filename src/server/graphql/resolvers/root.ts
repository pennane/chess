const root = {
	Query: {
		hello: () => {
			return 'Hello world!'
		},
	},
}

export function getGraphqlResolvers() {
	return root
}
