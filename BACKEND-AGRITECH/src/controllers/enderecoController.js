import { EnderecoModel } from '../models/enderecoModel.js';

export const EnderecoController = {
  async buscarPorUsuario(req, res) {
    try {
      const enderecos = await EnderecoModel.buscarPorUsuario(req.params.id_usuario);
      res.json(enderecos);
    } catch (erro) {
      res.status(500).json({ mensagem: 'Erro ao buscar endereços', erro: erro.message });
    }
  },

  async criar(req, res) {
    try {
      const novoEndereco = await EnderecoModel.criar(req.body);
      res.status(201).json(novoEndereco);
    } catch (erro) {
      res.status(500).json({ mensagem: 'Erro ao criar endereço', erro: erro.message });
    }
  },

  async atualizar(req, res) {
    try {
      const enderecoAtualizado = await EnderecoModel.atualizar(req.params.id, req.body);
      res.json(enderecoAtualizado);
    } catch (erro) {
      res.status(500).json({ mensagem: 'Erro ao atualizar endereço', erro: erro.message });
    }
  },

  async deletar(req, res) {
    try {
      await EnderecoModel.deletar(req.params.id);
      res.json({ mensagem: 'Endereço removido com sucesso' });
    } catch (erro) {
      res.status(500).json({ mensagem: 'Erro ao remover endereço', erro: erro.message });
    }
  }
};