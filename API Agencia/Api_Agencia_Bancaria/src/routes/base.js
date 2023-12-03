const express = require('express');
const router = express.Router();

/**
 * Configuração de rotas serão 
 * adicionadas abaixo desse comentário
 */

router.get('/', function (request, response) {
  return response.send('API Funcionando...');
});

/**
 * Exportação da constante router
 * código padrão
 */
module.exports = router;
