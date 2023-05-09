import { ApolloServer } from 'apollo-server';
import path from 'path';

// User
import { userSchema, UsersApi, userResolvers } from './User';

// Turma
import { turmaSchema, TurmasAPI, turmasResolvers } from './Turma';

// Matricula
import { matriculaSchema, matriculaResolvers, MatriculaApi } from './Matricula';

const typeDefs = [
    userSchema,
    turmaSchema,
    matriculaSchema
];

const resolvers = [
    userResolvers,
    turmasResolvers,
    matriculaResolvers
];

const dbConfig = {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
        filename: path.resolve(__dirname, './data/database.db')
    }
};

const server = new ApolloServer({ 
    typeDefs, 
    resolvers, 
    dataSources: () => {
        return {
            usersApi: new UsersApi(),
            turmasApi: new TurmasAPI(dbConfig),
            matriculaApi: new MatriculaApi(dbConfig)
        }
    }
});

server.listen().then(({url}) => {
    console.log(`Servidor rodando na porta ${url}`);
})