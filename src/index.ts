import express, { Request } from 'express';
import { graphqlHTTP } from 'express-graphql';
import { readFileSync } from 'fs';
import cors from 'cors';
import path from 'path';
import { makeExecutableSchema } from '@graphql-tools/schema';

import resolvers from './graphql/resolvers';

const server = express();

server.use(cors());

const schema = makeExecutableSchema({
  typeDefs: readFileSync(
    path.join(__dirname, 'graphql', 'schema.graphql'),
    'utf-8'
  ),
  resolvers
});

server.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
  context: ({ req }: any) => {
    const token = req.headers.authorization || '';
    return token;
  }
}));

server.listen(3001, () => {
  console.log('Server is running on port 3001');
})