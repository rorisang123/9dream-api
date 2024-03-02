const db = require('../database/db');

const getReviews = (request, response) => {
    db.query('SELECT * FROM Review ORDER BY Review_id', (error, results) => {
      if (error) {
        response.status(500).json({ message: error.message });
      }
      response.status(200).json(results.rows)
    })
  }

const getReviewById = (request, response) => {
const id = parseInt(request.params.id)

db.query('SELECT * FROM Review WHERE Review_id = $1', [id], (error, results) => {
    if (error) {
    response.status(500).json({ message: error.message });
    }
    response.status(200).json(results.rows)
})
}

const createReview = (request, response) => {
const { name, email } = request.body

db.query('INSERT INTO Review (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
    if (error) {
    response.status(500).json({ message: error.message });
    }
    response.status(201).send(`Review added with ID: ${results.insertId}`)
})
}

const updateReview = (request, response) => {
const id = parseInt(request.params.id)
const { name, email } = request.body

db.query(
    'UPDATE Review SET name = $1 WHERE Review_id = $3',
    [name, email, id],
    (error, results) => {
    if (error) {
        response.status(500).json({ message: error.message });
    }
    response.status(200).send(`Review modified with ID: ${id}`)
    }
)
}

const deleteReview = (request, response) => {
const id = parseInt(request.params.id)

db.query('DELETE FROM Review WHERE Review_id = $1', [id], (error, results) => {
    if (error) {
    response.status(500).json({ message: error.message });
    }
    response.status(200).send(`Review deleted with ID: ${id}`)
})
}
  
  module.exports = {
    getReviews,
    getReviewById,
    createReview,
    updateReview,
    deleteReview,
  }