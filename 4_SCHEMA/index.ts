import { gql, ApolloServer } from 'apollo-server';


/**
 * => Schema
 * -> Schema Definition Language ou  Linguagem de Definição do Esquema
 * -> SQL
 */

const produtos = [
    {
        id: 34234234,
        nome: 'Cadeira',
        valor: 30.50
    },
    {
        id: 34234234,
        nome: 'Mesa',
        valor: 100.00
    }
]

const resolvers = {
    Query: {
        user(){
            return {
                id: 123123,
                nome: 'Pedro Gabriel',
                salario: 1200.00,
                ativo: true,
                idade: 20
            }
        },
        produtos() {
            return produtos
        }
    }
}
const typeDefs = gql`

    type Produtos {
        nome: String
        id: ID
        valor: Float
    }

    type User {
        idade: Int
        salario: Float
        nome: String
        ativo: Boolean
        id: ID
    }

    type Query {
        user: User!
        produtos: [Produtos!]
    }
`;

const server = new ApolloServer({
    typeDefs,
    resolvers
})


server.listen()