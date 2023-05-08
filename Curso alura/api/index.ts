import { ApolloServer } from 'apollo-server';
const userSchema = require('./User/schema/user.graphql');
import { userResolvers } from './User/resolvers/userResolvers';
import UsersApi from './User/datasource/user';

const typeDefs = [
    userSchema,
];

const resolvers = [userResolvers];

const server = new ApolloServer({ 
    typeDefs, 
    resolvers, 
    dataSources: () => {
        return {
            usersApi: new UsersApi()
        }
    }
});

server.listen().then(({url}) => {
    console.log(`Servidor rodando na porta ${url}`)
})