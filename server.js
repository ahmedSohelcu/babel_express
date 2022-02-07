import express from "express";
import { graphqlHTTP } from 'express-graphql'
import { buildSchema } from 'graphql'

import testGql from './testGql.gql'

// import {testdata} from './test'
// console.log('testdata', testdata())


import 'dotenv/config'
const port = process.env.PORT || 4000

/*
 "build": "babel index.js -d dist",
    "start": "npm run build && nodemon dist/index.js"*/


//now load from gql file...
// Construct a schema, using GraphQL schema language
// const schema = buildSchema(`
//   type Query {
//     hello: String
//   }
// `);

const schema = buildSchema(testGql);


// The root provides a resolver function for each API endpoint
const root = {
  hello: () => {
    return 'Hello world after changes..v..express graphql !';
  },
};

const app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.get('/test', (req, res) => {
  console.log('hello....')
    res.send('Hello World from express graphql!')
})

app.listen(port);
console.log(`Running a GraphQL API server at http://localhost:${port}/graphql`);