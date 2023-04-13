const express= require('express');
const app=express();
const { graphqlHTTP } = require('express-graphql');
const schema=require('./schema/schema');


// port define
port=3000;

// graphql endpoint
app.use('/graphql', graphqlHTTP({
    // Your GraphQL configuration options here
    schema:schema,
    graphiql: true
}));

app.listen(port,(req,res)=>{
console.log(`server has started on http://localhost:${port}`);
})