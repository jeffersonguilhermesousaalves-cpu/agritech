// const mysql = require('mysql2');
// require('dotenv').config();

import mysql from "mysql2"
import "dotenv/config";

import { textoValido, inteiroPositivo } from "./src/utils/Utils.js";
import { validarId } from "./src/middlewares/middlewares.js";
import { tratarErro } from "./src/middlewares/middlewares.js";

// Configuração da conexão com o MariaDB
const conexao = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'senai2026',
  database: process.env.DB_NAME || 'projeto_integrador'
});

export default conexao;