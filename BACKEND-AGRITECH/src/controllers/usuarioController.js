import { UsuarioModel } from '../models/usuarioModel.js';

export const UsuarioController = {
  async listarTodos(req, res) {
    try {
      const usuarios = await UsuarioModel.listarTodos();
      res.json(usuarios);
    } catch (erro) {
      res.status(500).json({ mensagem: 'Erro ao buscar utilizadores', erro: erro.message });
    }
  },

  async buscarPorId(req, res) {
    try {
      const usuario = await UsuarioModel.buscarPorId(req.params.id);
      if (!usuario) return res.status(404).json({ mensagem: 'Utilizador não encontrado' });
      res.json(usuario);
    } catch (erro) {
      res.status(500).json({ mensagem: 'Erro ao buscar utilizador', erro: erro.message });
    }
  },

  async criar(req, res) {
    try {
      const novoUsuario = await UsuarioModel.criar(req.body);
      res.status(201).json(novoUsuario);
    } catch (erro) {
      res.status(500).json({ mensagem: 'Erro ao criar utilizador', erro: erro.message });
    }
  },

  async atualizar(req, res) {
    try {
      const usuarioAtualizado = await UsuarioModel.atualizar(req.params.id, req.body);
      res.json(usuarioAtualizado);
    } catch (erro) {
      res.status(500).json({ mensagem: 'Erro ao atualizar utilizador', erro: erro.message });
    }
  },

  async deletar(req, res) {
    try {
      await UsuarioModel.deletar(req.params.id);
      res.json({ mensagem: 'Utilizador removido com sucesso' });
    } catch (erro) {
      res.status(500).json({ mensagem: 'Erro ao remover utilizador', erro: erro.message });
    }
  }
};