import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import conexao from './db.js';

// Importação das rotas
import usuarioRoute from './src/routes/usuarioRoute.js';
import categoriaRoute from './src/routes/categoriaRoute.js';
import produtoRoute from './src/routes/produtoRoute.js';
import estoqueRoute from './src/routes/estoqueRoute.js';
import carrinhoRoute from './src/routes/carrinhoRoute.js';
import vendaRoute from './src/routes/vendaRoute.js';
import enderecoRoute from './src/routes/enderecoRoute.js';
import notaFiscalRoute from './src/routes/notaFiscalRoute.js';

// Importação do middleware global de erros
import { tratarErro } from './src/middlewares/tratarErro.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Registo dos endpoints da API AgriTech
app.use('/usuarios', usuarioRoute);
app.use('/categorias', categoriaRoute);
app.use('/produtos', produtoRoute);
app.use('/estoque', estoqueRoute);
app.use('/carrinho', carrinhoRoute);
app.use('/vendas', vendaRoute);
app.use('/enderecos', enderecoRoute);
app.use('/notas-fiscais', notaFiscalRoute);

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('AgriTech a funcionar!');
});

// Middleware de erro (tem de ficar sempre depois das rotas)
app.use(tratarErro);

app.listen(PORT, () => {
  console.log(`Servidor a rodar na porta ${PORT}`);
});