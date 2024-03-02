const db = require('../database/db');

const getVotes = (request, response) => {
    db.query('SELECT * FROM Vote ORDER BY Vote_id', (error, results) => {
      if (error) {
        response.status(500).json({ message: error.message });
      }
      response.status(200).json(results.rows)
    })
  }

const getVoteById = (request, response) => {
const id = parseInt(request.params.id)

db.query('SELECT * FROM Vote WHERE Vote_id = $1', [id], (error, results) => {
    if (error) {
    response.status(500).json({ message: error.message });
    }
    response.status(200).json(results.rows)
})
}

const createVote = (request, response) => {
const { name, email } = request.body

db.query('INSERT INTO Vote (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
    if (error) {
    response.status(500).json({ message: error.message });
    }
    response.status(201).send(`Vote added with ID: ${results.insertId}`)
})
}

const updateVote = (request, response) => {
const id = parseInt(request.params.id)
const { name, email } = request.body

db.query(
    'UPDATE Vote SET name = $1 WHERE Vote_id = $3',
    [name, email, id],
    (error, results) => {
    if (error) {
        response.status(500).json({ message: error.message });
    }
    response.status(200).send(`Vote modified with ID: ${id}`)
    }
)
}

const deleteVote = (request, response) => {
const id = parseInt(request.params.id)

db.query('DELETE FROM Vote WHERE Vote_id = $1', [id], (error, results) => {
    if (error) {
    response.status(500).json({ message: error.message });
    }
    response.status(200).send(`Vote deleted with ID: ${id}`)
})
}
  
  module.exports = {
    getVotes,
    getVoteById,
    createVote,
    updateVote,
    deleteVote,
  }