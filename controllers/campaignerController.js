const db = require('../database/db');

const getCampaigners = (request, response) => {
    db.query('SELECT * FROM Campaigner ORDER BY Campaigner_id', (error, results) => {
      if (error) {
        response.status(500).json({ message: error.message });
      }
      response.status(200).json(results.rows)
    })
  }

const getCampaignerById = (request, response) => {
const id = parseInt(request.params.id)

db.query('SELECT * FROM Campaigner WHERE Campaigner_id = $1', [id], (error, results) => {
    if (error) {
    response.status(500).json({ message: error.message });
    }
    response.status(200).json(results.rows)
})
}

const createCampaigner = (request, response) => {
const { name, email } = request.body

db.query('INSERT INTO Campaigner (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
    if (error) {
    response.status(500).json({ message: error.message });
    }
    response.status(201).send(`Campaigner added with ID: ${results.insertId}`)
})
}

const updateCampaigner = (request, response) => {
const id = parseInt(request.params.id)
const { name, email } = request.body

db.query(
    'UPDATE Campaigner SET name = $1 WHERE Campaigner_id = $3',
    [name, email, id],
    (error, results) => {
    if (error) {
        response.status(500).json({ message: error.message });
    }
    response.status(200).send(`Campaigner modified with ID: ${id}`)
    }
)
}

const deleteCampaigner = (request, response) => {
const id = parseInt(request.params.id)

db.query('DELETE FROM Campaigner WHERE Campaigner_id = $1', [id], (error, results) => {
    if (error) {
    response.status(500).json({ message: error.message });
    }
    response.status(200).send(`Campaigner deleted with ID: ${id}`)
})
}
  
  module.exports = {
    getCampaigners,
    getCampaignerById,
    createCampaigner,
    updateCampaigner,
    deleteCampaigner,
  }