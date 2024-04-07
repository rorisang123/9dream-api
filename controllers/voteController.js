const db = require('../database/db');

const getVotes = (request, response) => {
    db.query('SELECT * FROM Votes', (error, results) => {
      if (error) {
        response.status(500).json({ message: error.message });
      }
      response.status(200).json(results.rows)
    })
  }

const getVoteById = async (req, res) => {
    const VoteId = req.params.id;
  
    try {
      const result = await db.query('SELECT * FROM Votes WHERE Vote_id = $1', [VoteId]);
  
      if (result.rows.length > 0) {
        res.status(200).json(result.rows[0]);
      } else {
        res.status(404).json({ message: 'Vote not found' });
      }
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  const getNumberOfvotes = async (request, response) => {
    db.query('SELECT count(*) FROM votes', (error, results) => {
      if (error) {
        response.status(500).json({ message: error.message });
      }
      response.status(200).json(results.rows)
    })
  };
  
  const createVote = async (req, res) => {
    const { voter_id, campaign_id, date } = req.body;
  
    try {
      const result = await db.query('INSERT INTO Votes (voter_id, campaign_id, date) VALUES ($1, $2, $3) RETURNING *', [voter_id, campaign_id, date]);
  
      if (result.rows.length > 0) {
        res.status(201).json(result.rows[0]);
      } else {
        res.status(500).json({ message: 'Failed to create Vote' });
      }
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  const updateVote = async (req, res) => {
    const VoteId = req.params.id;
    const { voter_id, campaign_id, date } = req.body;
  
    try {
      const result = await db.query('UPDATE Votes SET voter_id = $2, campaign_id = $3, date = $4 WHERE Vote_id = $1 RETURNING *', [VoteId, voter_id, campaign_id, date]);
  
      if (result.rows.length > 0) {
        res.status(200).json(result.rows[0]);
      } else {
        res.status(404).json({ message: 'Vote not found' });
      }
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  const deleteVote = async (req, res) => {
    const VoteId = req.params.id;
  
    try {
      const result = await db.query('DELETE FROM Votes WHERE Vote_id = $1 RETURNING *', [VoteId]);
  
      if (result.rows.length > 0) {
        res.status(200).json({ message: 'Vote deleted successfully' });
      } else {
        res.status(404).json({ message: 'Vote not found' });
      }
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  // eslint-disable-next-line no-undef
  module.exports = {
    getVotes,
    getVoteById,
    getNumberOfvotes,
    createVote,
    updateVote,
    deleteVote,
  }