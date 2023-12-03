const express = require('express');
const contaController = require('../controllers/conta.controller');

const router = express.Router();

router.get('/conta', contaController.list);
router.get('/conta/:codigo', contaController.show);
router.post('/conta', contaController.create);
router.put('/conta/:codigo', contaController.update);
router.delete('/conta/:codigo', contaController.destroy);

module.exports = router;