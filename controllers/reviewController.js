const db = require('../database/db');

const getReviews = (request, response) => {
    db.query('SELECT * FROM Reviews', (error, results) => {
      if (error) {
        response.status(500).json({ message: error.message });
      }
      response.status(200).json(results.rows)
    })
  }

const getReviewById = async (req, res) => {
    const ReviewId = req.params.id;
  
    try {
      const result = await db.query('SELECT * FROM Reviews WHERE Review_id = $1', [ReviewId]);
  
      if (result.rows.length > 0) {
        res.status(200).json(result.rows[0]);
      } else {
        res.status(404).json({ message: 'Review not found' });
      }
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  const createReview = async (req, res) => {
    const { expert_id, promise_id, date, description } = req.body;
  
    try {
      const result = await db.query('INSERT INTO Reviews (expert_id, promise_id, date, description) VALUES ($1, $2, $3, $4) RETURNING *', [expert_id, promise_id, date, description]);
  
      if (result.rows.length > 0) {
        res.status(201).json(result.rows[0]);
      } else {
        res.status(500).json({ message: 'Failed to create Review' });
      }
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  const updateReview = async (req, res) => {
    const ReviewId = req.params.id;
    const { expert_id, promise_id, date, description } = req.body;
  
    try {
      const result = await db.query('UPDATE Reviews SET expert_id = $2, promise_id = $3, date = $4, description = $5 WHERE Review_id = $1 RETURNING *', [ReviewId, expert_id, promise_id, date, description]);
  
      if (result.rows.length > 0) {
        res.status(200).json(result.rows[0]);
      } else {
        res.status(404).json({ message: 'Review not found' });
      }
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  const deleteReview = async (req, res) => {
    const ReviewId = req.params.id;
  
    try {
      const result = await db.query('DELETE FROM Reviews WHERE Review_id = $1 RETURNING *', [ReviewId]);
  
      if (result.rows.length > 0) {
        res.status(200).json({ message: 'Review deleted successfully' });
      } else {
        res.status(404).json({ message: 'Review not found' });
      }
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  // eslint-disable-next-line no-undef
  module.exports = {
    getReviews,
    getReviewById,
    createReview,
    updateReview,
    deleteReview,
  }