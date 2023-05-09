const { GraphQLScalarType } = require('graphql')

const turmasResolvers = {
    DateTime: new GraphQLScalarType({
        name: 'DateTime',
        description: 'string de data e hora no formato ISO-8601',
        serialize: (value) => new Date(value).toISOString(),
        parseValue: (value) => new Date(value),
        parseLiteral: (ast) => new Date(ast.value).toISOString()
    }),
    Query: {
        turmas: (root, args, { dataSources }, info) =>  dataSources.turmasApi.getTurmas(),
        turma: (root, { id }, { dataSources }) => dataSources.turmasApi.getTurma(id)
    },
    Mutation: {
        incluiTurma: (_, {turma}, { dataSources }) => dataSources.turmasApi.incluiTurma(turma),
        atualizaTurma: (_, novosDados, { dataSources }) => dataSources.turmasApi.atualizaTurma(novosDados),
        deletaTurma: (_, { id }, { dataSources }) => dataSources.turmasApi.deletaTurma(id),
    },
};

export {turmasResolvers};