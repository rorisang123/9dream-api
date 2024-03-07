const db = require('../database/db');

const getUsers = (request, response) => {
    db.query('SELECT * FROM users', (error, results) => {
      if (error) {
        response.status(500).json({ message: error.message });
      }
      response.status(200).json(results.rows)
    })
  }

  const getUserById = async (req, res) => {
    const userId = req.params.id;
  
    try {
      const result = await db.query('SELECT * FROM users WHERE user_id = $1', [userId]);
  
      if (result.rows.length > 0) {
        res.status(200).json(result.rows[0]);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  const createUser = async (req, res) => {
    const { date_of_birth, gender, wallet_address, first_name, last_name, email } = req.body;
  
    try {
      const result = await db.query('INSERT INTO users (date_of_birth, gender, wallet_address, first_name, last_name, email) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [date_of_birth, gender, wallet_address, first_name, last_name, email]);
  
      if (result.rows.length > 0) {
        res.status(201).json(result.rows[0]);
      } else {
        res.status(500).json({ message: 'Failed to create user' });
      }
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  const updateUser = async (req, res) => {
    const userId = req.params.id;
    const { date_of_birth, gender, wallet_address, first_name, last_name,  email } = req.body;
  
    try {
      const result = await db.query('UPDATE users SET date_of_birth = $2, gender = $3, wallet_address = $4, first_name = $5, last_name = $6,  email = $7 WHERE user_id = $1 RETURNING *', [userId, date_of_birth, gender, wallet_address, first_name, last_name,  email]);
  
      if (result.rows.length > 0) {
        res.status(200).json(result.rows[0]);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  const deleteUser = async (req, res) => {
    const userId = req.params.id;
  
    try {
      const result = await db.query('DELETE FROM users WHERE user_id = $1 RETURNING *', [userId]);
  
      if (result.rows.length > 0) {
        res.status(200).json({ message: 'User deleted successfully' });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  // eslint-disable-next-line no-undef
  module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
  }