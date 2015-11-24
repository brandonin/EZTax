// require express so that we can build an express app
var express = require('express');
// require path so that we can use path stuff like path.join
var path = require('path');
var bodyParser = require('body-parser');
// instantiate the app
var app = express();
// set up a static file server that points to the "client" directory
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./server/config/mongoose.js');
require('./server/config/routes.js')(app);


app.use(express.static(path.join(__dirname, './client')));
app.listen(8888, function() {
  console.log('cool stuff on: 8888');
});
