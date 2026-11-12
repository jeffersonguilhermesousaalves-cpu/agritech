import { VendaModel } from '../models/vendaModel.js';

export const VendaController = {
  async listarTodas(req, res) {
    try {
      const vendas = await VendaModel.listarTodas();
      res.json(vendas);
    } catch (erro) {
      res.status(500).json({ mensagem: 'Erro ao listar vendas', erro: erro.message });
    }
  },

  async buscarPorId(req, res) {
    try {
      const venda = await VendaModel.buscarPorId(req.params.id);
      if (!venda) return res.status(404).json({ mensagem: 'Venda não encontrada' });
      res.json(venda);
    } catch (erro) {
      res.status(500).json({ mensagem: 'Erro ao buscar venda', erro: erro.message });
    }
  },

  async criar(req, res) {
    try {
      const novaVenda = await VendaModel.criar(req.body);
      res.status(201).json(novaVenda);
    } catch (erro) {
      res.status(500).json({ mensagem: 'Erro ao criar venda', erro: erro.message });
    }
  },

  async atualizarStatus(req, res) {
    try {
      const { status_venda } = req.body;
      const venda = await VendaModel.atualizarStatus(req.params.id, status_venda);
      res.json(venda);
    } catch (erro) {
      res.status(500).json({ mensagem: 'Erro ao atualizar status da venda', erro: erro.message });
    }
  }
};