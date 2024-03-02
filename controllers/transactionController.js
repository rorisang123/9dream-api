const db = require('../database/db');

const getTransactions = (request, response) => {
    db.query('SELECT * FROM Transaction ORDER BY Transaction_id', (error, results) => {
      if (error) {
        response.status(500).json({ message: error.message });
      }
      response.status(200).json(results.rows)
    })
  }

const getTransactionById = (request, response) => {
const id = parseInt(request.params.id)

db.query('SELECT * FROM Transaction WHERE Transaction_id = $1', [id], (error, results) => {
    if (error) {
    response.status(500).json({ message: error.message });
    }
    response.status(200).json(results.rows)
})
}

const createTransaction = (request, response) => {
const { name, email } = request.body

db.query('INSERT INTO Transaction (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
    if (error) {
    response.status(500).json({ message: error.message });
    }
    response.status(201).send(`Transaction added with ID: ${results.insertId}`)
})
}

const updateTransaction = (request, response) => {
const id = parseInt(request.params.id)
const { name, email } = request.body

db.query(
    'UPDATE Transaction SET name = $1 WHERE Transaction_id = $3',
    [name, email, id],
    (error, results) => {
    if (error) {
        response.status(500).json({ message: error.message });
    }
    response.status(200).send(`Transaction modified with ID: ${id}`)
    }
)
}

const deleteTransaction = (request, response) => {
const id = parseInt(request.params.id)

db.query('DELETE FROM Transaction WHERE Transaction_id = $1', [id], (error, results) => {
    if (error) {
    response.status(500).json({ message: error.message });
    }
    response.status(200).send(`Transaction deleted with ID: ${id}`)
})
}
  
  module.exports = {
    getTransactions,
    getTransactionById,
    createTransaction,
    updateTransaction,
    deleteTransaction,
  }