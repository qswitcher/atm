const { ApolloServer } = require('apollo-server')
const schema = require('./schema')

const server = new ApolloServer({
  ...schema,
  introspection: true, // enables introspection of the schema
  playground: true, // enables the actual playground
})

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
})
