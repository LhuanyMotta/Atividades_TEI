const express = require('express');
const app = express();

/**
 * Importação do arquivos de
 * configuração de rotas
 */
const agenciaRouter = require('./routes/agencia');
const bancoRouter = require('./routes/banco');
const baseRouter = require('./routes/base');
const clienteRouter = require('./routes/cliente');
const contaRouter = require('./routes/conta');
const depositoRouter = require('./routes/deposito');
const saqueRouter = require('./routes/saque');
const transferenciaRouter = require('./routes/transferencia');




app.use(express.json());

/**
 * Configuração de uso das rotas 
 */
app.use(agenciaRouter);
app.use(bancoRouter);
app.use(baseRouter);
app.use(clienteRouter);
app.use(contaRouter);
app.use(depositoRouter);
app.use(saqueRouter);
app.use(transferenciaRouter);

app.listen(3000, function () {
  console.log('API iniciada na porta: 3000');
});
