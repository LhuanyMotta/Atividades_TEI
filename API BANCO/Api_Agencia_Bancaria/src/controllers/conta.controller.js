const Validator = require('validatorjs');
const connection = require('../configs/mysql.config');


function show(req, res) {
  const codigo = req.params.codigo;

  return res.json({ nome: "Conta 1" });
}

function list(request, response) {
  connection.query('SELECT * FROM conta', function (err, resultado){
    if(err) {
      return response.json({erro: 'ocorreram erros ao buscar os dados'});
    }
    return response.json({dados: resultado});
  });
}

function create(request, response) {
 
  const regras = {
    numero: 'required|min:1',
    data_abertura: 'required|min:5',
    saldo: 'required|min:5',
    valor_limite: 'required|min:1',
    agencia_id: 'required|min:1',
    cliente_id: 'required|min:1',
  };

  const validacao = new Validator(request.body, regras);

  if (validacao.fails()) {
    const erros = validacao.errors;
    return response.json({ erros: erros });
  }

  const {numero, data_abertura, saldo, valor_limite, agencia_id, cliente_id} = request.body;

  connection.query('INSERT INTO cliente (numero, data_abertura, saldo, valor_limite, agencia_id, cliente_id) VALUES (?, ?, ?, ?, ?, ?)', [numero, data_abertura, saldo, valor_limite, agencia_id, cliente_id], function (err, resultado){

    if(err){
      return response.json({erro: 'Ocorreram erros ao tentar salvar a informação'});
    }

    if(resultado.affectedRows == 0){
      return response.json({erro: 'Ocorreram erros ao tentar salvar a informação'});
    }

    return response.json({numero, data_abertura, saldo, valor_limite, agencia_id, cliente_id, id_con: resultado.insertId});

  });
}

function update(req, res) {

    const codigo = req.params.codigo;

    const {numero, data_abertura, saldo, valor_limite, agencia_id, cliente_id} = req.body;
    
    let regras = {
      numero: 'required|min:1',
      data_abertura: 'required|min:5',
      saldo: 'required|min:5',
      valor_limite: 'required|min:5',
      agencia_id: 'required|min:1',
      cliente_id: 'required|min:1',
    };
  
   let validacao = new Validator(req.body, regras);

    if (validacao.fails()) {
        return res.json(validacao.errors)
    }else
    {
        connection.query('UPDATE agencia SET numero = ?, data_abertura = ?, saldo = ?, valor_limite = ?, agencia_id = ?, cliente_id = ? WHERE id_con = ?;',[numero, data_abertura, saldo, valor_limite, agencia_id, cliente_id, codigo], function (err, result) {
            if (err) {
                return res.json({erro: err.message})
            }
            if(result.affectedRows == 0){
                return res.json({erro: 'Falha ao tentar Atualizar'});
            }else return res.json({numero, data_abertura, saldo, valor_limite, agencia_id, cliente_id});
        });
    }
}

function destroy(req, res) {
  const codigo = req.params.codigo;
  connection.query('DELETE FROM conta WHERE id_con = ?;',[codigo], function (err, result) {
      if (err) {
          return res.json({erro: err.message})
      }
      return res.json({information: 'Excluido com sucesso!'})
  })
}

module.exports = {list, show, create, update, destroy};