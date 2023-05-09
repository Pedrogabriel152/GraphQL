const matriculaSchema = require('./schema/matricula.graphql');
import { matriculaResolvers } from "./resolvers/matriculaResolvers";
import MatriculaApi from "./datasource/matricula";

export {matriculaSchema, matriculaResolvers, MatriculaApi}