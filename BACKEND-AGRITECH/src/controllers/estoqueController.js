import { EstoqueModel } from '../models/estoqueModel.js';

export const EstoqueController = {
  async listarTodos(req, res) {
    try {
      const estoques = await EstoqueModel.listarTodos();
      res.json(estoques);
    } catch (erro) {
      res.status(500).json({ mensagem: 'Erro ao buscar registos de estoque', erro: erro.message });
    }
  },

  async buscarPorProduto(req, res) {
    try {
      const estoque = await EstoqueModel.buscarPorProduto(req.params.id_produto);
      res.json(estoque);
    } catch (erro) {
      res.status(500).json({ mensagem: 'Erro ao buscar estoque do produto', erro: erro.message });
    }
  },

  async criar(req, res) {
    try {
      const novoEstoque = await EstoqueModel.criar(req.body);
      res.status(201).json(novoEstoque);
    } catch (erro) {
      res.status(500).json({ mensagem: 'Erro ao criar lote de estoque', erro: erro.message });
    }
  },

  async atualizar(req, res) {
    try {
      const estoqueAtualizado = await EstoqueModel.atualizar(req.params.id, req.body);
      res.json(estoqueAtualizado);
    } catch (erro) {
      res.status(500).json({ mensagem: 'Erro ao atualizar estoque', erro: erro.message });
    }
  },

  async deletar(req, res) {
    try {
      await EstoqueModel.deletar(req.params.id);
      res.json({ mensagem: 'Registo de estoque removido' });
    } catch (erro) {
      res.status(500).json({ mensagem: 'Erro ao remover registo de estoque', erro: erro.message });
    }
  }
};