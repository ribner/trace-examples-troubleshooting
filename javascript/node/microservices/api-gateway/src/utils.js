const logger = require('./logger')
const tracer = require('dd-trace').init({ logger, logInjection: true })

module.exports = {
    tracer
}