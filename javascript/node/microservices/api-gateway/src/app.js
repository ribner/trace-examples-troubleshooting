'use strict'

const axios = require('axios')
const cors = require('cors')
const express = require('express')
const expressWinston = require('express-winston')
const logger = require('./logger')
const {tracer} = require('./utils')
const APM = require('@gamechanger/datadog-apm')
const app = express()

app.use(cors())
app.use(expressWinston.logger({
  winstonInstance: logger
}))


app.get('/users', (req, res) => {
  
  axios.get('http://auth:8080/.well-known/jwks.json')
    .then(() => {
      throw new Error('Faking Bad Auth | code 15')
      return axios.post('http://user:8080/graphql', {
        query: `{ users { name age } }`
      }, {
        headers: { 'Content-Type': 'application/json' }
      })
    })
    .then(response => {
      res.status(200).send(response.data.data)
    })
    .catch((e) => {
      const span = tracer.scope().active();
      
      if (span) {
        
        span.addTags({
          errorMessage: e.message,
          'error.message': e.message,
          'error.type': 16,
          'error.stack': e.stack
        })
        
        span.log({ 'error.code': 16, 'error.description': e.toString() })
      }

      logger.log({level: 'error', message: JSON.stringify({content: e.message, stackTrace: e.stack})})
      res.status(502).send({message: 'bad auth'})
    })
})

app.use(expressWinston.errorLogger({
  winstonInstance: logger
}))

module.exports = app
