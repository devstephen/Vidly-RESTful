const winston = require('winston')
require('winston-mongodb')
require('express-async-errors')

module.exports = function () {
  new winston.handleExceptions(
    new winston.transports.Console({ colorize: true })
    new winston.transports.File({ filename: 'uncaughtExceptions.log' })

    process.on('unhandledRejection', (ex) => {
        throw (ex)
    })
  )
  
}
