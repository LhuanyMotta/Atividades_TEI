const express = require('express');
const bancoController = require('../controllers/banco.controller');

const router = express.Router();

router.get('/banco', bancoController.list);
router.get('/banco/:codigo', bancoController.show);
router.post('/banco', bancoController.create);
router.put('/banco/:codigo', bancoController.update);
router.delete('/banco/:codigo', bancoController.destroy);

module.exports = router;