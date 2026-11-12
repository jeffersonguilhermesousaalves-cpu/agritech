import { ProdutoModel } from '../models/produtoModel.js';
import { validarPreco } from '../utils/validacoes.js';

export const ProdutoController = {
  async listarTodos(req, res, next) {
    try {
      const produtos = await ProdutoModel.listarTodos();
      res.json(produtos);
    } catch (erro) {
      next(erro);
    }
  },

  async buscarPorId(req, res, next) {
    try {
      const produto = await ProdutoModel.buscarPorId(req.params.id);
      if (!produto) {
        return res.status(404).json({ mensagem: 'Produto não encontrado' });
      }
      res.json(produto);
    } catch (erro) {
      next(erro);
    }
  },

  async criar(req, res, next) {
    try {
      const { nome, preco, id_categoria } = req.body;

      if (!nome || !id_categoria) {
        return res.status(400).json({ mensagem: 'Nome e categoria são obrigatórios.' });
      }

      if (!validarPreco(preco)) {
        return res.status(400).json({ mensagem: 'Preço inválido. Deve ser um valor maior que zero.' });
      }

      const novoProduto = await ProdutoModel.criar(req.body);
      res.status(201).json(novoProduto);
    } catch (erro) {
      next(erro);
    }
  },

  async atualizar(req, res, next) {
    try {
      if (req.body.preco !== undefined && !validarPreco(req.body.preco)) {
        return res.status(400).json({ mensagem: 'Preço inválido. Deve ser um valor maior que zero.' });
      }

      const produtoAtualizado = await ProdutoModel.atualizar(req.params.id, req.body);
      res.json(produtoAtualizado);
    } catch (erro) {
      next(erro);
    }
  },

  async deletar(req, res, next) {
    try {
      await ProdutoModel.deletar(req.params.id);
      res.json({ mensagem: 'Produto removido com sucesso' });
    } catch (erro) {
      next(erro);
    }
  }
};