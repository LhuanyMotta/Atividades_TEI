const connection = require('../configs/mysql.config'); //
const Validator = require('validatorjs');

const listaContatos = [
  {
    codigo: 1,
    nome: 'Christine Ray',
    data: '2023-02-06',
    telefone: '(284) 901-8328',
    email: 'mauris@protonmail.ca',
  },
  {
    codigo: 2,
    nome: 'Eagan Hutchinson',
    data: '2023-02-04',
    telefone: '(892) 511-7166',
    email: 'eget.odio@icloud.org',
  },
  {
    codigo: 3,
    nome: 'Brock Lambert',
    data: '2023-03-09',
    telefone: '1-457-158-4122',
    email: 'nullam.vitae.diam@yahoo.org',
  },
  {
    codigo: 4,
    nome: 'Craig Vinson',
    data: '2024-06-21',
    telefone: '(437) 598-0259',
    email: 'nunc.sed@google.ca',
  },
];

/**
 * Função que deve receber um identificador (código)
 * e retornar o contato correspondente
 */
function show(req, res) {
  const codigo = req.params.codigo;

  if (codigo == undefined) {
    return res.json({ erro: 'Ocorreram erros ao buscar a informação'});
  }
  
  connection.query('SELECT * FROM contatos', function (err, resultado) {

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
  connection.query('SELECT * FROM contatos', function (err, resultado) {
    if (err) {
      return response.json({ erro: 'Ocorreram erros aos buscar os dados' });
    }
    return response.json({ dados: resultado });
  });
}

function create(request, response) {

  const regras = {
    nome: 'required|min:5',
    data: 'required|date',
    telefone: 'required',
    email: 'required|email',
  };

  const validacao = new Validator(request.body, regras);

  if (validacao.fails()) {
    return response.json({ validacao: erros });
  }

  const { nome, data, telefone, email } = request.body;

  connection.query('INSERT INTO contatos (nome_contatos, data_nascimento_contatos, telefone_contatos, email_contatos) VALUES (?, ?, ?, ?)', [
    nome, data, telefone, email
  ], function (err, resultado) {

    if (err) {
      return response.json({erro: 'Ocorreram erros ao tentar salvar a informação' });
    }

    if (resultado.affectedReows == 0) {
      return response.json({ erro: 'Ocorreram erros ao tentar salvar a informarção' });
    }

    return response.json({
      nome,
      data,
      telefone,
      email,
      id: resultado.insertId
    });

  });
}

function update(request, response) {
  const codigo = request.params.codigo;

  let contato = null;

  for (const _contato of listaContatos.entries) {
    if (_contato.codigo == codigo) {
      contato = _contato;
    }
  }

  const nome = request.body.nome;
  const data = request.body.data;
  const telefone = request.body.telefone;
  const email = request.body.email;

// Aula - 28/10 - Sábado Letivo
// Segue complementação abaixo da atividade
// Lhuany Motta

// Verificando se a informação estão vazias, pois todas as informações devem ser obrigatórias
// Verificação das informações (nome, data nascimento, telefone e email).

// Verificando se o nome contém no mínimo 5 caracteres e se está vazio.
  if (nome === undefined || nome === "" || nome.length < 5) {
    return response.json({ erro: "O nome deve ter pelo menos 5 caracteres" });
  }

// Verificando se a data de nascimento é uma data válida e se está vazio.
if (data === undefined || data === "" || !moment(data, "YYYY-MM-DD").isValid()) {
  return response.json({ erro: "Data de nascimento inválida" });
}
  
// Verificando se o telefone contém apenas números e se está vazio.
if (telefone === undefined || telefone === "" || !telefone.match('/^[0-9]+$/')) {
  return response.json({ erro: "O telefone deve conter somente números" });
}

/* Verificando se o email é válido (para ser válido, deve conter no mínimo uma letra,
seguido de arroba (@), com mais de um caracter, um ponto (.), mais um caracter e se está vazio.*/
if (email === undefined || email === "" || !email.match('/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/')) {
  return response.json({ erro: "O e-mail é inválido" });
}

  contato.nome = nome;
  contato.data = data;
  contato.telefone = telefone;
  contato.email = email;

  return response.json(contato);
}

function destroy(request, response) {
  const codigo = request.params.codigo;

  let contato = null;

  for (const [indice, _contato] of listaContatos.entries()) {
    if (_contato.codigo == codigo) {
      contato = _contato;
      // Remove através do índice da lista
      listaContatos.splice(indice, 1);
      break;
    }
  }

  if (contato == null) {
    return response.json({ erro: `Contato #${codigo} não foi encontrado` });
  }

  return response.json(contato);
}

module.exports = { show, list, create, update, destroy };
