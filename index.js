const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

const api = require('./routes');
// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, './client/build')));
app.use('/api', api);
// Answer API requests.


// All remaining requests return the React app, so it can handle routing.
app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});

app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});
