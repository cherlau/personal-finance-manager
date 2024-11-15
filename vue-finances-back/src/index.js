const { GraphQLServer } = require('graphql-yoga')
const Binging = require('prisma-binding')
const { prisma } = require('./generated/prisma-client')

const resolvers = require('./resolvers')

const server = new GraphQLServer({
	typeDefs: `${__dirname}/schema.graphql`,
	resolvers,
	context: {
		db: new Binging.Prisma({
			typeDefs: `${__dirname}/generated/graphql-schema/prisma.graphql`,
			endpoint: process.env.PRISMA_ENDPOINT,
		}),
		prisma
	}
})

server.start().then(() => console.log('Server running on http://localhost:4000...'))
