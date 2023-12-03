const Validator = require('validatorjs');
const connection = require('../configs/mysql.config');


function show(req, res) {
  const codigo = req.params.codigo;

  return res.json({ nome: "Banco 1" });
}

function list(request, response) {
  connection.query('SELECT * FROM banco', function (err, resultado){
    if(err) {
      return response.json({erro: 'ocorreram erros ao buscar os dados'});
    }
    return response.json({dados: resultado});
  });
}

function create(request, response) {
 
  const regras = {
    nome_fantasia: 'required|min:5',
    razao_social: 'required|min:5',
    cnpj: 'required|min:1',
    numero: 'required|min:1',
  };

  const validacao = new Validator(request.body, regras);

  if (validacao.fails()) {
    const erros = validacao.errors;
    return response.json({ erros: erros });
  }

  const { nome_fantasia, razao_social, cnpj, numero } = request.body;

  connection.query('INSERT INTO banco (nome_fantasia, razao_social, cnpj, numero) VALUES (?, ?, ?, ?)', [nome_fantasia, razao_social, cnpj, numero], function (err, resultado){

    if(err){
      return response.json({erro: 'Ocorreram erros ao tentar salvar a informação'});
    }

    if(resultado.affectedRows == 0){
      return response.json({erro: 'Ocorreram erros ao tentar salvar a informação'});
    }

    return response.json({nome_fantasia, razao_social, cnpj, numero, id_ban: resultado.insertId});

  });
}

function update(req, res) {

    const codigo = req.params.codigo;

    const {nome_fantasia, razao_social, cnpj, numero} = req.body;
    
    let regras = {
      nome_fantasia: 'required|min:5',
      razao_social: 'required|min:5',
      cnpj: 'required|min:1',
      numero: 'required|min:1',
    };
  
   let validacao = new Validator(req.body, regras);

    if (validacao.fails()) {
        return res.json(validacao.errors)
    }else
    {
        connection.query('UPDATE banco SET nome_fantasia = ?, razao_social = ?, cnpj = ?, numero = ? WHERE id_ban = ?;',[nome_fantasia, razao_social, cnpj, numero, codigo], function (err, result) {
            if (err) {
                return res.json({erro: err.message})
            }
            if(result.affectedRows == 0){
                return res.json({erro: 'Falha ao tentar Atualizar'});
            }else return res.json({nome_fantasia, razao_social, cnpj, numero});
        });
    }
}
  

function destroy(req, res) {
  const codigo = req.params.codigo;
  connection.query('DELETE FROM banco WHERE id_ban = ?;',[codigo], function (err, result) {
      if (err) {
          return res.json({erro: err.message})
      }
      return res.json({information: 'Excluido com sucesso!'})
  })
}

module.exports = {list, show, create, update, destroy};