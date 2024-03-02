const db = require('../database/db');

const getOrganisations = (request, response) => {
    db.query('SELECT * FROM Organisation ORDER BY Organisation_id', (error, results) => {
      if (error) {
        response.status(500).json({ message: error.message });
      }
      response.status(200).json(results.rows)
    })
  }

const getOrganisationById = (request, response) => {
const id = parseInt(request.params.id)

db.query('SELECT * FROM Organisation WHERE Organisation_id = $1', [id], (error, results) => {
    if (error) {
    response.status(500).json({ message: error.message });
    }
    response.status(200).json(results.rows)
})
}

const createOrganisation = (request, response) => {
const { name, email } = request.body

db.query('INSERT INTO Organisation (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
    if (error) {
    response.status(500).json({ message: error.message });
    }
    response.status(201).send(`Organisation added with ID: ${results.insertId}`)
})
}

const updateOrganisation = (request, response) => {
const id = parseInt(request.params.id)
const { name, email } = request.body

db.query(
    'UPDATE Organisation SET name = $1 WHERE Organisation_id = $3',
    [name, email, id],
    (error, results) => {
    if (error) {
        response.status(500).json({ message: error.message });
    }
    response.status(200).send(`Organisation modified with ID: ${id}`)
    }
)
}

const deleteOrganisation = (request, response) => {
const id = parseInt(request.params.id)

db.query('DELETE FROM Organisation WHERE Organisation_id = $1', [id], (error, results) => {
    if (error) {
    response.status(500).json({ message: error.message });
    }
    response.status(200).send(`Organisation deleted with ID: ${id}`)
})
}
  
  module.exports = {
    getOrganisations,
    getOrganisationById,
    createOrganisation,
    updateOrganisation,
    deleteOrganisation,
  }