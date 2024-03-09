const db = require('../database/db');

const getOrganisations = (request, response) => {
    db.query('SELECT * FROM Organisations', (error, results) => {
      if (error) {
        response.status(500).json({ message: error.message });
      }
      response.status(200).json(results.rows)
    })
  }

const getOrganisationById = async (req, res) => {
    const OrganisationId = req.params.id;
  
    try {
      const result = await db.query('SELECT * FROM Organisations WHERE Organisation_id = $1', [OrganisationId]);
  
      if (result.rows.length > 0) {
        res.status(200).json(result.rows[0]);
      } else {
        res.status(404).json({ message: 'Organisation not found' });
      }
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  const createOrganisation = async (req, res) => {
    const { name, type, mission_statement } = req.body;
  
    try {
      const result = await db.query('INSERT INTO Organisations (name, type, mission_statement) VALUES ($1, $2, $3) RETURNING *', [name, type, mission_statement]);
  
      if (result.rows.length > 0) {
        res.status(201).json(result.rows[0]);
      } else {
        res.status(500).json({ message: 'Failed to create Organisation' });
      }
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  const updateOrganisation = async (req, res) => {
    const OrganisationId = req.params.id;
    const { name, type, mission_statement } = req.body;
  
    try {
      const result = await db.query('UPDATE Organisations SET qualification = $2, type = $3, mission_statement = $4 WHERE Organisation_id = $1 RETURNING *', [OrganisationId, name, type, mission_statement]);
  
      if (result.rows.length > 0) {
        res.status(200).json(result.rows[0]);
      } else {
        res.status(404).json({ message: 'Organisation not found' });
      }
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  const deleteOrganisation = async (req, res) => {
    const OrganisationId = req.params.id;
  
    try {
      const result = await db.query('DELETE FROM Organisations WHERE Organisation_id = $1 RETURNING *', [OrganisationId]);
  
      if (result.rows.length > 0) {
        res.status(200).json({ message: 'Organisation deleted successfully' });
      } else {
        res.status(404).json({ message: 'Organisation not found' });
      }
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  // eslint-disable-next-line no-undef
  module.exports = {
    getOrganisations,
    getOrganisationById,
    createOrganisation,
    updateOrganisation,
    deleteOrganisation,
  }