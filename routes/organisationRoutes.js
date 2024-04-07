const express = require('express');
const organisationController = require('../controllers/organisationController');

const router = express.Router();

router.get('/', organisationController.getOrganisations)
router.post('/', organisationController.createOrganisation)
router.get('/:id', organisationController.getOrganisationById)
router.put('/:id', organisationController.updateOrganisation)
router.delete('/:id', organisationController.deleteOrganisation)

module.exports = router;
