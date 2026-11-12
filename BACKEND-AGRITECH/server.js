import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import usuarioRoutes from './src/routes/usuarioRoutes.js';
import enderecoRoutes from './src/routes/enderecoRoutes.js';
import categoriaRoutes from './src/routes/categoriaRoutes.js';
import produtoRoutes from './src/routes/produtoRoutes.js';
import estoqueRoutes from './src/routes/estoqueRoutes.js';
import carrinhoRoutes from './src/routes/carrinhoRoutes.js';
import itemCarrinhoRoutes from './src/routes/itemCarrinhoRoutes.js';
import vendaRoutes from './src/routes/vendaRoutes.js';
import notaFiscalRoutes from './src/routes/notaFiscalRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/usuarios', usuarioRoutes);
app.use('/api/enderecos', enderecoRoutes);
app.use('/api/categorias', categoriaRoutes);
app.use('/api/produtos', produtoRoutes);
app.use('/api/estoque', estoqueRoutes);
app.use('/api/carrinhos', carrinhoRoutes);
app.use('/api/itens-carrinho', itemCarrinhoRoutes);
app.use('/api/vendas', vendaRoutes);
app.use('/api/notas-fiscais', notaFiscalRoutes);

app.get('/', (req, res) => {
  res.send('API simplificada rodando com sucesso!');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando em server.js na porta ${PORT}`);
});