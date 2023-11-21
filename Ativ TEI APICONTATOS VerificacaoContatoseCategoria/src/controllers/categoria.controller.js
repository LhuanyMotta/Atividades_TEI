const connection = require('../configs/mysql.config'); //
const Validator = require('validatorjs');

function show(req, res) {
    const codigo = req.params.codigo;
  
    if (codigo == undefined) {
      return res.json({ erro: 'Ocorreram erros ao buscar a informação'});
    }
    
    connection.query('SELECT * FROM categoria', function (err, resultado) {
  
      if (err) {
        return response.json({erro: 'Ocorreram erros ao buscar os dados'});
      }
  
      if (resultado.length == 0) {
        return res.json({ erro: `O código #${codigo} não foi encontrado!` });
      }
  
      return res.json(resultado[0]);
  
    });
  }
  
  function list(request, response) {
    connection.query('SELECT * FROM categoria', function (err, resultado) {
      if (err) {
        return response.json({ erro: 'Ocorreram erros aos buscar os dados' });
      }
      return response.json({ dados: resultado });
    });
  }
  
  function create(request, response) {
  
    const regras = {
      nome: 'required|min:5',
    };
  
    const validacao = new Validator(request.body, regras);
  
    if (validacao.fails()) {
      return response.json({ validacao: erros });
    }
  
    const { nome } = request.body;
  
    connection.query('INSERT INTO categoria (nome_categoria) VALUES (?)', [
      nome
    ], function (err, resultado) {
  
      if (err) {
        return response.json({erro: 'Ocorreram erros ao tentar salvar a informação' });
      }
  
      if (resultado.affectedReows == 0) {
        return response.json({ erro: 'Ocorreram erros ao tentar salvar a informarção' });
      }
  
      return response.json({
        nome,
        id: resultado.insertId
      });
  
    });
  }
  
  function update(request, response) {
    const codigo = request.params.codigo;
  
    let categoria = null;
  
    for (const nome_categoria of listaCategoria.entries) {
      if (_categoria.codigo == codigo) {
        categoria = _categoria;
      }
    }
  
    const nome = request.body.nome;
 
  // Verificando se o nome contém no mínimo 5 caracteres e se está vazio.
    if (nome === undefined || nome === "" || nome.length < 5) {
      return response.json({ erro: "O nome deve ter pelo menos 5 caracteres" });
    }

    contegoria.nome = nome;
  
    return response.json(categoria);
  }
  
  function destroy(request, response) {
    const codigo = request.params.codigo;
  
    let categoria = null;
  
    for (const [indice, _categoria] of listaCategoria.entries()) {
      if (_categoria.codigo == codigo) {
        categoria = _categoria;
        // Remove através do índice da lista
        listaCategoria.splice(indice, 1);
        break;
      }
    }
  
    if (categoria == null) {
      return response.json({ erro: `Categoria #${codigo} não foi encontrado` });
    }
  
    return response.json(categoria);
  }
  
  module.exports = { show, list, create, update, destroy };