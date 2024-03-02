const db = require('../database/db');

const getExperts = (request, response) => {
    db.query('SELECT * FROM Expert ORDER BY Expert_id', (error, results) => {
      if (error) {
        response.status(500).json({ message: error.message });
      }
      response.status(200).json(results.rows)
    })
  }

const getExpertById = (request, response) => {
const id = parseInt(request.params.id)

db.query('SELECT * FROM Expert WHERE Expert_id = $1', [id], (error, results) => {
    if (error) {
    response.status(500).json({ message: error.message });
    }
    response.status(200).json(results.rows)
})
}

const createExpert = (request, response) => {
const { name, email } = request.body

db.query('INSERT INTO Expert (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
    if (error) {
    response.status(500).json({ message: error.message });
    }
    response.status(201).send(`Expert added with ID: ${results.insertId}`)
})
}

const updateExpert = (request, response) => {
const id = parseInt(request.params.id)
const { name, email } = request.body

db.query(
    'UPDATE Expert SET name = $1 WHERE Expert_id = $3',
    [name, email, id],
    (error, results) => {
    if (error) {
        response.status(500).json({ message: error.message });
    }
    response.status(200).send(`Expert modified with ID: ${id}`)
    }
)
}

const deleteExpert = (request, response) => {
const id = parseInt(request.params.id)

db.query('DELETE FROM Expert WHERE Expert_id = $1', [id], (error, results) => {
    if (error) {
    response.status(500).json({ message: error.message });
    }
    response.status(200).send(`Expert deleted with ID: ${id}`)
})
}
  
  module.exports = {
    getExperts,
    getExpertById,
    createExpert,
    updateExpert,
    deleteExpert,
  }