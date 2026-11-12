import { CategoriaModel } from '../models/categoriaModel.js';

export const CategoriaController = {
  async listarTodos(req, res) {
    try {
      const categorias = await CategoriaModel.listarTodos();
      res.json(categorias);
    } catch (erro) {
      res.status(500).json({ mensagem: 'Erro ao buscar categorias', erro: erro.message });
    }
  },

  async buscarPorId(req, res) {
    try {
      const categoria = await CategoriaModel.buscarPorId(req.params.id);
      if (!categoria) return res.status(404).json({ mensagem: 'Categoria não encontrada' });
      res.json(categoria);
    } catch (erro) {
      res.status(500).json({ mensagem: 'Erro ao buscar categoria', erro: erro.message });
    }
  },

  async criar(req, res) {
    try {
      const novaCategoria = await CategoriaModel.criar(req.body);
      res.status(201).json(novaCategoria);
    } catch (erro) {
      res.status(500).json({ mensagem: 'Erro ao criar categoria', erro: erro.message });
    }
  },

  async atualizar(req, res) {
    try {
      const categoriaAtualizada = await CategoriaModel.atualizar(req.params.id, req.body);
      res.json(categoriaAtualizada);
    } catch (erro) {
      res.status(500).json({ mensagem: 'Erro ao atualizar categoria', erro: erro.message });
    }
  },

  async deletar(req, res) {
    try {
      await CategoriaModel.deletar(req.params.id);
      res.json({ mensagem: 'Categoria removida com sucesso' });
    } catch (erro) {
      res.status(500).json({ mensagem: 'Erro ao remover categoria', erro: erro.message });
    }
  }
};