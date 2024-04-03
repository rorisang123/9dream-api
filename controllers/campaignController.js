const db = require('../database/db');

const getCampaigns = (request, response) => {
    db.query('SELECT * FROM campaigns', (error, results) => {
      if (error) {
        response.status(500).json({ message: error.message });
      }
      response.status(200).json(results.rows)
    })
  }

  const getNumberOfCampaigns = async (request, response) => {
    db.query('SELECT count(*) FROM campaigns', (error, results) => {
      if (error) {
        response.status(500).json({ message: error.message });
      }
      response.status(200).json(results.rows)
    })
  };

  const getTopCampaigns = async (request, response) => {
    db.query('SELECT campaigns.*, COUNT(votes.campaign_id) AS vote_count FROM campaigns LEFT JOIN votes ON campaigns.campaign_id = votes.campaign_id GROUP BY campaigns.campaign_id ORDER BY vote_count DESC LIMIT 5;', (error, results) => {
      if (error) {
        response.status(500).json({ message: error.message });
      }
      response.status(200).json(results.rows)
    })
  };

  const getCampaignById = async (request, res) => {
    const CampaignId = request.params.id;
  
    try {
      const dbResult = await db.query(`SELECT 
      campaigns.*,
      CONCAT(users.first_name, ' ', users.last_name) AS user_name,
      COALESCE(vote_counts.vote_count, 0) AS num_votes,
      COALESCE(promise_counts.promise_count, 0) AS num_promise,
      COALESCE(promise_sums.promise_sum, 0) AS promise_value_sum
  FROM campaigns
  LEFT JOIN users ON campaigns.campaigner_id = users.user_id
  LEFT JOIN (
      SELECT campaign_id, COUNT(*) AS vote_count
      FROM votes
      GROUP BY campaign_id
  ) AS vote_counts ON campaigns.campaign_id = vote_counts.campaign_id
  LEFT JOIN (
      SELECT campaign_id, COUNT(*) AS promise_count
      FROM promises
      GROUP BY campaign_id
  ) AS promise_counts ON campaigns.campaign_id = promise_counts.campaign_id
  LEFT JOIN (
      SELECT campaign_id, SUM(promise_value) AS promise_sum
      FROM promises
      GROUP BY campaign_id
  ) AS promise_sums ON campaigns.campaign_id = promise_sums.campaign_id
  WHERE campaigns.campaign_id = $1;
  `, [CampaignId]);
  
      if (dbResult.rows.length > 0) {
        res.status(200).json(dbResult.rows[0]);
      } else {
        res.status(404).json({ message: 'Campaign not found' });
      }
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  

  
  const createCampaign = async (req, res) => {
    const { campaigner_id } = req.body;
  
    try {
      const result = await db.query('INSERT INTO Campaigns (campaigner_id) VALUES ($1) RETURNING *', [campaigner_id]);
  
      if (result.rows.length > 0) {
        res.status(201).json(result.rows[0]);
      } else {
        res.status(500).json({ message: 'Failed to create Campaign' });
      }
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  const updateCampaign = async (req, res) => {
    const CampaignId = req.params.id;
    const { campaigner_id } = req.body;
  
    try {
      const result = await db.query('UPDATE Campaigns SET campaigner_id = $2 WHERE Campaign_id = $1 RETURNING *', [CampaignId, campaigner_id]);
  
      if (result.rows.length > 0) {
        res.status(200).json(result.rows[0]);
      } else {
        res.status(404).json({ message: 'Campaign not found' });
      }
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  const deleteCampaign = async (req, res) => {
    const CampaignId = req.params.id;
  
    try {
      const result = await db.query('DELETE FROM Campaigns WHERE Campaign_id = $1 RETURNING *', [CampaignId]);
  
      if (result.rows.length > 0) {
        res.status(200).json({ message: 'Campaign deleted successfully' });
      } else {
        res.status(404).json({ message: 'Campaign not found' });
      }
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  // eslint-disable-next-line no-undef
  module.exports = {
    getCampaigns,
    getNumberOfCampaigns,
    getCampaignById,
    getTopCampaigns,
    createCampaign,
    updateCampaign,
    deleteCampaign,
  }