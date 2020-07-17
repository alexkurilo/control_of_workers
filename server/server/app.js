const express =  require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const cors = require('cors');
const schema = require('../schema/schema');
const PORT = 3050;

const app = express();

mongoose.connect('mongodb://alexkurilo:alex77@ds131711.mlab.com:31711/control_of_workers', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
});

app.use(cors());

app.use('/', graphqlHTTP({
    schema,
    graphiql: true,
}));

const dbConnection = mongoose.connection;
dbConnection.on('error', err => console.log(`Connection error: ${err}`));
dbConnection.once('open', () => console.log('Connected to DB!'));

app.listen(PORT, error => {
    error ? console.log(error) : console.log(`server started on port ${PORT}`);
});
