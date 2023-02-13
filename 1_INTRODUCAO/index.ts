import { gql, ApolloServer } from 'apollo-server';


/**
 * Scalar Types
 * - Int
 * - Float
 * - String
 * - Boolean
 * - ID
 */

const resolvers = {
    Query: {
        hello() {
            return 'World'
        }
    }
}
const typeDefs = gql`
    type Query {
        hello: String
    }
`

const server = new ApolloServer({
    typeDefs,
    resolvers
})


server.listen()