const db = require('../database/db');

const getPromises = (request, response) => {
    db.query('SELECT * FROM Promise ORDER BY Promise_id', (error, results) => {
      if (error) {
        response.status(500).json({ message: error.message });
      }
      response.status(200).json(results.rows)
    })
  }

const getPromiseById = (request, response) => {
const id = parseInt(request.params.id)

db.query('SELECT * FROM Promise WHERE Promise_id = $1', [id], (error, results) => {
    if (error) {
    response.status(500).json({ message: error.message });
    }
    response.status(200).json(results.rows)
})
}

const createPromise = (request, response) => {
const { name, email } = request.body

db.query('INSERT INTO Promise (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
    if (error) {
    response.status(500).json({ message: error.message });
    }
    response.status(201).send(`Promise added with ID: ${results.insertId}`)
})
}

const updatePromise = (request, response) => {
const id = parseInt(request.params.id)
const { name, email } = request.body

db.query(
    'UPDATE Promise SET name = $1 WHERE Promise_id = $3',
    [name, email, id],
    (error, results) => {
    if (error) {
        response.status(500).json({ message: error.message });
    }
    response.status(200).send(`Promise modified with ID: ${id}`)
    }
)
}

const deletePromise = (request, response) => {
const id = parseInt(request.params.id)

db.query('DELETE FROM Promise WHERE Promise_id = $1', [id], (error, results) => {
    if (error) {
    response.status(500).json({ message: error.message });
    }
    response.status(200).send(`Promise deleted with ID: ${id}`)
})
}
  
  module.exports = {
    getPromises,
    getPromiseById,
    createPromise,
    updatePromise,
    deletePromise,
  }