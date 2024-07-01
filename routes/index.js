const express = require('express');
const router = express.Router();
const patient_routes = require('./patientRoute');
router.use('/patient', patient_routes);
module.exports = router;