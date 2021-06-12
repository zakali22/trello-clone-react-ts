const express = require("express")
const app = express();
const mongoose = require("mongoose")
const db = mongoose.connection;
const bodyParser = require("body-parser")
require("dotenv").config({path: '.env'})
const cors = require("cors");
const PORT = process.env.PORT || 4000;
const {typeDefs} = require("./typeDefs")
const {resolvers} = require("./resolvers")


/** Apollo v2 New pattern */

// Import Graphql related packages from apollo-server-express, graphql-tools 
const { ApolloServer } = require('apollo-server-express'); // Each will be used as middlewares for different routes

const server = new ApolloServer({
    typeDefs,   
    resolvers,
    playground: true,
    introspection: true 
});

server.applyMiddleware({ app }); 

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
}
app.options('*', cors())
app.use(cors(corsOptions))


if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    app.listen({ port: PORT }, () => {
        console.log(`🚀 Successfully connected to database, listening on PORT http://localhost:${PORT}${server.graphqlPath}`)
    })
});