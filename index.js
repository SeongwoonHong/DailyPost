const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const connectMongo = require('connect-mongo');
const keys = require('./config/keys');
const MongoStore = connectMongo(session);

const app = express();
const PORT = process.env.PORT || 5000;

const api = require('./routes');

mongoose.connect(keys.mongoURI, { useMongoClient: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => {
  console.log('database is connected');
})
app.use(session({
  secret: 'web^%$ is $@#$ FuN!~@#',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));
app.use(bodyParser.json());
// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, './client/public')));
app.use('/api', api);
// Answer API requests.


// All remaining requests return the React app, so it can handle routing.
app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, './client/public', 'index.html'));
});

app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});
