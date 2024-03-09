const db = require('../database/db');

const getTransactions = (request, response) => {
    db.query('SELECT * FROM Transactions', (error, results) => {
      if (error) {
        response.status(500).json({ message: error.message });
      }
      response.status(200).json(results.rows)
    })
  }

const getTransactionById = async (req, res) => {
    const TransactionId = req.params.id;
  
    try {
      const result = await db.query('SELECT * FROM Transactions WHERE Transaction_id = $1', [TransactionId]);
  
      if (result.rows.length > 0) {
        res.status(200).json(result.rows[0]);
      } else {
        res.status(404).json({ message: 'Transaction not found' });
      }
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  const createTransaction = async (req, res) => {
    const { source_id, destination_id, date, amount } = req.body;
  
    try {
      const result = await db.query('INSERT INTO Transactions (source_id, destination_id, date, amount) VALUES ($1, $2, $3, $4) RETURNING *', [source_id, destination_id, date, amount]);
  
      if (result.rows.length > 0) {
        res.status(201).json(result.rows[0]);
      } else {
        res.status(500).json({ message: 'Failed to create Transaction' });
      }
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  const updateTransaction = async (req, res) => {
    const TransactionId = req.params.id;
    const { source_id, destination_id, date, amount } = req.body;
  
    try {
      const result = await db.query('UPDATE Transactions SET source_id = $2, destination_id = $3, date = $4, amount = $5 WHERE Transaction_id = $1 RETURNING *', [TransactionId, source_id, destination_id, date, amount]);
  
      if (result.rows.length > 0) {
        res.status(200).json(result.rows[0]);
      } else {
        res.status(404).json({ message: 'Transaction not found' });
      }
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  const deleteTransaction = async (req, res) => {
    const TransactionId = req.params.id;
  
    try {
      const result = await db.query('DELETE FROM Transactions WHERE Transaction_id = $1 RETURNING *', [TransactionId]);
  
      if (result.rows.length > 0) {
        res.status(200).json({ message: 'Transaction deleted successfully' });
      } else {
        res.status(404).json({ message: 'Transaction not found' });
      }
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  // eslint-disable-next-line no-undef
  module.exports = {
    getTransactions,
    getTransactionById,
    createTransaction,
    updateTransaction,
    deleteTransaction,
  }