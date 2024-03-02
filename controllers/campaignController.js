const db = require('../database/db');

const getCampaigns = (request, response) => {
    db.query('SELECT * FROM campaign ORDER BY campaign_id', (error, results) => {
      if (error) {
        response.status(500).json({ message: error.message });
      }
      response.status(200).json(results.rows)
    })
  }

const getCampaignById = (request, response) => {
const id = parseInt(request.params.id)

db.query('SELECT * FROM campaign WHERE campaign_id = $1', [id], (error, results) => {
    if (error) {
    response.status(500).json({ message: error.message });
    }
    response.status(200).json(results.rows)
})
}

const createCampaign = (request, response) => {
const { name, email } = request.body

db.query('INSERT INTO campaign (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
    if (error) {
    response.status(500).json({ message: error.message });
    }
    response.status(201).send(`campaign added with ID: ${results.insertId}`)
})
}

const updateCampaign = (request, response) => {
const id = parseInt(request.params.id)
const { name, email } = request.body

db.query(
    'UPDATE campaign SET name = $1 WHERE campaign_id = $3',
    [name, email, id],
    (error, results) => {
    if (error) {
        response.status(500).json({ message: error.message });
    }
    response.status(200).send(`campaign modified with ID: ${id}`)
    }
)
}

const deleteCampaign = (request, response) => {
const id = parseInt(request.params.id)

db.query('DELETE FROM campaign WHERE campaign_id = $1', [id], (error, results) => {
    if (error) {
    response.status(500).json({ message: error.message });
    }
    response.status(200).send(`campaign deleted with ID: ${id}`)
})
}
  
  module.exports = {
    getCampaigns,
    getCampaignById,
    createCampaign,
    updateCampaign,
    deleteCampaign,
  }