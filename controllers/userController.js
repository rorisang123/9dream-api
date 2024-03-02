const db = require('../database/db');

const getUsers = (request, response) => {
    db.query('SELECT * FROM users ORDER BY user_id', (error, results) => {
      if (error) {
        response.status(500).json({ message: error.message });
      }
      response.status(200).json(results.rows)
    })
  }

  const getUserById = (request, response) => {
    const id = parseInt(request.params.id)
  
    db.query('SELECT * FROM users WHERE user_id = $1', [id], (error, results) => {
      if (error) {
        response.status(500).json({ message: error.message });
      }
      response.status(200).json(results.rows)
    })
  }
  
  const createUser = (request, response) => {
    const { name, email } = request.body
  
    db.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
      if (error) {
        response.status(500).json({ message: error.message });
      }
      response.status(201).send(`User added with ID: ${results.insertId}`)
    })
  }
  
  const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const { name, email } = request.body
  
    db.query(
      'UPDATE users SET name = $1, email = $2 WHERE user_id = $3',
      [name, email, id],
      (error, results) => {
        if (error) {
          response.status(500).json({ message: error.message });
        }
        response.status(200).send(`User modified with ID: ${id}`)
      }
    )
  }
  
  const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)
  
    db.query('DELETE FROM users WHERE user_id = $1', [id], (error, results) => {
      if (error) {
        response.status(500).json({ message: error.message });
      }
      response.status(200).send(`User deleted with ID: ${id}`)
    })
  }
  
  module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
  }