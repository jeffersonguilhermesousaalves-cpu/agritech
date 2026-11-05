const mysql = require('mysql2');
require('dotenv').config();

// Configuração da conexão com o MariaDB
const conexao = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'senai2026',
  database: process.env.DB_NAME || 'agritech'
});

connection.connect((erro) => {
  if (erro) {
    console.error('Erro ao conectar ao MariaDB:', erro.message);
    return;
  }
  console.log('Conectado ao MariaDB com sucesso!');
});

export default conexao;