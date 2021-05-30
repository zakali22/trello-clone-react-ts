const express = require("express")
const app = express();
const mongoose = require("mongoose")
const db = mongoose.connection;
const bodyParser = require("body-parser")
require("dotenv").config({path: '.env'})
const cors = require("cors");

const List = require('./schema/ListSchema')
const Task = require('./schema/TaskSchema')

const {typeDefs} = require("./typeDefs")
const {resolvers} = require("./resolvers")


// Import Graphql related packages from apollo-server-express, graphql-tools 
const {graphiqlExpress, graphqlExpress} = require("apollo-server-express") // Each will be used as middlewares for different routes
const {makeExecutableSchema} = require("graphql-tools") // In order to unify our graphql schemas: typeDefs and resolvers

// Unify mongoose schemas
const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})

// Define the different middlewares and connect to graphiql and graphql
app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql' // Basically reroutes to /graphql
}))

app.use('/graphql', bodyParser.json(), graphqlExpress(() => ({
    schema, 
    context: { // The context object passed to each resolver
        List, 
        Task
    }
})))


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
    app.listen(PORT, () => {
        console.log(`Successfully connected to database, listening on PORT http://localhost:${PORT}`)
    })
});