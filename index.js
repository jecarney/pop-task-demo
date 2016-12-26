require('dotenv').config();

var express = require('express');
var app = express();

var webpack = require('webpack');
var webpackMiddleware = require('webpack-dev-middleware');

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_SERVER||"mongodb://localhost/pop-done");

var bodyParser = require('body-parser');
app.use(bodyParser.json());

mongoose.Promise = require('bluebird');

// Serve bundle.js
app.use(webpackMiddleware(webpack(require('./webpack.config.js'))));

// Serve your static assets here. You'll need to use express.static middleware.
app.use(express.static('public'));

// Serve your API assets here. You'll need to include the route file.
app.use('/api/bubbles', require('./api/bubbles'));
app.use('/api/popped', require('./api/popped'));
app.use('/api/backlog', require('./api/backlog'));

// If none of the above matches, serve public/index.html.
app.get('*', (req, res) => res.sendFile(__dirname + '/public/index.html'))


app.listen(process.env.PORT || 8080);
