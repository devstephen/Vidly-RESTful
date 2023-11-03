const Joi = require('joi')
const auth = require('./auth')
const logger = require('./logger')
const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

// Custom middleware
app.use(logger)
app.use(auth)

const genres = [
  { id: 1, genre: 'Action' },
  { id: 2, genre: 'Thriller' },
  { id: 3, name: 'Crime' },
  { id: 4, name: 'Comedy' },
  { id: 5, name: 'Romance' },
  { id: 6, name: 'Sci-Fi' },
]

// Home Route
app.get('/', (req, res) => {
  res.send(genres)
})

// Route for List of Genres
app.get('/api/genres', (req, res) => {
  res.send(genres)
})

// Route for Genre
app.get('/api/genres/:id', (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id))
  if (!genre) return res.status(404).send('The requested genre was not found')
  res.send(genre)
})

// Route to post genre
app.post('/api/genres', (req, res) => {
  const { error } = validateGenre(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  const genre = {
    id: genres.length + 1,
    genre: req.body.genre,
  }

  genres.push(genre)
  res.send(genre)
})

// Route to edit genre
app.put('/api/genres/:id', (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id))
  if (!genre)
    return res.status(404).send('The requested resource was not found')

  const { error } = validateGenre(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  genre.genre = req.body.name
  res.send(genre)
})

// Route to delete genre
app.delete('/api/genres/:id', (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id))
  if (!genre)
    return res.status(404).send('The requested resource was not found')

  const index = genres.indexOf(genre)
  genres.splice(index, 1)

  res.send(genre)
})

// Reusable validation
function validateGenre(genre) {
  const schema = {
    genre: Joi.string().min(3).required(),
  }

  return (result = Joi.validate(genre, schema))
}

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on ${port}`))
