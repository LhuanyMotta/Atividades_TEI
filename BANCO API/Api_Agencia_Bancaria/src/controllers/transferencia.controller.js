const Validator = require('validatorjs');
const connection = require('../configs/mysql.config');


function show(req, res) {
  const codigo = req.params.codigo;

  return res.json({ nome: "Transferencia 1" });
}

function list(request, response) {
  connection.query('SELECT * FROM transferencia', function (err, resultado){
    if(err) {
      return response.json({erro: 'ocorreram erros ao buscar os dados'});
    }
    return response.json({dados: resultado});
  });
}

function create(request, response) {
 
  const regras = {
    valor: 'required|min:1',
    data_hora: 'required|min:5',
    descricao: 'required|min:5',
    conta_origem_id: 'required|min:5',
    conta_destino_id: 'required|min:5',
  };

  const validacao = new Validator(request.body, regras);

  if (validacao.fails()) {
    const erros = validacao.errors;
    return response.json({ erros: erros });
  }

  const {valor, data_hora, descricao, conta_origem_id, conta_destino_id} = request.body;

  connection.query('INSERT INTO transferencia (valor, data_hora, descricao, conta_origem_id, conta_destino_id) VALUES (?, ?, ?, ?, ?)', [valor, data_hora, descricao, conta_origem_id, conta_destino_id], function (err, resultado){

    if(err){
      return response.json({erro: 'Ocorreram erros ao tentar salvar a informação'});
    }

    if(resultado.affectedRows == 0){
      return response.json({erro: 'Ocorreram erros ao tentar salvar a informação'});
    }

    return response.json({valor, data_hora, descricao, conta_origem_id, conta_destino_id, id_tra: resultado.insertId});

  });
}

function update(req, res) {

    const codigo = req.params.codigo;

    const {valor, data_hora, descricao, conta_origem_id, conta_destino_id} = req.body;
    
    let regras = {
      valor: 'required|min:1',
      data_hora: 'required|min:5',
      descricao: 'required|min:5',
      conta_origem_id: 'required|min:5',
      conta_destino_id: 'required|min:5',
    };
  
   let validacao = new Validator(req.body, regras);

    if (validacao.fails()) {
        return res.json(validacao.errors)
    }else
    {
        connection.query('UPDATE transferencia SET valor = ?, data_hora = ?, descricao = ?, conta_origem_id = ?, conta_destino_id = ? WHERE id_tra = ?;',[valor, data_hora, descricao, conta_origem_id, conta_destino_id, codigo], function (err, result) {
            if (err) {
                return res.json({erro: err.message})
            }
            if(result.affectedRows == 0){
                return res.json({erro: 'Falha ao tentar Atualizar'});
            }else return res.json({valor, data_hora, descricao, conta_origem_id, conta_destino_id});
        });
    }
}
  

function destroy(req, res) {
  const codigo = req.params.codigo;
  connection.query('DELETE FROM transferencia WHERE id_tra = ?;',[codigo], function (err, result) {
      if (err) {
          return res.json({erro: err.message})
      }
      return res.json({information: 'Excluido com sucesso!'})
  })
}

module.exports = {list, show, create, update, destroy};