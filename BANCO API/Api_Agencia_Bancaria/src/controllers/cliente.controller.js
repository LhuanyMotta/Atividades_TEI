const Validator = require('validatorjs');
const connection = require('../configs/mysql.config');


function show(req, res) {
  const codigo = req.params.codigo;

  return res.json({ nome: "Cliente 1" });
}

function list(request, response) {
  connection.query('SELECT * FROM cliente', function (err, resultado){
    if(err) {
      return response.json({erro: 'ocorreram erros ao buscar os dados'});
    }
    return response.json({dados: resultado});
  });
}

function create(request, response) {
 
  const regras = {
    nome: 'required|min:1',
    cpf_cnpj: 'required|min:5',
    rg: 'required|min:5',
    sexo: 'required|min:1',
    data_nascimento: 'required|min:1',
    renda: 'required|min:1',
    endereco: 'required|min:1',
    email: 'required|min:1',
    telefone: 'required|min:1',
  };

  const validacao = new Validator(request.body, regras);

  if (validacao.fails()) {
    const erros = validacao.errors;
    return response.json({ erros: erros });
  }

  const {nome, cpf_cnpj, rg, sexo, data_nascimento, renda, endereco, email, telefone} = request.body;

  connection.query('INSERT INTO cliente (nome, cpf_cnpj, rg, sexo, data_nascimento, renda, endereco, email, telefone) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [nome, cpf_cnpj, rg, sexo, data_nascimento, renda, endereco, email, telefone], function (err, resultado){

    if(err){
      return response.json({erro: 'Ocorreram erros ao tentar salvar a informação'});
    }

    if(resultado.affectedRows == 0){
      return response.json({erro: 'Ocorreram erros ao tentar salvar a informação'});
    }

    return response.json({nome, cpf_cnpj, rg, sexo, data_nascimento, renda, endereco, email, telefone, id_cli: resultado.insertId});

  });
}

function update(req, res) {

    const codigo = req.params.codigo;

    const {nome, cpf_cnpj, rg, sexo, data_nascimento, renda, endereco, email, telefone} = req.body;
    
    let regras = {
      nome: 'required|min:1',
      cpf_cnpj: 'required|min:5',
      rg: 'required|min:5',
      sexo: 'required|min:1',
      data_nascimento: 'required|min:1',
      renda: 'required|min:1',
      endereco: 'required|min:1',
      email: 'required|min:1',
      telefone: 'required|min:1',
    };
  
   let validacao = new Validator(req.body, regras);

    if (validacao.fails()) {
        return res.json(validacao.errors)
    }else
    {
        connection.query('UPDATE cliente SET nome = ?, cpf_cnpj = ?, rg = ?, sexo = ?, data_nascimento = ?, renda = ?, endereco = ?, email = ?, telefone = ? WHERE id_cli = ?;',[nome, cpf_cnpj, rg, sexo, data_nascimento, renda, endereco, email, telefone, codigo], function (err, result) {
            if (err) {
                return res.json({erro: err.message})
            }
            if(result.affectedRows == 0){
                return res.json({erro: 'Falha ao tentar Atualizar'});
            }else return res.json({nome, cpf_cnpj, rg, sexo, data_nascimento, renda, endereco, email, telefone});
        });
    }
}

function destroy(req, res) {
  const codigo = req.params.codigo;
  connection.query('DELETE FROM cliente WHERE id_cli = ?;',[codigo], function (err, result) {
      if (err) {
          return res.json({erro: err.message})
      }
      return res.json({information: 'Excluido com sucesso!'})
  })
}

module.exports = {list, show, create, update, destroy};