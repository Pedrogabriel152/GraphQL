// Schemas
const userSchema = require('./schema/user.graphql');

// Resolvers
import { userResolvers } from './resolvers/userResolvers';

// Controllers
import UsersApi from './datasource/user';

export {userResolvers, userSchema, UsersApi}