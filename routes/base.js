const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
  // Render html
  res.render('index', { title: 'Express-Demo 😉', message: 'Engine' })
  // res.send(genres)
})

module.exports = router
