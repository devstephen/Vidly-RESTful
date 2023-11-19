require('express-async-errors')
const winston = require('winston')
const express = require('express')
const app = express()

require('./startup/routes')(app)
require('./startup/db')()
// require('./startup/config')()
require('./startup/validate')()

const port = process.env.PORT || 3000
app.listen(port, () => winston.info(`Listening on port ${port}...`))
