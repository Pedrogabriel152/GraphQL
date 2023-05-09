const turmaSchema = require('./schema/turma.graphql');
import { turmasResolvers } from './resolvers/turmaResolvers';
import TurmasAPI from './datasource/turma';

export {turmaSchema, turmasResolvers, TurmasAPI}