const db = require('../database/db');

const getExperts = (request, response) => {
    db.query('SELECT * FROM experts', (error, results) => {
      if (error) {
        response.status(500).json({ message: error.message });
      }
      response.status(200).json(results.rows)
    })
  }

const getExpertById = async (req, res) => {
    const ExpertId = req.params.id;
  
    try {
      const result = await db.query('SELECT * FROM Experts WHERE Expert_id = $1', [ExpertId]);
  
      if (result.rows.length > 0) {
        res.status(200).json(result.rows[0]);
      } else {
        res.status(404).json({ message: 'Expert not found' });
      }
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  const createExpert = async (req, res) => {
    const { qualification, political_stance, user_id } = req.body;
  
    try {
      const result = await db.query('INSERT INTO Experts (qualification, political_stance, user_id) VALUES ($1, $2, $3) RETURNING *', [qualification, political_stance, user_id]);
  
      if (result.rows.length > 0) {
        res.status(201).json(result.rows[0]);
      } else {
        res.status(500).json({ message: 'Failed to create Expert' });
      }
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  const updateExpert = async (req, res) => {
    const ExpertId = req.params.id;
    const { qualification, political_stance, user_id } = req.body;
  
    try {
      const result = await db.query('UPDATE Experts SET qualification = $2, political_stance = $3, user_id = $4 WHERE Expert_id = $1 RETURNING *', [ExpertId, qualification, political_stance, user_id]);
  
      if (result.rows.length > 0) {
        res.status(200).json(result.rows[0]);
      } else {
        res.status(404).json({ message: 'Expert not found' });
      }
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  const deleteExpert = async (req, res) => {
    const ExpertId = req.params.id;
  
    try {
      const result = await db.query('DELETE FROM Experts WHERE Expert_id = $1 RETURNING *', [ExpertId]);
  
      if (result.rows.length > 0) {
        res.status(200).json({ message: 'Expert deleted successfully' });
      } else {
        res.status(404).json({ message: 'Expert not found' });
      }
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  // eslint-disable-next-line no-undef
  module.exports = {
    getExperts,
    getExpertById,
    createExpert,
    updateExpert,
    deleteExpert,
  }