const { GraphQLScalarType } = require('graphql')

const matriculaResolvers = {
    DateTime: new GraphQLScalarType({
        name: 'DateTime',
        description: 'string de data e hora no formato ISO-8601',
        serialize: (value) => new Date(value).toISOString(),
        parseValue: (value) => new Date(value),
        parseLiteral: (ast) => new Date(ast.value).toISOString()
    }),

    Mutation: {
        matricularEstudante: (root, ids, { dataSources } ) => dataSources.matriculaApi.matricularEstudante(ids)
    },

    Matricula: {
        estudante: (parent,  __, { dataSources }) => dataSources.usersApi.getUserById(parent.estudante_id),
        turma: (parent, _, { dataSources }) => dataSources.turmasApi.getTurma(parent.turma_id)
    }
}

export {matriculaResolvers};