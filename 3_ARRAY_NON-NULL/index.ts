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
        idade() {
            return 20;
        },
        salario() {
            return 1200.00
        },
        nome(){
            return 'Pedro Gabriel'
        },
        ativo() {
            return true
        },
        id() {
            return 1223176312873
        },
        tecnologias() {
            return ['GraphQL', 'React', 'CSS']
        }
    }
}
const typeDefs = gql`
    type Query {
        idade: Int
        salario: Float
        nome: String
        ativo: Boolean
        id: ID
        tecnologias: [String!]!
    }
`;

const server = new ApolloServer({
    typeDefs,
    resolvers
})


server.listen()