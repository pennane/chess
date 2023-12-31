import { z } from 'zod'
import dotenv from 'dotenv'

dotenv.config()

const envVariablesSchema = z.object({
	DEBUG: z.boolean({ coerce: true }).default(false),
	SESSION_SECRET: z.string().default('keyboard cat'),
	CLIENT_URL: z.string().default('http://localhost:5173'),
	PORT: z.number({ coerce: true }).default(3000),
	GRAPHQL_API_ENDPOINT: z.string().default('/graphql'),
})

export default envVariablesSchema.parse(process.env)
