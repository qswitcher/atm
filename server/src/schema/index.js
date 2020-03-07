const resolvers = require('./resolvers')
const mutations = require('./mutations')
const typeDefs = require('./typeDefs')

module.exports = {
  resolvers: { ...resolvers, ...mutations },
  typeDefs,
}
