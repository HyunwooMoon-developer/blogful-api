/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const {NODE_ENV} = require('./config');
const ArticlesService = require('./article-service');
const errorHandler = require('./errorHandler')
const validateBearerToken = require('./validateBearerToken')

const app = express()
//pipeline begins
//standard middleware
const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())

app.get('/articles', (req, res, next) => {
  const db = req.app.get('db')
  ArticlesService.getAllArticles(db)
  .then(articles => {
    res.json(articles)
  })
  .catch(next)
})

app.get('/articles/:article_id', (req, res, next) => {
  const db = req.app.get('db')
    ArticlesService.getById(db, req.params.article_id)
    .then(article => {
      if(!article){
        return res.status(404).json({
          error: {message: `Article doesn't exist`}
        })
      }
      res.json({
        id: article.id,
        title: article.title,
        style: article.style,
        content: article.content,
        date_published: new Date(article.date_published),
      })
    })
    .catch(next)
})

//route
app.get('/', (req, res) => {
    res.send('Hello, boilerplate!');
})
//app.use(validateBearerToken);

//error handler
app.use(errorHandler);

module.exports = app