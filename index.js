const debug = require('debug')('app:startup')
const config = require('config')
const morgan = require('morgan')
const helmet = require('helmet')
const Joi = require('joi')
const auth = require('./auth')
const logger = require('./middleware/logger')
const baseRoute = require('./routes/base')
const genres = require('./routes/genres')
const express = require('express')
const app = express()

// View engine
app.set('view engine', 'pug')
app.set('views', './views')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(helmet())
app.use('/', baseRoute)
app.use('/api/genres', genres)

//Configuration
console.log(`Application Name: ${config.get('name')}`)
console.log(`Mail Server: ${config.get('mail.host')}`)
console.log(`Mail Server: ${config.get('mail.password')}`)

if (app.get('env') === 'development') {
  app.use(morgan('tiny'))
  debug('Using morgan')
}

app.use(logger)
app.use(auth)

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on ${port}`))
