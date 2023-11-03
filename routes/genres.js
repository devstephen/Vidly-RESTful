const express = require('express')
const router = express.Router()

const genres = [
  { id: 1, genre: 'Action' },
  { id: 2, genre: 'Thriller' },
  { id: 3, name: 'Crime' },
  { id: 4, name: 'Comedy' },
  { id: 5, name: 'Romance' },
  { id: 6, name: 'Sci-Fi' },
]

// Route for List of Genres
router.get('/', (req, res) => {
  res.send(genres)
})

// Route for Genre
router.get('/:id', (req, res) => {
  const genre = genres.find((g) => g.id === req.params.id)
  if (!genre) return res.status(404).send('The requested genre was not found')
  res.send(genre)
})

// Route to post genre
router.post('/', (req, res) => {
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
router.put('/:id', (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id))
  if (!genre)
    return res.status(404).send('The requested resource was not found')

  const { error } = validateGenre(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  genre.genre = req.body.name
  res.send(genre)
})

// Route to delete genre
router.delete('/:id', (req, res) => {
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

module.exports = router
