"use strict";

var _express = _interopRequireDefault(require("express"));

var _expressGraphql = require("express-graphql");

var _graphql = require("graphql");

var _test = require("./test");

require("dotenv/config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var testGql = "  type Query {\n    hello: String\n  }";
const port = process.env.PORT || 4000;
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

const schema = (0, _graphql.buildSchema)(testGql); // The root provides a resolver function for each API endpoint

const root = {
  hello: () => {
    return 'Hello world after changes..v..express graphql !';
  }
};
const app = (0, _express.default)();
app.use('/graphql', (0, _expressGraphql.graphqlHTTP)({
  schema: schema,
  rootValue: root,
  graphiql: true
}));
app.get('/test', (req, res) => {
  console.log('hello....');
  res.send('Hello World from express graphql!');
});
app.listen(port);
console.log("Running a GraphQL API server at http://localhost:".concat(port, "/graphql"));