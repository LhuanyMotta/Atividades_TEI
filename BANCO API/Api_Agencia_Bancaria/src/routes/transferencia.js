const express = require('express');
const transferenciaController = require('../controllers/transferencia.controller');

const router = express.Router();

router.get('/transferencia', transferenciaController.list);
router.get('/transferencia/:codigo', transferenciaController.show);
router.post('/transferencia', transferenciaController.create);
router.put('/transferencia/:codigo', transferenciaController.update);
router.delete('/transferencia/:codigo', transferenciaController.destroy);

module.exports = router;