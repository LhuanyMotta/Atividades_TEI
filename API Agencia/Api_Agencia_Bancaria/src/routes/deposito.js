const express = require('express');
const depositoController = require('../controllers/deposito.controller');

const router = express.Router();

router.get('/deposito', depositoController.list);
router.get('/deposito/:codigo', depositoController.show);
router.post('/deposito', depositoController.create);
router.put('/deposito/:codigo', depositoController.update);
router.delete('/deposito/:codigo', depositoController.destroy);

module.exports = router;