import { ApolloServer } from 'apollo-server';
import path from 'path';

// Schemas
const userSchema = require('./User/schema/user.graphql');
const turmaSchema = require('./Turma/schema/turma.graphql');
const matriculaSchema = require('./Matricula/schema/matricula.graphql');

// Resolvers
import { userResolvers } from './User/resolvers/userResolvers';
import { turmasResolvers } from './Turma/resolvers/turmaResolvers';

// Controllers
import UsersApi from './User/datasource/user';
import TurmasAPI from './Turma/datasource/turma';

const typeDefs = [
    userSchema,
    turmaSchema,
    matriculaSchema
];

const resolvers = [
    userResolvers,
    turmasResolvers
];

const dbConfig = {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
        filename: path.resolve(__dirname, './data/database.db')
    }
}

const server = new ApolloServer({ 
    typeDefs, 
    resolvers, 
    dataSources: () => {
        return {
            usersApi: new UsersApi(),
            turmasApi: new TurmasAPI(dbConfig)
        }
    }
});

server.listen().then(({url}) => {
    console.log(`Servidor rodando na porta ${url}`)
})