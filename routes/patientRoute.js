const express = require('express');
const router = express.Router();
const patient_controller = require('../controllers/patientController');

router.post('/process-clinical-data', patient_controller.process_clinical_data);

module.exports = router;