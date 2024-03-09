const db = require('../database/db');

const getCampaigners = (request, response) => {
    db.query('SELECT * FROM Campaigners', (error, results) => {
      if (error) {
        response.status(500).json({ message: error.message });
      }
      response.status(200).json(results.rows)
    })
  }

const getCampaignerById = async (req, res) => {
    const CampaignerId = req.params.id;
  
    try {
      const result = await db.query('SELECT * FROM Campaigners WHERE Campaigner_id = $1', [CampaignerId]);
  
      if (result.rows.length > 0) {
        res.status(200).json(result.rows[0]);
      } else {
        res.status(404).json({ message: 'Campaigner not found' });
      }
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  const createCampaigner = async (req, res) => {
    const { Campaigner_id, user_id } = req.body;
  
    try {
      const result = await db.query('INSERT INTO Campaigners (Campaignerer_id, user_id) VALUES ($1, $2) RETURNING *', [Campaigner_id, user_id]);
  
      if (result.rows.length > 0) {
        res.status(201).json(result.rows[0]);
      } else {
        res.status(500).json({ message: 'Failed to create Campaigner' });
      }
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  const updateCampaigner = async (req, res) => {
    const CampaignerId = req.params.id;
    const { Campaign_id } = req.body;
  
    try {
      const result = await db.query('UPDATE Campaigners SET Campaign_id = $2, user_id = $3 WHERE Campaigner_id = $1 RETURNING *', [CampaignerId, Campaign_id, user_id]);
  
      if (result.rows.length > 0) {
        res.status(200).json(result.rows[0]);
      } else {
        res.status(404).json({ message: 'Campaigner not found' });
      }
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  const deleteCampaigner = async (req, res) => {
    const CampaignerId = req.params.id;
  
    try {
      const result = await db.query('DELETE FROM Campaigners WHERE Campaigner_id = $1 RETURNING *', [CampaignerId]);
  
      if (result.rows.length > 0) {
        res.status(200).json({ message: 'Campaigner deleted successfully' });
      } else {
        res.status(404).json({ message: 'Campaigner not found' });
      }
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  // eslint-disable-next-line no-undef
  module.exports = {
    getCampaigners,
    getCampaignerById,
    createCampaigner,
    updateCampaigner,
    deleteCampaigner,
  }