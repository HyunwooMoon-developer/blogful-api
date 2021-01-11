/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const {NODE_ENV} = require('./config');
const errorHandler = require('./errorHandler')
const articlesRouter = require('./articles/articles-router')
const usersRouter = require('./users/user-router')
const CommentsService = require('./comments/comments-service')
const commentsRouter = require('./comments/comments-router')


const app = express()
//pipeline begins
//standard middleware
const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())

app.use('/api/articles', articlesRouter)
app.use('/api/users', usersRouter)
app.use('/api/comments', commentsRouter)

//route
app.get('/', (req, res) => {
    res.send('Hello, boilerplate!');
})
//app.use(validateBearerToken);

app.get('/xss', (req, res) => {
  res.cookie('secretToken', '1234567890');
  res.sendFile(__dirname + '/xss-example.html');
});
//error handler
app.use(errorHandler);

module.exports = app