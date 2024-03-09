const db = require('../database/db');

const getVoters = (request, response) => {
    db.query('SELECT * FROM Voters', (error, results) => {
      if (error) {
        response.status(500).json({ message: error.message });
      }
      response.status(200).json(results.rows)
    })
  }

const getVoterById = async (req, res) => {
    const VoterId = req.params.id;
  
    try {
      const result = await db.query('SELECT * FROM Voters WHERE Voter_id = $1', [VoterId]);
  
      if (result.rows.length > 0) {
        res.status(200).json(result.rows[0]);
      } else {
        res.status(404).json({ message: 'Voter not found' });
      }
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  const createVoter = async (req, res) => {
    const { registration_status, user_id } = req.body;
  
    try {
      const result = await db.query('INSERT INTO Voters (registration_status, user_id) VALUES ($1, $2) RETURNING *', [registration_status, user_id]);
  
      if (result.rows.length > 0) {
        res.status(201).json(result.rows[0]);
      } else {
        res.status(500).json({ message: 'Failed to create Voter' });
      }
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  const updateVoter = async (req, res) => {
    const VoterId = req.params.id;
    const { registration_status, user_id } = req.body;
  
    try {
      const result = await db.query('UPDATE Voters SET registration_status = $2, user_id = $3 WHERE Voter_id = $1 RETURNING *', [VoterId, registration_status, user_id]);
  
      if (result.rows.length > 0) {
        res.status(200).json(result.rows[0]);
      } else {
        res.status(404).json({ message: 'Voter not found' });
      }
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  const deleteVoter = async (req, res) => {
    const VoterId = req.params.id;
  
    try {
      const result = await db.query('DELETE FROM Voters WHERE Voter_id = $1 RETURNING *', [VoterId]);
  
      if (result.rows.length > 0) {
        res.status(200).json({ message: 'Voter deleted successfully' });
      } else {
        res.status(404).json({ message: 'Voter not found' });
      }
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  // eslint-disable-next-line no-undef
  module.exports = {
    getVoters,
    getVoterById,
    createVoter,
    updateVoter,
    deleteVoter,
  }