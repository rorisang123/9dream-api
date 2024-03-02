const express = require('express');
const organisationController = require('../controllers/organisationController');

const router = express.Router();

router.get('/', organisationController.getOrganisations)
router.get('/:id', organisationController.getOrganisationById)
router.post('/', organisationController.createOrganisation)
router.put('/:id', organisationController.updateOrganisation)
router.delete('/:id', organisationController.deleteOrganisation)

module.exports = router;
