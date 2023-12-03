const express = require('express');
const saqueController = require('../controllers/saque.controller');

const router = express.Router();

router.get('/saque', saqueController.list);
router.get('/saque/:codigo', saqueController.show);
router.post('/saque', saqueController.create);
router.put('/saque/:codigo', saqueController.update);
router.delete('/saque/:codigo', saqueController.destroy);

module.exports = router;