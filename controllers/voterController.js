const db = require('../database/db');

const getVoters = (request, response) => {
    db.query('SELECT * FROM Voter ORDER BY Voter_id', (error, results) => {
      if (error) {
        response.status(500).json({ message: error.message });
      }
      response.status(200).json(results.rows)
    })
  }

const getVoterById = (request, response) => {
const id = parseInt(request.params.id)

db.query('SELECT * FROM Voter WHERE Voter_id = $1', [id], (error, results) => {
    if (error) {
    response.status(500).json({ message: error.message });
    }
    response.status(200).json(results.rows)
})
}

const createVoter = (request, response) => {
const { name, email } = request.body

db.query('INSERT INTO Voter (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
    if (error) {
    response.status(500).json({ message: error.message });
    }
    response.status(201).send(`Voter added with ID: ${results.insertId}`)
})
}

const updateVoter = (request, response) => {
const id = parseInt(request.params.id)
const { name, email } = request.body

db.query(
    'UPDATE Voter SET name = $1 WHERE Voter_id = $3',
    [name, email, id],
    (error, results) => {
    if (error) {
        response.status(500).json({ message: error.message });
    }
    response.status(200).send(`Voter modified with ID: ${id}`)
    }
)
}

const deleteVoter = (request, response) => {
const id = parseInt(request.params.id)

db.query('DELETE FROM Voter WHERE Voter_id = $1', [id], (error, results) => {
    if (error) {
    response.status(500).json({ message: error.message });
    }
    response.status(200).send(`Voter deleted with ID: ${id}`)
})
}
  
  module.exports = {
    getVoters,
    getVoterById,
    createVoter,
    updateVoter,
    deleteVoter,
  }