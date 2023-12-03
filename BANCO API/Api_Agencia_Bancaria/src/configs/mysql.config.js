const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'Lhuany',
    password: '#Euzebio2001',
    database: 'agencia_bancaria_db',
});

module.exports = connection;