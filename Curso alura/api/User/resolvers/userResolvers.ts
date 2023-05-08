import { GraphQLScalarType } from "graphql";

const userResolvers = {
    RolesTypes: {
        ESTUDANTE: "ESTUDANTE",
        DOCENTE: "DOCENTE",
        COORDENACAO: "COORDENACAO"
    },

    DateTime: new GraphQLScalarType({
        name: 'DateTime',
        description: 'string de data e hora no formato ISO-8601',
        serialize: (value: any) => value.toISOString(),
        parseValue: (value: any) => new Date(value),
        parseLiteral: (ast: any) => new Date(ast.value)
    }),

    Query: {
        users: (root, args, { dataSources }) => dataSources.usersApi.getUsers(),
        user: (root, { id }, { dataSources }) => dataSources.usersApi.getUserById(id)
    },

    Mutation: {
        adicionaUser: async (root, user, { dataSources }) => dataSources.usersApi.adicionaUser(user),
        atualizaUser: async (root, novosDados, { dataSources }) => dataSources.usersApi.atualizaUser(novosDados),
        deletaUser: async (root, { id }, { dataSources }) => dataSources.usersApi.deletaUser(id)
    }
}

export {userResolvers};