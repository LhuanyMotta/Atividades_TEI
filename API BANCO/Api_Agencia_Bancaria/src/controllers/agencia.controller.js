const Validator = require('validatorjs');
const connection = require('../configs/mysql.config');


function show(req, res) {
  const codigo = req.params.codigo;

  return res.json({ nome: "Agencia 1" });
}

function list(request, response) {
  connection.query('SELECT * FROM agencia', function (err, resultado){
    if(err) {
      return response.json({erro: 'ocorreram erros ao buscar os dados'});
    }
    return response.json({dados: resultado});
  });
}

function create(request, response) {
 
  const regras = {
    numero: 'required|min:1',
    nome_fantasia: 'required|min:5',
    razao_social: 'required|min:5',
    cnpj: 'required|min:1',
    telefone: 'required|min:1',
    email: 'required|min:1',
    ban_id: 'required|min:1',
  };

  const validacao = new Validator(request.body, regras);

  if (validacao.fails()) {
    const erros = validacao.errors;
    return response.json({ erros: erros });
  }

  const {numero, nome_fantasia, razao_social, cnpj, telefone, email, ban_id} = request.body;

  connection.query('INSERT INTO agencia (numero, nome_fantasia, razao_social, cnpj, telefone, email, ban_id) VALUES (?, ?, ?, ?, ?, ?, ?)', [numero, nome_fantasia, razao_social, cnpj, telefone, email, ban_id], function (err, resultado){

    if(err){
      return response.json({erro: 'Ocorreram erros ao tentar salvar a informação'});
    }

    if(resultado.affectedRows == 0){
      return response.json({erro: 'Ocorreram erros ao tentar salvar a informação'});
    }

    return response.json({numero, nome_fantasia, razao_social, cnpj, telefone, email, ban_id, id_age: resultado.insertId});

  });
}

function update(req, res) {

    const codigo = req.params.codigo;

    const {numero, nome_fantasia, razao_social, cnpj, telefone, email, ban_id} = req.body;
    
    let regras = {
    numero: 'required|min:1',
    nome_fantasia: 'required|min:5',
    razao_social: 'required|min:5',
    cnpj: 'required|min:1',
    telefone: 'required|min:1',
    email: 'required|min:1',
    ban_id: 'required|min:1',
    };
  
   let validacao = new Validator(req.body, regras);

    if (validacao.fails()) {
        return res.json(validacao.errors)
    }else
    {
        connection.query('UPDATE agencia SET numero = ?, nome_fantasia = ?, razao_social = ?, cnpj = ?, telefone = ?, email = ?, ban_id = ? WHERE id_age = ?;',[numero, nome_fantasia, razao_social, cnpj, telefone, email, ban_id, codigo], function (err, result) {
            if (err) {
                return res.json({erro: err.message})
            }
            if(result.affectedRows == 0){
                return res.json({erro: 'Falha ao tentar Atualizar'});
            }else return res.json({numero, nome_fantasia, razao_social, cnpj, telefone, email, ban_id});
        });
    }
}
  

function destroy(req, res) {
  const codigo = req.params.codigo;
  connection.query('DELETE FROM agencia WHERE id_age = ?;',[codigo], function (err, result) {
      if (err) {
          return res.json({erro: err.message})
      }
      return res.json({information: 'Excluido com sucesso!'})
  })
}

module.exports = {list, show, create, update, destroy};