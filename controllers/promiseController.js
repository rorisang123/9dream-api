const db = require('../database/db');

const getPromises = (request, response) => {
    db.query('SELECT * FROM promises', (error, results) => {
      if (error) {
        response.status(500).json({ message: error.message });
      }
      response.status(200).json(results.rows)
    })
}

const getPromiseById = (request, response) => {
  db.query('SELECT * FROM promises WHERE promise_id = $1', [promise_id], (error, results) => {
    if (error) {
      response.status(500).json({ message: error.message });
    }
    response.status(200).json(results.rows)
  })
}

  const getPromiseByCampaignId = async (request, response) => {
    const campaign_id = request.params.id;
  
    try {
      const dbResult = await db.query(`SELECT promises.*, organisations.name as organisation_name
      FROM promises
      JOIN organisations ON promises.organisation_id = organisations.organisation_id
      WHERE promises.campaign_id = $1;
      `, [campaign_id]);
  
      if (dbResult.rows.length > 0) {
        response.status(200).json(dbResult.rows[0]);
      } else {
        response.status(404).json({ message: 'Promise not found' });
      }
    } catch (err) {
      console.error('Error executing query', err);
      response.status(500).json({ message: 'Internal server error' });
    }
  };

  const getCampaignBudget = async (req, res) => {
    const campaignId = req.params.campaign_id;
  
    try {
      const result = await db.query('SELECT SUM(promise_value) FROM promises where campaign_id = $1', [campaignId]);
  
      if (result.rows.length > 0) {
        res.status(200).json(result.rows[0]);
      } else {
        res.status(404).json({ message: 'Promise not found' });
      }
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).json({ message: 'Internal server error' });
    }
}
  
  const createPromise = async (req, res) => {
    const { smart_contract_address, owner_id, organisation_id, timestamp, value, campaign_id } = req.body;
  
    try {
      const result = await db.query('INSERT INTO Promises (smart_contract_address, owner_id, organisation_id, promise_timestamp, promise_value, campaign_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [smart_contract_address, owner_id, organisation_id, timestamp, value, campaign_id]);
  
      if (result.rows.length > 0) {
        res.status(201).json(result.rows[0]);
      } else {
        res.status(500).json({ message: 'Failed to create Promise' });
      }
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  const updatePromise = async (req, res) => {
    const PromiseId = req.params.id;
    const { smart_contract_address, owner_id, organisation_id, timestamp, value, campaign_id } = req.body;
  
    try {
      const result = await db.query('UPDATE Promises SET smart_contract_address = $2, owner_id = $3, organisation_id = $4, timestamp = $5, value = $6, campaign_id = $7 WHERE Promise_id = $1 RETURNING *', [PromiseId, smart_contract_address, owner_id, organisation_id, timestamp, value, campaign_id]);
  
      if (result.rows.length > 0) {
        res.status(200).json(result.rows[0]);
      } else {
        res.status(404).json({ message: 'Promise not found' });
      }
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  const deletePromise = async (req, res) => {
    const PromiseId = req.params.id;
  
    try {
      const result = await db.query('DELETE FROM Promises WHERE Promise_id = $1 RETURNING *', [PromiseId]);
  
      if (result.rows.length > 0) {
        res.status(200).json({ message: 'Promise deleted successfully' });
      } else {
        res.status(404).json({ message: 'Promise not found' });
      }
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  // eslint-disable-next-line no-undef
  module.exports = {
    getPromises,
    getPromiseById,
    getPromiseByCampaignId,
    getCampaignBudget,
    createPromise,
    updatePromise,
    deletePromise,
  }