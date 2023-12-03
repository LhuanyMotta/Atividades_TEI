const express = require('express');
const agenciaController = require('../controllers/agencia.controller');

const router = express.Router();

router.get('/agencia', agenciaController.list);
router.get('/agencia/:codigo', agenciaController.show);
router.post('/agencia', agenciaController.create);
router.put('/agencia/:codigo', agenciaController.update);
router.delete('/agencia/:codigo', agenciaController.destroy);

module.exports = router;